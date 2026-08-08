// Generate Cloudflare D1 SQL Seed File for 100 Leaderboard Champions
const fs = require('fs');
const path = require('path');

const firstNamesMale = [
  'Juan', 'Mateo', 'Liam', 'Carlos', 'Ethan', 'Gabriel', 'Mark', 'Joshua', 'Jose', 'Rafael',
  'Miguel', 'Diego', 'Lorenzo', 'Christian', 'Daniel', 'Benjamin', 'Alexander', 'Sebastian',
  'Anthony', 'Dominic', 'Adrian', 'Julian', 'Tristan', 'Ezekiel', 'Xavier', 'Francis', 'Paolo',
  'Ramon', 'Ferdinand', 'Rodrigo', 'Arthur', 'Gideon', 'Victor', 'Vincent', 'Emmanuel'
];

const firstNamesFemale = [
  'Maria', 'Sofia', 'Angela', 'Jasmine', 'Nicole', 'Andrea', 'Camille', 'Samantha', 'Katrina',
  'Danica', 'Patricia', 'Beatrix', 'Isabelle', 'Chloe', 'Hannah', 'Sophia', 'Clarisse', 'Alyssa',
  'Bianca', 'Cynthia', 'Grace', 'Joy', 'Marianne', 'Kristine', 'Bernadette', 'Therese', 'Rowena',
  'Lorraine', 'Eleanor', 'Rose', 'Angelica', 'Erika', 'Vanessa', 'Stephanie', 'Kendra'
];

const lastNames = [
  'Santos', 'Dela Cruz', 'Eriguel', 'Sibuma', 'Eslao', 'Refuerzo', 'Verceles', 'Dacanay',
  'Balbin', 'Estacio', 'Fontanilla', 'Asuncion', 'Ramos', 'Rivera', 'Flores', 'Reyes',
  'Garcia', 'Mendoza', 'Castillo', 'Navarro', 'Pascual', 'Villanueva', 'Aquino', 'De Guzman',
  'Torralba', 'Valdez', 'Bautista', 'Soriano', 'Villamil', 'Ofiana', 'Gatchalian', 'Rimando',
  'Zara', 'Corpuz', 'Manzano', 'Abalos', 'Concepcion', 'Sison', 'Tolentino', 'Vergara'
];

const seeds = [];

for (let i = 1; i <= 100; i++) {
  const isMale = i % 2 === 0;
  const gender = isMale ? 'Male' : (i % 7 === 0 ? 'Prefer not to say' : 'Female');
  const fnList = gender === 'Male' ? firstNamesMale : firstNamesFemale;
  const fn = fnList[i % fnList.length];
  const ln = lastNames[(i * 3 + 7) % lastNames.length];
  const name = `${fn} ${ln}`;
  const email = `${fn.toLowerCase()}.${ln.toLowerCase().replace(/\s+/g, '')}${i}@example.com`;
  
  const year = 1990 + (i % 16);
  const month = String(1 + (i % 12)).padStart(2, '0');
  const day = String(1 + (i % 28)).padStart(2, '0');
  const dob = `${year}-${month}-${day}`;
  
  let score, time, division;
  if (i <= 25) {
    score = 10;
    time = 24 + i * 1;
    division = 'Eagle Master';
  } else if (i <= 50) {
    score = i <= 38 ? 9 : 8;
    time = 45 + (i - 25) * 2;
    division = 'Basilica Scholar';
  } else if (i <= 75) {
    score = i <= 63 ? 7 : 6;
    time = 70 + (i - 50) * 2;
    division = 'Dinengdeng Explorer';
  } else {
    score = i <= 88 ? 5 : 4;
    time = 100 + (i - 75) * 3;
    division = 'Agoho Trailblazer';
  }
  
  const percentage = score * 10;
  const attempts = 1 + (i % 3);

  seeds.push({
    email,
    player_name: name,
    gender,
    dob,
    high_score: score,
    total_items: 10,
    percentage,
    time_taken_seconds: time,
    division_name: division,
    attempts_count: attempts
  });
}

// Generate SQL
let sql = `-- Seed data for 100 Top Ranked Champions in quiz_sessions
DELETE FROM quiz_sessions;

`;

seeds.forEach(s => {
  sql += `INSERT INTO quiz_sessions (email, player_name, gender, dob, high_score, total_items, percentage, time_taken_seconds, division_name, attempts_count) VALUES ('${s.email}', '${s.player_name}', '${s.gender}', '${s.dob}', ${s.high_score}, 10, ${s.percentage}, ${s.time_taken_seconds}, '${s.division_name}', ${s.attempts_count});\n`;
});

const sqlPath = path.join(__dirname, '..', 'data', 'leaderboard_seed.sql');
fs.writeFileSync(sqlPath, sql, 'utf8');
console.log(`[SEED SQL] Written 100 rank seeds to ${sqlPath}`);
