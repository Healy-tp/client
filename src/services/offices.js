import api from './api';

function getOffices() {
  return api.get('http://localhost:8081/api/offices');
}


export {
  getOffices,
}
