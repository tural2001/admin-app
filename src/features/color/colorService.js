import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getcolors = async (selectedLanguage) => {
  const response = await axios.get(`${base_url}/api/colors?inactive=true`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createcolor = async (color) => {
  const response = await axios.post(`${base_url}/api/colors`, color, {
    headers: config.getHeaders(color.selectedLanguage),
  });
  return response.data;
};

const updatecolor = async (color, id, colorData) => {
  const response = await axios.post(`${base_url}/api/colors/${id}`, color, {
    headers: config.getHeaders(colorData.selectedLanguage),
  });
  return response.data;
};

const getcolor = async (id) => {
  const data = {};

  for (const lang of language) {
    const response = await axios.get(`${base_url}/api/colors/${id}`, {
      headers: config.getHeaders(lang),
    });

    data[lang] = response.data;
  }
  return data;
};

const deletecolor = async (id, language) => {
  const response = await axios.delete(`${base_url}/api/colors/${id}`, {
    headers: config.getHeaders(language),
  });
  return response.data;
};

const colorService = {
  getcolors,
  createcolor,
  updatecolor,
  getcolor,
  deletecolor,
};

export default colorService;
