import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getpopups = async (selectedLanguage) => {
  const response = await axios.get(`${base_url}/api/popups?inactive=true`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createpopup = async (popup) => {
  const response = await axios.post(`${base_url}/api/popups`, popup, {
    headers: config.getHeaders(popup.selectedLanguage),
  });
  return response.data;
};
const updatepopup = async (popup, id, popupData) => {
  const response = await axios.post(`${base_url}/api/popups/${id}`, popup, {
    headers: config.getHeaders(popupData.selectedLanguage),
  });
  return response.data;
};

const getpopup = async (id) => {
  const data = {};

  for (const lang of language) {
    const response = await axios.get(`${base_url}/api/popups/${id}`, {
      headers: config.getHeaders(lang),
    });
    data[lang] = response.data;
  }
  return data;
};

const deletepopup = async (id, language) => {
  const response = await axios.delete(`${base_url}/api/popups/${id}`, {
    headers: config.getHeaders(language),
  });
  return response.data;
};

const popupService = {
  getpopups,
  createpopup,
  getpopup,
  updatepopup,
  deletepopup,
};

export default popupService;
