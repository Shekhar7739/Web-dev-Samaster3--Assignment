const crypto = require('crypto');

function rollDice() {
  return crypto.randomInt(1, 7);
}

const rolls = process.argv[2] ? parseInt(process.argv[2], 10) : 5;

for (let i = 1; i <= rolls; i++) {
  console.log(`🎲 Dice Rolled: ${rollDice()}`);
}
