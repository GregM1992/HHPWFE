import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const addItemToOrder = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/order/addItem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const removeItemFromOrder = (orderItemId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/order/removeById/${orderItemId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export { addItemToOrder, removeItemFromOrder };
