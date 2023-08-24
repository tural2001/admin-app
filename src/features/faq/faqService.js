import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getfaqs = async () => {
  const response = await axios.get(`${base_url}/api/faqs`, config);
  return response.data;
};

const createfaq = async (faq) => {
  const response = await axios.post(`${base_url}/api/faqs`, faq, config);
  return response.data;
};

const updatefaq = async (faq) => {
  const response = await axios.put(
    `${base_url}/api/faqs/${faq.id}`,
    {
      question: faq.faqData.question,
      answer: faq.faqData.answer,
      active: faq.faqData.active,
    },
    config
  );
  return response.data;
};

const getfaq = async (id) => {
  const response = await axios.get(`${base_url}/api/faqs/${id}`, config);
  return response.data;
};

const deletefaq = async (id) => {
  const response = await axios.delete(`${base_url}/api/faqs/${id}`, config);
  return response.data;
};

const faqService = {
  getfaqs,
  createfaq,
  updatefaq,
  getfaq,
  deletefaq,
};

export default faqService;
