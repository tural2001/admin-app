import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';
const getfaqs = async (selectedLanguage) => {
  const response = await axios.get(`${base_url}/api/faqs?inactive=true`, {
    headers: config.getHeaders(selectedLanguage),
  });

  return response.data;
};

const createfaq = async (faq, selectedLanguage) => {
  console.log(faq);
  const response = await axios.post(`${base_url}/api/faqs`, faq.values, {
    headers: config.getHeaders(faq.selectedLanguage),
  });
  return response.data;
};

const updatefaq = async (faq, selectedLanguage) => {
  console.log(faq.selectedLanguage);
  const response = await axios.put(
    `${base_url}/api/faqs/${faq.id}`,
    {
      question: faq.faqData.question,
      answer: faq.faqData.answer,
      active: faq.faqData.active,
    },
    {
      headers: config.getHeaders(faq.selectedLanguage),
    }
  );
  return response.data;
};
const getfaq = async (id) => {
  const data = {};

  for (const lang of language) {
    const response = await axios.get(`${base_url}/api/faqs/${id}`, {
      headers: config.getHeaders(lang),
    });
    data[lang] = response.data;
  }

  console.log(data);
  return data;
};

const deletefaq = async (id, language) => {
  const response = await axios.delete(`${base_url}/api/faqs/${id}`, {
    headers: config.getHeaders(language),
  });
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
