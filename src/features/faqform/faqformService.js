import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getfaqforms = async () => {
  const response = await axios.get(
    `${base_url}/api/faq-forms?inactive=true`,
    config
  );
  return response.data;
};

const createfaqform = async (faqform) => {
  const response = await axios.post(
    `${base_url}/api/faq-forms`,
    faqform,
    config
  );
  return response.data;
};

const updatefaqform = async (faqform) => {
  const response = await axios.put(
    `${base_url}/api/faq-forms/${faqform.id}`,
    {
      name: faqform.faqformData.name,
      phone: faqform.faqformData.phone,
      question: faqform.faqformData.question,
    },
    config
  );
  return response.data;
};

const getfaqform = async (id) => {
  const response = await axios.get(`${base_url}/api/faq-forms/${id}`, config);
  return response.data;
};

const deletefaqform = async (id) => {
  const response = await axios.delete(
    `${base_url}/api/faq-forms/${id}`,
    config
  );
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
