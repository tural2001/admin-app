import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getourvalues = async (selectedLanguage) => {
  const response = await axios.get(`${base_url}/api/our-values?inactive=true`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createourvalue = async (ourvalue) => {
  const response = await axios.post(`${base_url}/api/our-values`, ourvalue, {
    headers: config.getHeaders(ourvalue.selectedLanguage),
  });
  return response.data;
};
const updateourvalue = async (ourvalue, id, ourvalueData) => {
  const response = await axios.post(
    `${base_url}/api/our-values/${id}`,
    ourvalue,
    { headers: config.getHeaders(ourvalueData.selectedLanguage) }
  );
  return response.data;
};

const getourvalue = async (id) => {
  const data = {};
  for (const lang of language) {
    const response = await axios.get(`${base_url}/api/our-values/${id}`, {
      headers: config.getHeaders(lang),
    });
    data[lang] = response.data;
  }

  return data;
};

const deleteourvalue = async (id, selectedLanguage) => {
  const response = await axios.delete(`${base_url}/api/our-values/${id}`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const ourvalueService = {
  getourvalues,
  createourvalue,
  getourvalue,
  updateourvalue,
  deleteourvalue,
};

export default ourvalueService;
