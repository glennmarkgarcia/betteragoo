const fs = require('fs');
const path = require('path');

const sqlPath = path.join(__dirname, '../data/questions.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

const rawInserts = sql.split('INSERT INTO questions').filter(s => s.includes('VALUES'));

console.log(`Auditing ${rawInserts.length} questions...`);

const issues = [];

rawInserts.forEach((stmt, idx) => {
  const qNum = idx + 1;
  const valuesIdx = stmt.indexOf('VALUES');
  if (valuesIdx === -1) return;
  const valuesPart = stmt.substring(valuesIdx + 6).trim();
  
  const args = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < valuesPart.length; i++) {
    const char = valuesPart[i];
    if (char === '(' && !inQuotes) continue;
    if (char === ')' && !inQuotes) break;

    if (char === "'") {
      if (inQuotes && valuesPart[i+1] === "'") {
        cur += "'";
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      args.push(cur.trim());
      cur = '';
    } else {
      cur += char;
    }
  }
  if (cur) args.push(cur.trim());

  if (args.length < 9) {
    issues.push({ qNum, type: 'PARSE_FAILED', argsCount: args.length, raw: stmt.slice(0, 100) });
    return;
  }

  const cat = args[0];
  const qText = args[1];
  const optA = args[2];
  const optB = args[3];
  const optC = args[4];
  const optD = args[5];
  const corr = args[6].trim().toUpperCase();
  const exp = args[7];

  const opts = { A: optA, B: optB, C: optC, D: optD };
  const selectedText = opts[corr];

  if (!selectedText) {
    issues.push({ qNum, type: 'INVALID_CORRECT_KEY', corr, opts });
    return;
  }

  // Cross-check explanation vs options
  ['A', 'B', 'C', 'D'].forEach(key => {
    if (key !== corr) {
      const optionText = opts[key];
      const optClean = optionText.replace(/\(.*?\)/g, '').replace(/^(From|Which|Where|What|In|The|A|An)\s+/i, '').trim();
      const expClean = exp.replace(/\(.*?\)/g, '').replace(/^(Agoo|The|In|From)\s+/i, '').trim();
      const selectedClean = selectedText.replace(/\(.*?\)/g, '').replace(/^(From|Which|Where|What|In|The|A|An)\s+/i, '').trim();

      if (
        optClean.length >= 6 &&
        expClean.toLowerCase().includes(optClean.toLowerCase()) &&
        !selectedClean.toLowerCase().includes(optClean.toLowerCase())
      ) {
        issues.push({
          qNum,
          type: 'EXPLANATION_MISMATCH',
          question: qText,
          listedCorrect: `${corr} (${selectedText})`,
          potentialCorrect: `${key} (${optionText})`,
          explanation: exp
        });
      }
    }
  });
});

console.log('\n==================================================');
console.log(`Audit Complete! Total issues found: ${issues.length}`);
console.log('==================================================\n');

if (issues.length > 0) {
  console.log(JSON.stringify(issues, null, 2));
} else {
  console.log('✅ ALL 100 QUESTIONS PASSED ALL AUDIT CHECKS PERFECTLY!');
}
