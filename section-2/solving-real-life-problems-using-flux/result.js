function Result(selector, store) {
  this.el = document.querySelector(selector);
  this.store = store;
  this.store.subscribe(this.render.bind(this));
  this.render();
}

Result.prototype.render = function render() {
  const { home, away } = this.store.getState();
  this.el.textContent = `The result is: ${home} – ${away}`;
};

Result.prototype.getData = function getData() {
  fetch(`${window.API_URL}/result`)
    .then(res => res.json())
    .then(data => this.store.dispatch({ type: 'RESULT__SET_DATA', payload: data }));
};

