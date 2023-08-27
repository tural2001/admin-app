import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getpages = async () => {
  const response = await axios.get(
    `${base_url}/api/pages?inactive=true`,
    config
  );
  return response.data;
};

const createpage = async (page) => {
  const response = await axios.post(`${base_url}/api/pages`, page, config);
  return response.data;
};

const updatepage = async (page, id) => {
  const response = await axios.post(
    `${base_url}/api/pages/${id}`,
    page,
    config
  );
  return response.data;
};

const getpage = async (id) => {
  const response = await axios.get(`${base_url}/api/pages/${id}`, config);
  return response.data;
};

const deletepage = async (id) => {
  const response = await axios.delete(`${base_url}/api/pages/${id}`, config);
  return response.data;
};

const pageService = {
  getpages,
  createpage,
  updatepage,
  getpage,
  deletepage,
};

export default pageService;
