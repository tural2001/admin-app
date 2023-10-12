import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getpaymentfields = async (selectedLanguage) => {
  const response = await axios.get(
    `${base_url}/api/installment-payment-form-fields`,
    {
      headers: config.getHeaders(selectedLanguage),
    }
  );
  return response.data;
};

const createpaymentfield = async (paymentfield) => {
  console.log(paymentfield);
  const response = await axios.post(
    `${base_url}/api/installment-payment-form-fields`,
    paymentfield,
    {
      headers: config.getHeaders(paymentfield.selectedLanguage),
    }
  );
  return response.data;
};

const updatepaymentfield = async (
  paymentfield,
  id,
  formId,
  paymentfieldData
) => {
  console.log(paymentfieldData);
  const response = await axios.post(
    `${base_url}/api/installment-payment-form-fields/${id}`,
    paymentfield,
    {
      headers: config.getHeaders(paymentfieldData.selectedLanguage),
    }
  );
  return response.data;
};

const getpaymentfield = async (id) => {
  const data = {};

  for (const lang of language) {
    const response = await axios.get(
      `${base_url}/api/installment-payment-form-fields/${id}`,
      {
        headers: config.getHeaders(lang),
      }
    );
    data[lang] = response.data;
  }
  return data;
};

const deletepaymentfield = async (id, language) => {
  const response = await axios.delete(
    `${base_url}/api/installment-payment-form-fields/${id}`,
    {
      headers: config.getHeaders(language),
    }
  );
  return response.data;
};

const paymentformService = {
  getpaymentfields,
  createpaymentfield,
  updatepaymentfield,
  getpaymentfield,
  deletepaymentfield,
};

export default paymentformService;
