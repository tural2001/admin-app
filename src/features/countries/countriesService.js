import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getcountries = async () => {
  const response = await axios.get(
    `${base_url}/api/countries?inactive=true`,
    config
  );
  return response.data;
};

const createcountry = async (country) => {
  const response = await axios.post(
    `${base_url}/api/countries`,
    country,
    config
  );
  return response.data;
};

const updatecountry = async (country) => {
  const response = await axios.put(
    `${base_url}/api/countries/${country.id}`,
    {
      name: country.countryData.name,
      active: country.countryData.active,
    },
    config
  );
  return response.data;
};

const getcountry = async (id) => {
  const response = await axios.get(`${base_url}/api/countries/${id}`, config);
  return response.data;
};

const deletecountry = async (id) => {
  const response = await axios.delete(
    `${base_url}/api/countries/${id}`,
    config
  );
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
