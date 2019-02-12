function Store(initialState, reducer) {
  this.state = initialState;
  this.reduce = reducer;
  this.subscriptions = [];
}

Store.prototype.dispatch = function dispatch(action) {
  this.state = this.reduce(action, this.state);
  this.subscriptions.forEach(listener => listener())
};

Store.prototype.getState = function getState() {
  return this.state;
};

Store.prototype.subscribe = function subscribe(listener) {
  this.subscriptions.push(listener);
  const unsubscribe = () => {
    const index = this.subscriptions.indexOf(listener);
    this.subscriptions.splice(index, 1);
  };

  return unsubscribe;
};



