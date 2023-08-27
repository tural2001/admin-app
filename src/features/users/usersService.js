import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getusers = async () => {
  const response = await axios.get(
    `${base_url}/api/users?inactive=true`,
    config
  );
  return response.data;
};

const createuser = async (user) => {
  const response = await axios.post(`${base_url}/api/users`, user, config);
  return response.data;
};

const updateuser = async (user) => {
  const response = await axios.put(
    `${base_url}/api/users/${user.id}`,
    {
      name: user.userData.name,
      email: user.userData.email,
      password: user.userData.password,
    },
    config
  );
  return response.data;
};

const getuser = async (id) => {
  const response = await axios.get(`${base_url}/api/users/${id}`, config);
  return response.data;
};

const deleteuser = async (id) => {
  const response = await axios.delete(`${base_url}/api/users/${id}`, config);
  return response.data;
};

const userService = {
  getusers,
  createuser,
  updateuser,
  getuser,
  deleteuser,
};

export default userService;
