import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getpaymentformdatas = async () => {
  const selectedLanguage = 'az';
  const response = await axios.get(
    `${base_url}/api/installment-payment-form-data`,
    {
      headers: config.getHeaders(selectedLanguage),
    }
  );
  return response.data;
};

const getpaymentformdata = async (id) => {
  const selectedLanguage = 'az';

  const response = await axios.get(
    `${base_url}/api/installment-payment-form-data/${id}`,
    {
      headers: config.getHeaders(selectedLanguage),
    }
  );
  console.log(response.data);
  return response.data;
};

const deletepaymentformdata = async (id) => {
  const selectedLanguage = 'az';

  const response = await axios.delete(
    `${base_url}/api/installment-payment-form-data/${id}`,
    {
      headers: config.getHeaders(selectedLanguage),
    }
  );
  return response.data;
};

const paymentformService = {
  getpaymentformdatas,
  getpaymentformdata,
  deletepaymentformdata,
};

export default paymentformService;
