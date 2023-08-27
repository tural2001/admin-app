import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getTariffs = async () => {
  const response = await axios.get(
    `${base_url}/api/tariffs?inactive=true`,
    config
  );
  return response.data;
};

const createTariff = async (tariff) => {
  const response = await axios.post(`${base_url}/api/tariffs`, tariff, config);
  return response.data;
};

const updateTariff = async (tariff, id) => {
  const response = await axios.post(
    `${base_url}/api/tariffs/${id}`,
    tariff,
    config
  );
  return response.data;
};

const getTariff = async (id) => {
  const response = await axios.get(`${base_url}/api/tariffs/${id}`, config);
  return response.data;
};

const deleteTariff = async (id) => {
  const response = await axios.delete(`${base_url}/api/tariffs/${id}`, config);
  return response.data;
};

const tariffService = {
  getTariffs,
  createTariff,
  updateTariff,
  getTariff,
  deleteTariff,
};

export default tariffService;
