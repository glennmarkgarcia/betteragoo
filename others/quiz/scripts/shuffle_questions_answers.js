const fs = require('fs');
const path = require('path');

const sqlPath = path.join(__dirname, '..', 'data', 'questions.sql');
let sqlContent = fs.readFileSync(sqlPath, 'utf8');

const lines = sqlContent.split('\n');
const newLines = [];
let counts = { A: 0, B: 0, C: 0, D: 0 };
const keys = ['A', 'B', 'C', 'D'];

function parseSqlValues(valuesStr) {
  const tokens = [];
  let current = '';
  let inString = false;

  for (let i = 0; i < valuesStr.length; i++) {
    const char = valuesStr[i];
    const nextChar = valuesStr[i + 1];

    if (char === "'") {
      if (inString && nextChar === "'") {
        current += "'";
        i++;
      } else {
        inString = !inString;
      }
    } else if (char === ',' && !inString) {
      tokens.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  tokens.push(current);
  return tokens;
}

function escapeSqlStr(str) {
  return str.replace(/'/g, "''");
}

lines.forEach((line, index) => {
  if (!line.trim().startsWith('INSERT INTO questions')) {
    newLines.push(line);
    return;
  }

  const prefix = "INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty) VALUES (";
  const startIdx = line.indexOf(prefix);
  if (startIdx === -1) {
    newLines.push(line);
    return;
  }

  const valuesStr = line.substring(startIdx + prefix.length, line.length - 2); // remove trailing ');'
  const fields = parseSqlValues(valuesStr);

  if (fields.length !== 9) {
    newLines.push(line);
    return;
  }

  const category = fields[0];
  const question_text = fields[1];
  let option_a = fields[2];
  let option_b = fields[3];
  let option_c = fields[4];
  let option_d = fields[5];
  const orig_correct = fields[6];
  const explanation = fields[7];
  const difficulty = fields[8];

  // Original options array
  const optionsObj = { A: option_a, B: option_b, C: option_c, D: option_d };
  const originalCorrectText = optionsObj[orig_correct] || option_a;

  // Determine target key balanced across 100 questions (25 A, 25 B, 25 C, 25 D)
  const targetKey = keys[index % 4];

  const currentOpts = [option_a, option_b, option_c, option_d];
  const targetIdx = keys.indexOf(targetKey);
  const currentIdxOfCorrect = currentOpts.indexOf(originalCorrectText);

  if (currentIdxOfCorrect !== targetIdx) {
    const temp = currentOpts[targetIdx];
    currentOpts[targetIdx] = originalCorrectText;
    currentOpts[currentIdxOfCorrect] = temp;
  }

  counts[targetKey]++;

  const newLine = `INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, difficulty) VALUES ('${escapeSqlStr(category)}', '${escapeSqlStr(question_text)}', '${escapeSqlStr(currentOpts[0])}', '${escapeSqlStr(currentOpts[1])}', '${escapeSqlStr(currentOpts[2])}', '${escapeSqlStr(currentOpts[3])}', '${targetKey}', '${escapeSqlStr(explanation)}', '${escapeSqlStr(difficulty)}');`;
  newLines.push(newLine);
});

fs.writeFileSync(sqlPath, newLines.join('\n'), 'utf8');
console.log(`[QUESTIONS SHUFFLED] Processed data/questions.sql successfully!`);
console.log(`Answer Distribution:`, counts);
