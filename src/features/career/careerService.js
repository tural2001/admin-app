import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getcareers = async () => {
  const selectedLanguage = 'az';
  const response = await axios.get(`${base_url}/api/career-forms`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createcareer = async (career) => {
  const selectedLanguage = 'az';

  const response = await axios.post(`${base_url}/api/career-forms`, career, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};
const updatecareer = async (career, id) => {
  const selectedLanguage = 'az';
  const response = await axios.post(
    `${base_url}/api/career-forms/${id}`,
    career,
    {
      headers: config.getHeaders(selectedLanguage),
    }
  );
  return response.data;
};

const getcareer = async (id) => {
  const selectedLanguage = 'az';

  const response = await axios.get(`${base_url}/api/career-forms/${id}`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const deletecareer = async (id) => {
  const selectedLanguage = 'az';

  const response = await axios.delete(`${base_url}/api/career-forms/${id}`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const careerService = {
  getcareers,
  createcareer,
  getcareer,
  updatecareer,
  deletecareer,
};

export default careerService;
