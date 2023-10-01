import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getpartners = async (selectedLanguage) => {
  const response = await axios.get(`${base_url}/api/partners?inactive=true`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createpartner = async (partner) => {
  const response = await axios.post(`${base_url}/api/partners`, partner, {
    headers: config.getHeaders(partner.selectedLanguage),
  });
  return response.data;
};

const getpartner = async (id) => {
  const data = {};

  for (const lang of language) {
    const response = await axios.get(`${base_url}/api/partners/${id}`, {
      headers: config.getHeaders(lang),
    });

    data[lang] = response.data;
  }
  return data;
};

const deletepartner = async (id, language) => {
  const response = await axios.delete(`${base_url}/api/partners/${id}`, {
    headers: config.getHeaders(language),
  });
  return response.data;
};

const updatepartner = async (partner, id, partnerData) => {
  const response = await axios.post(`${base_url}/api/partners/${id}`, partner, {
    headers: config.getHeaders(partnerData.selectedLanguage),
  });
  return response.data;
};

const partnerService = {
  getpartners,
  createpartner,
  getpartner,
  deletepartner,
  updatepartner,
};

export default partnerService;
