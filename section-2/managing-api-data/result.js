function Result(selector, initialScore) {
  this.el = document.querySelector(selector);
  this.score = initialScore;
  this.getData();
}

Result.prototype.setScore = function setScore(team, score) {
  if (this.score[team] !== score) {
    this.score[team] = parseInt(score, 10);
    this.update();
    this.render();
  }
};

Result.prototype.render = function render() {
  this.el.textContent = `The result is: ${this.score.home} – ${this.score.away}`;
};

Result.prototype.update = function update() {
  const detail = { score: this.score };
  const event = new CustomEvent('update', { detail });
  this.el.dispatchEvent(event);
};

Result.prototype.setResult = function setResult(score) {
  if (this.score !== score) {
    this.score = score;
    this.update();
    this.render();
  }
};

Result.prototype.getData = function getData() {
  fetch(`${window.API_URL}/result`)
    .then(res => res.json())
    .then(data => this.setResult(data))
};

