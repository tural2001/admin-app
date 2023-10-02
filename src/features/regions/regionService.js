import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getregions = async (selectedLanguage) => {
  const response = await axios.get(`${base_url}/api/regions?inactive=true`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createregion = async (region) => {
  const response = await axios.post(`${base_url}/api/regions`, region, {
    headers: config.getHeaders(region.selectedLanguage),
  });
  return response.data;
};

const updateregion = async (region, id, regionData) => {
  const response = await axios.post(`${base_url}/api/regions/${id}`, region, {
    headers: config.getHeaders(regionData.selectedLanguage),
  });
  return response.data;
};

const getregion = async (handle) => {
  const data = {};

  for (const lang of language) {
    const response = await axios.get(`${base_url}/api/regions/${handle}`, {
      headers: config.getHeaders(lang),
    });
    data[lang] = response.data;
  }
  return data;
};

const deleteregion = async (handle, language) => {
  const response = await axios.delete(`${base_url}/api/regions/${handle}`, {
    headers: config.getHeaders(language),
  });
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
