import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getourvalues = async () => {
  const response = await axios.get(
    `${base_url}/api/our-values?inactive=true`,
    config
  );
  return response.data;
};

const createourvalue = async (ourvalue) => {
  const response = await axios.post(
    `${base_url}/api/our-values`,
    ourvalue,
    config
  );
  return response.data;
};
const updateourvalue = async (ourvalue, id) => {
  const response = await axios.post(
    `${base_url}/api/our-values/${id}`,
    ourvalue,
    config
  );
  return response.data;
};

const getourvalue = async (id) => {
  const response = await axios.get(`${base_url}/api/our-values/${id}`, config);
  return response.data;
};

const deleteourvalue = async (id) => {
  const response = await axios.delete(
    `${base_url}/api/our-values/${id}`,
    config
  );
  return response.data;
};

const ourvalueService = {
  getourvalues,
  createourvalue,
  getourvalue,
  updateourvalue,
  deleteourvalue,
};

export default ourvalueService;
