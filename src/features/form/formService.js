import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getforms = async () => {
  const response = await axios.get(
    `${base_url}/api/forms?inactive=true`,
    config
  );
  return response.data;
};

const getfields = async (id) => {
  const response = await axios.get(
    `${base_url}/api/forms/${id}/fields`,
    config
  );
  return response.data;
};

const createform = async (form) => {
  const response = await axios.post(`${base_url}/api/forms`, form, config);
  return response.data;
};

const updateform = async (form, id) => {
  const response = await axios.post(
    `${base_url}/api/forms/${id}`,
    form,
    config
  );
  return response.data;
};

const getform = async (id) => {
  const response = await axios.get(`${base_url}/api/forms/${id}`, config);
  return response.data;
};

const deleteform = async (id) => {
  const response = await axios.delete(`${base_url}/api/forms/${id}`, config);
  return response.data;
};

const formService = {
  getforms,
  createform,
  updateform,
  getform,
  deleteform,
  getfields,
};

export default formService;
