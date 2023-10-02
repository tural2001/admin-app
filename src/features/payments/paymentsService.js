import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getpayments = async (selectedLanguage) => {
  const response = await axios.get(`${base_url}/api/payments?inactive=true`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createpayment = async (payment) => {
  const response = await axios.post(`${base_url}/api/payments`, payment, {
    headers: config.getHeaders(payment.selectedLanguage),
  });
  return response.data;
};
const updatepayment = async (payment, id, paymentData) => {
  const response = await axios.post(`${base_url}/api/payments/${id}`, payment, {
    headers: config.getHeaders(paymentData.selectedLanguage),
  });
  return response.data;
};

const getpayment = async (id) => {
  const data = {};
  for (const lang of language) {
    const response = await axios.get(`${base_url}/api/payments/${id}`, {
      headers: config.getHeaders(lang),
    });
    data[lang] = response.data;
  }

  return data;
};

const deletepayment = async (id, selectedLanguage) => {
  const response = await axios.delete(`${base_url}/api/payments/${id}`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const paymentService = {
  getpayments,
  createpayment,
  getpayment,
  updatepayment,
  deletepayment,
};

export default paymentService;
