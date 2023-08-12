let words = {};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getRandomWord(dictionary, list) {
  if (dictionary) {
    const randomKey = Object.keys(dictionary)[getRandomInt(0, Object.keys(dictionary).length)];
    return dictionary[randomKey][getRandomInt(0, dictionary[randomKey].length)];
  } else if (list) {
    return list[getRandomInt(0, list.length)];
  } return null;
}

function getMatches(target) {
  let matches = [];
  target.split("").forEach((letter, index) => {
    let sub = index == 0 ? letter : target.substring(0, index);
    if (words[sub]) {
      matches = words[sub];
    } else {
      words[sub] = matches.filter((p) => p.startsWith(sub)); // create a new key in dictionary
      matches = words[sub];
    }
  });
  return matches;
}

function getRandomMatch(listA, listB) { // at least one of the lists must not be empty
  let longerList = listA.length > listB.length ? listA : listB;
  let shorterList = longerList == listA ? listB : listA;
  if (shorterList.length == 0) return getRandomWord(null, longerList);
  return getRandomWord(null, shorterList.filter((item) => longerList.includes(item)));
}

function solve(grid, rowIndex, colIndex) {
  if (rowIndex > 3 || colIndex > 3) return grid;
  // find substring of everything in row
  let rowString = grid[rowIndex].join("");
  // find substring of everything in column
  let colString = "";
  for (let j = rowIndex; j >= 0; j--) colString += grid[j][colIndex];
  // find words that begin with row substring
  let rowMatches = getMatches(rowString);
  // find words that begin with column substring
  let colMatches = getMatches(colString);
  let match = getRandomMatch(rowMatches, colMatches);
  // make match
  grid[rowIndex][colIndex] = match[rowIndex];
  if (rowIndex < 3) rowIndex +=1;
  if (colIndex < 3) colIndex += 1;
  if (colIndex == 3) colIndex = 0;
  console.log({grid, match});
  // recurse solve()
  return solve(grid, rowIndex, colIndex);
}

// 4-letter words list scraped from https://eslforums.com/4-letter-words/
fetch("https://annaylin.com/100-days/crossword/words.json").then((f) => f.json()).then((r) => {
  words = r;
  let grid = [["","","",""],["","","",""],["","","",""],["","","",""]]; // 4x4 grid
  const word = getRandomWord(words);
  grid[0] = word.split("");
  solve(grid, 1, 0);
});