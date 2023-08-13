let dictionary = {};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getRandomWord(d, l) {
  if (d) {
    const randomKey = Object.keys(d)[getRandomInt(0, Object.keys(d).length)];
    return d[randomKey][getRandomInt(0, d[randomKey].length)];
  } else if (l) {
    return l[getRandomInt(0, l.length)];
  } return null;
}

function getMatches(str) {
  if (!str || !dictionary[str.substring(0, 3)]) return [];
  return dictionary[str.substring(0, 3)];
}

function combineMatches(listA, listB) { // at least one of the lists must not be empty
  let longerList = listA.length > listB.length ? listA : listB;
  let shorterList = longerList == listA ? listB : listA;
  if (shorterList.length < 1) return longerList;
  return shorterList.filter((item) => longerList.includes(item));
}

// solve goes through the 4x4 grid column by column, filling column first before row
function solve(grid, rowIndex, colIndex) {
  if (rowIndex >= 3 && colIndex >= 3) return grid; // edge case
  else if (rowIndex < 3 && colIndex > 3) { rowIndex += 1; colIndex = 0; }
  if (rowIndex >= grid.length-1) grid[rowIndex] = "";
  
  // find substring of everything in row
  let rowString = grid[rowIndex].substring(0, colIndex);
  // find substring of everything in column
  let colString = "";
  for (let j = rowIndex; j >= 0; j--) colString += grid[j][colIndex] ? grid[j][colIndex] : "";
  
  // find words that begin with row substring
  let rowMatches = getMatches(rowString);
  // find words that begin with column substring
  let colMatches = getMatches(colString);
  
  let allMatches = combineMatches(rowMatches, colMatches);

  // console.log({grid, rowIndex, colIndex, allMatches});
  allMatches.forEach((match) => {
    grid[rowIndex] = match[rowIndex];
    // console.log(grid)
    // const result = solve(grid, rowIndex, colIndex+1);
    // if (result) return result;
  });
  return null;
  // let match = getRandomMatch(rowMatches, colMatches);
  // if (!match) return solve(grid, rowIndex > 0 ? rowIndex - 1 : 0, colIndex > 0 ? colIndex - 1 : 0);
  // // make match
  // match.split("").forEach((ch, index) => {
  //   newGrid[index][colIndex] = ch;
  // });
  // // recurse solve()
  // return solve(grid, rowIndex, colIndex);
}

// 4-letter words list scraped from https://eslforums.com/4-letter-words/
fetch("dictionary.json").then((f) => f.json()).then((r) => {
  dictionary = r;
  let grid = [];
  let word = "";
  while (word.length < 4) {
    word = getRandomWord(dictionary);
  }
  grid.push(word);
  grid = solve(grid, 1, 0);
  console.log({grid});
});