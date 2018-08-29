function ScoreBox(selector, initialScore) {
  this.el = document.querySelector(selector);
  this.score = initialScore;
  this.getData();
}

ScoreBox.prototype.setScore = function setScore(score) {
  this.score = parseInt(score, 10);
  this.render();
  this.update();
};

ScoreBox.prototype.render = function render() {
  this.el.textContent = this.score;
};

ScoreBox.prototype.update = function update() {
  const detail = { score: this.score };
  const event = new CustomEvent('update', { detail });
  this.el.dispatchEvent(event);
};

ScoreBox.prototype.getData = function getData() {
  fetch(`${window.API_URL}/score`)
    .then(res => res.json())
    .then(data => this.setScore(data))
};
