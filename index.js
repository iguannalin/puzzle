window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  let rows = [0,1,2,3];
  const grid = document.getElementById("grid");

  function initGrid(words, rowId) {
    const tr = document.createElement("tr");
    tr.id = rowId;
    if (rowId == 1 || rowId == 2) {
      for (let i = 0; i< 4; i++) {
        const td = document.createElement("td");
        td.innerHTML = `<input type='text' maxlength='1' id=${rowId}-${i}></input>`;
        tr.appendChild(td);
      }
    } else {
      const randomKey = Object.keys(words)[getRandomInt(0, Object.keys(words).length)];
      const word = words[randomKey][getRandomInt(0, words[randomKey].length)];
      word.split("").forEach((letter, index) => {
        const td = document.createElement("td");
        td.innerHTML = letter;
        // if (rowId == 0 && index == 0) td.innerHTML = letter;
        // else if (rowId == 3 && index == 3) td.innerHTML = letter;
        // else td.innerHTML = `<input type='text' maxlength='1' id=${rowId}-${index}></input>`;
        tr.appendChild(td);
      })
    }
    grid.appendChild(tr);
  }

  // // 4-letter words list scraped from https://eslforums.com/4-letter-words/
  // fetch("https://annaylin.com/100-days/crossword/words.json").then((f) => f.json()).then((r) => {
  //   rows.forEach((row) => initGrid(r, row));
  // });
});