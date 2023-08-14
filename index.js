window.addEventListener("load", () => {
  // traverse row
  // traverse col 
  // find matches for row col
  // for each match, validate if exists in dictionary with row and col

  let dictionary = {};

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  function getRandomWord() {
    const randomKey = Object.keys(dictionary)[getRandomInt(0, Object.keys(dictionary).length)];
    return dictionary[randomKey][getRandomInt(0, dictionary[randomKey].length)];
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
        if (dictionary[colStr]?.includes(colStr+match[match.length-1])) {
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

  function getPuzzle() {
    let starter = "";
    while (starter.length != 4) starter = getRandomWord();
    return solve([starter,"","",""], 1, 0);
  }

  function initGrid(puzzle) {
    const grid = document.getElementById("grid");
    for (let i = 0; i < 4; i++) {
      const tr = document.createElement("tr");
      puzzle[i].split("").forEach((letter) => {
        const td = document.createElement("td");
        td.innerHTML = letter;
        tr.appendChild(td);
      })
      grid.appendChild(tr);
    }
  }

  fetch("dictionary.json").then((f) => f.json()).then((r) => {
    dictionary = r;
    let count = 0; // for the really bad luck
    let puzzle = getPuzzle();
    while (!puzzle && count < 15) {
      puzzle = getPuzzle();
      count++;
    }
    if (puzzle) {
      initGrid(puzzle);
    }
    console.log("Solved: ", puzzle, count);
  });
});