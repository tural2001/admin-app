import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getcountries = async (selectedLanguage) => {
  const response = await axios.get(`${base_url}/api/countries?inactive=true`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createcountry = async (country) => {
  const response = await axios.post(`${base_url}/api/countries`, country, {
    headers: config.getHeaders(country.selectedLanguage),
  });
  return response.data;
};

const updatecountry = async (country, id, countryData) => {
  const response = await axios.post(
    `${base_url}/api/countries/${id}`,
    country,
    {
      headers: config.getHeaders(countryData.selectedLanguage),
    }
  );
  return response.data;
};

const getcountry = async (id) => {
  const data = {};

  for (const lang of language) {
    const response = await axios.get(`${base_url}/api/countries/${id}`, {
      headers: config.getHeaders(lang),
    });

    data[lang] = response.data;
  }
  return data;
};

const deletecountry = async (id, language) => {
  const response = await axios.delete(`${base_url}/api/countries/${id}`, {
    headers: config.getHeaders(language),
  });
  return response.data;
};

const countryService = {
  getcountries,
  createcountry,
  updatecountry,
  getcountry,
  deletecountry,
};

export default countryService;
