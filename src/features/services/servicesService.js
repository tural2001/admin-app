import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getservices = async (selectedLanguage) => {
  const response = await axios.get(`${base_url}/api/services?inactive=true`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createservice = async (service) => {
  const response = await axios.post(`${base_url}/api/services`, service, {
    headers: config.getHeaders(service.selectedLanguage),
  });
  return response.data;
};
const updateservice = async (service, id, serviceData) => {
  const response = await axios.post(`${base_url}/api/services/${id}`, service, {
    headers: config.getHeaders(serviceData.selectedLanguage),
  });
  return response.data;
};

const getservice = async (id) => {
  const data = {};

  for (const lang of language) {
    const response = await axios.get(`${base_url}/api/services/${id}`, {
      headers: config.getHeaders(lang),
    });
    data[lang] = response.data;
  }

  return data;
};

const deleteservice = async (id, selectedLanguage) => {
  const response = await axios.delete(`${base_url}/api/services/${id}`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const serviceService = {
  getservices,
  createservice,
  getservice,
  updateservice,
  deleteservice,
};

export default serviceService;
