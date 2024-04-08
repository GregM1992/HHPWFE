import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getItems = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export default getItems;
