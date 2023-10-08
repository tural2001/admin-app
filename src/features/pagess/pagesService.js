import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getpages = async (selectedLanguage) => {
  const response = await axios.get(`${base_url}/api/pages?inactive=true`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createpage = async (page) => {
  const response = await axios.post(`${base_url}/api/pages`, page, {
    headers: config.getHeaders(page.selectedLanguage),
  });
  return response.data;
};

const updatepage = async (page, id, pageData) => {
  console.log(id);
  const response = await axios.post(`${base_url}/api/pages/${id}`, page, {
    headers: config.getHeaders(pageData.selectedLanguage),
  });
  return response.data;
};

const getpage = async (id) => {
  const data = {};
  for (const lang of language) {
    const response = await axios.get(`${base_url}/api/pages/edit/${id}`, {
      headers: config.getHeaders(lang),
    });
    data[lang] = response.data;
  }

  return data;
};

const deletepage = async (id, selectedLanguage) => {
  const response = await axios.delete(`${base_url}/api/pages/${id}`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const pageService = {
  getpages,
  createpage,
  updatepage,
  getpage,
  deletepage,
};

export default pageService;
