const BASE_URL = '//0.0.0.0:5000';

export default (entity, options) =>
  fetch(`${BASE_URL}/${entity}`, options)
    .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
    .catch(err => console.error(err));
