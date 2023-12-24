import api from "./api";
import config from "./config";

function getOffices() {
  return api.get(`${config.apiUrl}/api/offices`);
}

export { getOffices };
