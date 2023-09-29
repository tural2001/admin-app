import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getTariffs = async (selectedLanguage) => {
  const response = await axios.get(`${base_url}/api/tariffs?inactive=true`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createTariff = async (tariff) => {
  console.log(tariff);
  const response = await axios.post(`${base_url}/api/tariffs`, tariff, {
    headers: config.getHeaders(tariff.selectedLanguage),
  });
  return response.data;
};

const updateTariff = async (tariff, id, TariffData) => {
  console.log(TariffData);
  const response = await axios.post(`${base_url}/api/tariffs/${id}`, tariff, {
    headers: config.getHeaders(TariffData.selectedLanguage),
  });
  return response.data;
};

const getTariff = async (id) => {
  const data = {};
  for (const lang of language) {
    const response = await axios.get(`${base_url}/api/tariffs/${id}`, {
      headers: config.getHeaders(lang),
    });
    data[lang] = response.data;
  }

  return data;
};

const deleteTariff = async (id, selectedLanguage) => {
  const response = await axios.delete(`${base_url}/api/tariffs/${id}`, {
    headers: config.getHeaders(selectedLanguage),
  });
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
