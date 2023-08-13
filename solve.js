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
  console.log(grid)
  if (r < 3 && c > 3) { r += 1; c = 0 };
  if (r == 3 && c > 3) { console.log('here'); return grid; }
  let rowStr = grid[r];
  let colStr = "";
  grid.forEach((row) => colStr += row[c] ? row[c] : "");

  let result = null;

  if (rowStr && dictionary[rowStr]) {
    dictionary[rowStr].forEach((match) => {
      if (dictionary[colStr].includes(colStr+match[match.length-1])) {
        grid[r] = match;
        let res = solve(grid, r, c+1);
        console.log('1', res);
        if (res) return res;
      }
    });
  } else if (colStr && dictionary[colStr]) {
    console.log('2');
    dictionary[colStr].forEach((match) => {
      grid[r] = match[r];
      let res = solve(grid, r, c+1);
      if (res) return res;
    });
  }
  return result;
}


fetch("dictionary.json").then((f) => f.json()).then((r) => {
  dictionary = r;
  console.log('SOLVED ', solve(["abed","baba","ebbs",""], 3, 0));
});