import axios from 'axios';
import { base_url } from '../../utils/base_url';

const login = async (user) => {
  const response = await axios.post(`${base_url}/api/login`, user);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  login,
};

export default authService;
