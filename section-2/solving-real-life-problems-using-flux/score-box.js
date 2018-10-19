function ScoreBox({ selector, id }, store) {
  this.id = id;
  this.el = document.querySelector(selector);
  this.store = store;
  this.store.subscribe(this.render.bind(this));
  this.render();
}

ScoreBox.prototype.render = function render() {
  const state = this.store.getState();
  this.el.textContent = state[this.id];
};


ScoreBox.prototype.getData = function getData() {
  fetch(`${window.API_URL}/score`)
    .then(res => res.json())
    .then(data => this.store.dispatch({
      type: 'SCORE_BOX__SET_DATA',
      payload: { id: this.id, data }
    }));
};
