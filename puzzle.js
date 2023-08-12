
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function solve(grid, rowIndex, colIndex) {
  console.log(grid);
}

// 4-letter words list scraped from https://eslforums.com/4-letter-words/
fetch("https://annaylin.com/100-days/crossword/words.json").then((f) => f.json()).then((words) => {
  let grid = [["","","",""],["","","",""],["","","",""],["","","",""]]; // 4x4 grid
  const randomKey = Object.keys(words)[getRandomInt(0, Object.keys(words).length)];
  const word = words[randomKey][getRandomInt(0, words[randomKey].length)];
  grid[0] = word.split("");
  solve(grid, 1, 0);
});