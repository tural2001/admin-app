import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getpayments = async () => {
  const response = await axios.get(
    `${base_url}/api/payments?inactive=true`,
    config
  );
  return response.data;
};

const createpayment = async (payment) => {
  const response = await axios.post(
    `${base_url}/api/payments`,
    payment,
    config
  );
  return response.data;
};
const updatepayment = async (payment, id) => {
  const response = await axios.post(
    `${base_url}/api/payments/${id}`,
    payment,
    config
  );
  return response.data;
};

const getpayment = async (id) => {
  const response = await axios.get(`${base_url}/api/payments/${id}`, config);
  return response.data;
};

const deletepayment = async (id) => {
  const response = await axios.delete(`${base_url}/api/payments/${id}`, config);
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
