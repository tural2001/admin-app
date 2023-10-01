import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getservicecategories = async (selectedLanguage) => {
  const response = await axios.get(`${base_url}/api/service-categories`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createservicecategories = async (servicecategories) => {
  console.log(servicecategories);
  const response = await axios.post(
    `${base_url}/api/service-categories`,
    servicecategories,
    { headers: config.getHeaders(servicecategories.selectedLanguage) }
  );
  return response.data;
};
const updateservicecategories = async (servicecategories, id) => {
  const response = await axios.post(
    `${base_url}/api/service-categories/${id}`,
    servicecategories,
    { headers: config.getHeaders(servicecategories.selectedLanguage) }
  );
  return response.data;
};
const getservicecategory = async (id) => {
  const data = {};
  for (const lang of language) {
    const response = await axios.get(
      `${base_url}/api/service-categories/${id}`,
      {
        headers: config.getHeaders(lang),
      }
    );
    data[lang] = response.data;
  }

  return data;
};
const deleteservicecategories = async (id, selectedLanguage) => {
  const response = await axios.delete(
    `${base_url}/api/service-categories/${id}`,
    { headers: config.getHeaders(selectedLanguage) }
  );
  return response.data;
};
const servicecategoriesService = {
  getservicecategories,
  createservicecategories,
  getservicecategory,
  deleteservicecategories,
  updateservicecategories,
};

export default servicecategoriesService;
