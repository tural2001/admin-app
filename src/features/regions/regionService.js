import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getregions = async () => {
  const response = await axios.get(
    `${base_url}/api/regions?inactive=true`,
    config
  );
  return response.data;
};

const createregion = async (region) => {
  const response = await axios.post(`${base_url}/api/regions`, region, config);
  return response.data;
};

const updateregion = async (region, id) => {
  const response = await axios.post(
    `${base_url}/api/regions/${id}`,
    region,
    config
  );
  return response.data;
};

const getregion = async (id) => {
  const response = await axios.get(`${base_url}/api/regions/${id}`, config);
  return response.data;
};

const deleteregion = async (id) => {
  const response = await axios.delete(`${base_url}/api/regions/${id}`, config);
  return response.data;
};

const regionService = {
  getregions,
  createregion,
  updateregion,
  getregion,
  deleteregion,
};

export default regionService;
