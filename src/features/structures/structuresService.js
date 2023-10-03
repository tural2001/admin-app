import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getstructures = async (selectedLanguage) => {
  const response = await axios.get(`${base_url}/api/structures?inactive=true`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createstructure = async (structure) => {
  const response = await axios.post(`${base_url}/api/structures`, structure, {
    headers: config.getHeaders(structure.selectedLanguage),
  });
  return response.data;
};
const updatestructure = async (structure, id, structureData) => {
  const response = await axios.post(
    `${base_url}/api/structures/${id}`,
    structure,
    {
      headers: config.getHeaders(structureData.selectedLanguage),
    }
  );
  return response.data;
};

const getstructure = async (id) => {
  const data = {};

  for (const lang of language) {
    const response = await axios.get(`${base_url}/api/structures/${id}`, {
      headers: config.getHeaders(lang),
    });

    data[lang] = response.data;
  }
  return data;
};

const deletestructure = async (id, language) => {
  const response = await axios.delete(`${base_url}/api/structures/${id}`, {
    headers: config.getHeaders(language),
  });
  return response.data;
};

const structureService = {
  getstructures,
  createstructure,
  getstructure,
  updatestructure,
  deletestructure,
};

export default structureService;
