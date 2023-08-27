import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getpartners = async () => {
  const response = await axios.get(
    `${base_url}/api/partners?inactive=true`,
    config
  );
  return response.data;
};

const createpartner = async (partner) => {
  const response = await axios.post(
    `${base_url}/api/partners`,
    partner,
    config
  );
  return response.data;
};

const getpartner = async (id) => {
  const response = await axios.get(`${base_url}/api/partners/${id}`, config);
  return response.data;
};

const deletepartner = async (id) => {
  const response = await axios.delete(`${base_url}/api/partners/${id}`, config);
  return response.data;
};

const updatepartner = async (partner, id) => {
  const response = await axios.post(
    `${base_url}/api/partners/${id}`,
    partner,
    config
  );
  return response.data;
};

const partnerService = {
  getpartners,
  createpartner,
  getpartner,
  deletepartner,
  updatepartner,
};

export default partnerService;
