import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getadvantages = async (selectedLanguage) => {
  const response = await axios.get(`${base_url}/api/advantages?inactive=true`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createadvantage = async (advantage) => {
  const response = await axios.post(`${base_url}/api/advantages`, advantage, {
    headers: config.getHeaders(advantage.selectedLanguage),
  });
  return response.data;
};
const updateadvantage = async (advantage, id, advantageData) => {
  const response = await axios.post(
    `${base_url}/api/advantages/${id}`,
    advantage,
    {
      headers: config.getHeaders(advantageData.selectedLanguage),
    }
  );
  return response.data;
};

const getadvantage = async (id) => {
  const data = {};

  for (const lang of language) {
    const response = await axios.get(`${base_url}/api/advantages/${id}`, {
      headers: config.getHeaders(lang),
    });

    data[lang] = response.data;
  }
  return data;
};

const deleteadvantage = async (id, language) => {
  const response = await axios.delete(`${base_url}/api/advantages/${id}`, {
    headers: config.getHeaders(language),
  });
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
