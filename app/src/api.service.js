const BASE_URL = '//0.0.0.0:5000';

const defaultFetch = (entity, options) => fetch(`${BASE_URL}/${entity}`, options)
  .then(res => (res.ok ? res.json() : Promise.reject(res.status)));

const jsonFetch = method => (entity, data) => defaultFetch(entity, {
  method,
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(data)
});

const API = defaultFetch;

API.post = jsonFetch('POST');
API.put = jsonFetch('PUT');
API.patch = jsonFetch('PATCH');

export default API;
