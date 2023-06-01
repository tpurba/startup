function loadScores() {
  console.log("In loadScores");
  let scores = [];
  const scoresText = localStorage.getItem('scores');
  if (scoresText) {
    scores = JSON.parse(scoresText);
  }

  const tableBodyEl = document.querySelector('#scores');
  console.log("TableBody:", tableBodyEl);

  if (scores.length) {
    console.log(scores.length);
    for (const [i, score] of scores.entries()) {
      console.log(i);
      const positionTdEl = document.createElement('td');
      const nameTdEl = document.createElement('td');
      const scoreTdEl = document.createElement('td');
      const dateTdEl = document.createElement('td');

      positionTdEl.textContent = i + 1;
      console.log("Pos: "+ positionTdEl.textContent);
      nameTdEl.textContent = score.name;
      console.log("Name: "+ nameTdEl.textContent);
      scoreTdEl.textContent = score.score;
      console.log("Score: "+ scoreTdEl.textContent);
      dateTdEl.textContent = score.date;
      console.log("Date: "+ dateTdEl.textContent);

      const rowEl = document.createElement('tr');
      rowEl.appendChild(positionTdEl);
      rowEl.appendChild(nameTdEl);
      rowEl.appendChild(scoreTdEl);
      rowEl.appendChild(dateTdEl);
      console.log("RowEl:" , rowEl);
      tableBodyEl.appendChild(rowEl);
    }
  } else {
    tableBodyEl.innerHTML = '<tr><td colSpan=4>Be the first to score</td></tr>';
  }
}

loadScores();
