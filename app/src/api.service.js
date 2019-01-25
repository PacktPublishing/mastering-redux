import axios from 'axios';

const BASE_URL = 'http://0.0.0.0:5000';

const defaultFetch = (entity, options) =>
  axios({
    url: `${BASE_URL}/${entity}`,
    ...options
  }).then(res => res.data);

const jsonFetch = method => (entity, data) =>
  defaultFetch(entity, {
    method,
    headers: { 'content-type': 'application/json' },
    data: JSON.stringify(data)
  });

const API = defaultFetch;

API.post = jsonFetch('POST');
API.put = jsonFetch('PUT');
API.patch = jsonFetch('PATCH');

export default API;
