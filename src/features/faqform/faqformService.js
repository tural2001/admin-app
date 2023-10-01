import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getfaqforms = async () => {
  const selectedLanguage = 'az';
  const response = await axios.get(`${base_url}/api/faq-forms?inactive=true`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createfaqform = async (faqform) => {
  const selectedLanguage = 'az';

  const response = await axios.post(`${base_url}/api/faq-forms`, faqform, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const updatefaqform = async (faqform) => {
  const selectedLanguage = 'az';

  const response = await axios.put(
    `${base_url}/api/faq-forms/${faqform.id}`,
    {
      name: faqform.faqformData.name,
      phone: faqform.faqformData.phone,
      question: faqform.faqformData.question,
    },
    { headers: config.getHeaders(selectedLanguage) }
  );
  return response.data;
};

const getfaqform = async (id) => {
  const selectedLanguage = 'az';

  const response = await axios.get(`${base_url}/api/faq-forms/${id}`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const deletefaqform = async (id) => {
  const selectedLanguage = 'az';
  const response = await axios.delete(`${base_url}/api/faq-forms/${id}`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const faqformService = {
  getfaqforms,
  createfaqform,
  updatefaqform,
  getfaqform,
  deletefaqform,
};

export default faqformService;
