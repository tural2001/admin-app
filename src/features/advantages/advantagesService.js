import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getadvantages = async () => {
  const response = await axios.get(
    `${base_url}/api/advantages?inactive=true`,
    config
  );
  return response.data;
};

const createadvantage = async (advantage) => {
  const response = await axios.post(
    `${base_url}/api/advantages`,
    advantage,
    config
  );
  return response.data;
};
const updateadvantage = async (advantage, id) => {
  const response = await axios.post(
    `${base_url}/api/advantages/${id}`,
    advantage,
    config
  );
  return response.data;
};

const getadvantage = async (id) => {
  const response = await axios.get(`${base_url}/api/advantages/${id}`, config);
  return response.data;
};

const deleteadvantage = async (id) => {
  const response = await axios.delete(
    `${base_url}/api/advantages/${id}`,
    config
  );
  return response.data;
};

const advantageService = {
  getadvantages,
  createadvantage,
  getadvantage,
  updateadvantage,
  deleteadvantage,
};

export default advantageService;
