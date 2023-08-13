// traverse row
// traverse col 
// find matches for row col
// for each match, validate if exists in dictionary with row and col

function solve(grid, r, c) {
  if (r >= 3 && c >= 3) return grid;
  if (r < 3 && c > 3) c = 0;
  let rowStr = grid[r];
  let colStr = grid[r].map((row) => row[c] ? row[c] : "");
  console.log({rowStr, colStr});

  // solve(grid, r+1, c+1);
}

solve(["abed","baba","ebbs",""], 0, 0);

// solve goes through the 4x4 grid column by column, filling column first before row
function resolve(grid, rowIndex, colIndex) {
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