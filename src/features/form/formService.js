import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getfields = async () => {
  const response = await axios.get(`${base_url}/api/form-fields`, config);
  return response.data;
};

const createfield = async (field) => {
  const response = await axios.post(
    `${base_url}/api/form-fields`,
    field,
    config
  );
  return response.data;
};

const updatefield = async (field, id) => {
  const response = await axios.post(
    `${base_url}/api/form-fields/${id}`,
    field,
    config
  );
  return response.data;
};

const getfield = async (id) => {
  const response = await axios.get(`${base_url}/api/form-fields/${id}`, config);
  console.log(response.data);
  return response.data;
};

const deletefield = async (id) => {
  const response = await axios.delete(
    `${base_url}/api/form-fields/${id}`,
    config
  );
  return response.data;
};

const formService = {
  getfields,
  createfield,
  updatefield,
  getfield,
  deletefield,
};

export default formService;
