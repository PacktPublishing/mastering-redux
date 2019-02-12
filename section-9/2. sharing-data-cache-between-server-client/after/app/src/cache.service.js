class Cache {
  _cache = {};

  createNamespace(namespace) {
    this._cache[namespace] = new Map();
    return this._cache[namespace];
  }

  set(namespace, data) {
    const namespaceCache =
      this._cache[namespace] || this.createNamespace(namespace);
    if (Array.isArray(data)) {
      data.forEach(item => namespaceCache.set(item.id, item));
    } else if (typeof data === 'object') {
      namespaceCache.set(data.id, data);
    }
  }

  get(namespace, id) {
    const namespaceCache =
      this._cache[namespace] || this.createNamespace(namespace);
    if (typeof id !== 'undefined') {
      return namespaceCache.get(id);
    } else {
      return namespaceCache.values();
    }
  }

  keys(namespace) {
    const namespaceCache =
      this._cache[namespace] || this.createNamespace(namespace);
    return namespaceCache.keys();
  }

  values(namespace) {
    const namespaceCache =
      this._cache[namespace] || this.createNamespace(namespace);
    return namespaceCache.values();
  }

  save() {
    const plainCache = Object.entries(this._cache).reduce(
      (acc, [namespace, map]) => ({
        ...acc,
        [namespace]: Array.from(map.entries())
      }),
      {}
    );

    return JSON.stringify(plainCache);
  }

  load(plainCache) {
    this._cache = Object.entries(plainCache).reduce(
      (acc, [namespace, entries]) => ({
        ...acc,
        [namespace]: new Map(entries)
      }),
      {}
    );
  }
}

export default Cache;
