import axios from 'axios';
import cache from 'src/cache.service';

const BASE_URL = 'http://0.0.0.0:5000';

const defaultFetch = (entity, url, options) =>
  axios({
    url: `${BASE_URL}/${url}`,
    ...options
  })
    .then(res => res.data)
    .then(data => cache.set(entity, data) || data);

const jsonFetch = method => (url, data) => {
  const [entity] = url.split('/');
  return defaultFetch(entity, url, {
    method,
    headers: { 'content-type': 'application/json' },
    data: JSON.stringify(data)
  });
};

const API = jsonFetch('GET');

API.post = jsonFetch('POST');
API.put = jsonFetch('PUT');
API.patch = jsonFetch('PATCH');

export default API;
