import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getslides = async (selectedLanguage) => {
  const response = await axios.get(`${base_url}/api/slides?inactive=true`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createslide = async (slide) => {
  const response = await axios.post(`${base_url}/api/slides`, slide, {
    headers: config.getHeaders(slide.selectedLanguage),
  });
  return response.data;
};
const updateslide = async (slide, id, slideData) => {
  const response = await axios.post(`${base_url}/api/slides/${id}`, slide, {
    headers: config.getHeaders(slideData.selectedLanguage),
  });
  return response.data;
};

const getslide = async (id) => {
  const data = {};
  for (const lang of language) {
    const response = await axios.get(`${base_url}/api/slides/${id}`, {
      headers: config.getHeaders(lang),
    });
    data[lang] = response.data;
  }

  return data;
};

const deleteslide = async (id, selectedLanguage) => {
  const response = await axios.delete(`${base_url}/api/slides/${id}`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const slideService = {
  getslides,
  createslide,
  getslide,
  updateslide,
  deleteslide,
};

export default slideService;
