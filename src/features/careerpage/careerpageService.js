import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getcareerpages = async (selectedLanguage) => {
  console.log(selectedLanguage);
  const response = await axios.get(`${base_url}/api/careers?inactive=true`, {
    headers: config.getHeaders(selectedLanguage),
  });

  return response.data;
};

const createcareerpage = async (careerpage) => {
  console.log(careerpage);
  const response = await axios.post(
    `${base_url}/api/careers`,
    careerpage.values,
    {
      headers: config.getHeaders(careerpage.selectedLanguage),
    }
  );
  return response.data;
};

const updatecareerpage = async (careerpage) => {
  console.log(careerpage.selectedLanguage);
  const response = await axios.put(
    `${base_url}/api/careers/${careerpage.id}`,
    {
      name: careerpage.careerpageData.name,
      address: careerpage.careerpageData.address,
      description: careerpage.careerpageData.description,
      active: careerpage.careerpageData.active,
    },
    {
      headers: config.getHeaders(careerpage.selectedLanguage),
    }
  );
  return response.data;
};
const getcareerpage = async (id) => {
  const data = {};

  for (const lang of language) {
    const response = await axios.get(`${base_url}/api/careers/${id}`, {
      headers: config.getHeaders(lang),
    });

    data[lang] = response.data;
  }
  return data;
};

const deletecareerpage = async (id, language) => {
  const response = await axios.delete(`${base_url}/api/careers/${id}`, {
    headers: config.getHeaders(language),
  });
  return response.data;
};

const careerpagepageService = {
  getcareerpages,
  createcareerpage,
  updatecareerpage,
  getcareerpage,
  deletecareerpage,
};

export default careerpagepageService;
