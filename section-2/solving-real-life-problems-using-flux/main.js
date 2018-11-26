function main() {
  const initScore = { home: 0, away: 0 };
  const reducer = (action, state) => {
    switch (action.type) {
      case 'RESULT__SET_DATA': {
        return { ...state, ...action.payload };
      }
      case 'SCORE_BOX__SET_DATA': {
        return {
          ...state,
          [action.payload.id]: action.payload.data
        };
      }
      default:
        return state;
    }
  };

  const store = new Store(initScore, reducer);
  const homeScore = new ScoreBox({ selector: '.js-score-home', id: 'home' }, store);
  const awayScore = new ScoreBox({ selector: '.js-score-away', id: 'away' }, store);
  const result = new Result('.js-result', store);

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
