import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getfields = async (selectedLanguage) => {
  const response = await axios.get(`${base_url}/api/form-fields`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createfield = async (field) => {
  console.log(field);
  const response = await axios.post(`${base_url}/api/form-fields`, field, {
    headers: config.getHeaders(field.selectedLanguage),
  });
  return response.data;
};

const updatefield = async (field, id, formId, fieldData) => {
  console.log(fieldData);
  const response = await axios.post(
    `${base_url}/api/form-fields/${id}`,
    field,
    {
      headers: config.getHeaders(fieldData.selectedLanguage),
    }
  );
  return response.data;
};

const getfield = async (id) => {
  const data = {};

  for (const lang of language) {
    const response = await axios.get(`${base_url}/api/form-fields/${id}`, {
      headers: config.getHeaders(lang),
    });
    data[lang] = response.data;
  }
  return data;
};

const deletefield = async (id, language) => {
  const response = await axios.delete(`${base_url}/api/form-fields/${id}`, {
    headers: config.getHeaders(language),
  });
  return response.data;
};

const formService = {
  getfields,
  createfield,
  updatefield,
  getfield,
  deletefield,
};

export default formService;
