import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getformdatas = async () => {
  const selectedLanguage = 'az';
  const response = await axios.get(`${base_url}/api/register-form-data`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const getformdata = async (id) => {
  const selectedLanguage = 'az';

  const response = await axios.get(`${base_url}/api/register-form-data/${id}`, {
    headers: config.getHeaders(selectedLanguage),
  });
  console.log(response.data);
  return response.data;
};

const deleteformdata = async (id) => {
  const selectedLanguage = 'az';

  const response = await axios.delete(
    `${base_url}/api/register-form-data/${id}`,
    {
      headers: config.getHeaders(selectedLanguage),
    }
  );
  return response.data;
};

const formService = {
  getformdatas,
  getformdata,
  deleteformdata,
};

export default formService;
