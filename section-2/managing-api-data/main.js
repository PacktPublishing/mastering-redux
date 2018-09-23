function main() {
  const initScore = { home: 0, away: 0 };

  const homeScore = new ScoreBox('.js-score-home', initScore.home);
  const awayScore = new ScoreBox('.js-score-away', initScore.away);
  const result = new Result('.js-result', initScore);

  const homeGoal = document.querySelector('.js-home-goal');
  const awayGoal = document.querySelector('.js-away-goal');
  const resultButton = document.querySelector('.js-result-button');

  homeGoal.addEventListener('click', homeScore.getData.bind(homeScore));
  awayGoal.addEventListener('click', awayScore.getData.bind(awayScore));
  resultButton.addEventListener('click', result.getData.bind(result));

  return {
    homeScore,
    awayScore,
    result
  };
}

function syncComponents({ homeScore, awayScore, result }) {
  homeScore.el.addEventListener('update', e => result.setScore('home', e.detail.score));
  awayScore.el.addEventListener('update', e => result.setScore('away', e.detail.score));
  result.el.addEventListener('update', e => {
    homeScore.setScore(e.detail.score.home);
    awayScore.setScore(e.detail.score.away);
  });
}
