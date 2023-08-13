// traverse row
// traverse col 
// find matches for row col
// for each match, validate if exists in dictionary with row and col

let dictionary = {};

function getMatches(target) {
  if (target.length >= 4) return [];
  return dictionary[target];
}

function solve(grid, r, c) {
  if (r < 3 && c > 3) { r += 1; c = 0 };
  if (r == 3 && c > 3) return grid;
  let rowStr = grid[r];
  let colStr = "";
  grid.forEach((row) => colStr += row[c] ? row[c] : "");

  let result = null;

  if (rowStr && dictionary[rowStr]) {
    for (let i = 0; i < dictionary[rowStr].length; i++) {
      let match = dictionary[rowStr][i];
      if (dictionary[colStr].includes(colStr+match[match.length-1])) {
        grid[r] = match;
        let res = solve(grid, r, c+1);
        if (res) return res;
      }
    }
  } else if (colStr && dictionary[colStr]) {
    for (let i = 0; i < dictionary[colStr].length; i++) {
      let match = dictionary[colStr][i];
      grid[r] = match[r];
      let res = solve(grid, r, c+1);
      if (res) return res;
    }
  }
  return result;
}


fetch("dictionary.json").then((f) => f.json()).then((r) => {
  dictionary = r;
  console.log("SOLVED: ", solve(["abed","","",""], 1, 0));
});