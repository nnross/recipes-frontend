import { personal } from '../tests/testData/personal.json';

// TODO: actual call to backend
const getPersonal = (id, token) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(personal);
    }, 1000);
  })
);

export default { getPersonal };
