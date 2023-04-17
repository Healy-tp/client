import api from './api';

function getOffices() {
  return api.get('http://localhost:8000/api/offices');
}


export {
  getOffices,
}
