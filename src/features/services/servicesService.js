import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getservices = async () => {
  const response = await axios.get(
    `${base_url}/api/services?inactive=true`,
    config
  );
  return response.data;
};

const createservice = async (service) => {
  const response = await axios.post(
    `${base_url}/api/services`,
    service,
    config
  );
  return response.data;
};
const updateservice = async (service, id) => {
  const response = await axios.post(
    `${base_url}/api/services/${id}`,
    service,
    config
  );
  return response.data;
};

const getservice = async (id) => {
  const response = await axios.get(`${base_url}/api/services/${id}`, config);
  return response.data;
};

const deleteservice = async (id) => {
  const response = await axios.delete(`${base_url}/api/services/${id}`, config);
  return response.data;
};

const serviceService = {
  getservices,
  createservice,
  getservice,
  updateservice,
  deleteservice,
};

export default serviceService;
