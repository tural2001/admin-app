import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getslides = async () => {
  const response = await axios.get(
    `${base_url}/api/slides?inactive=true`,
    config
  );
  return response.data;
};

const createslide = async (slide) => {
  const response = await axios.post(`${base_url}/api/slides`, slide, config);
  return response.data;
};
const updateslide = async (slide, id) => {
  const response = await axios.post(
    `${base_url}/api/slides/${id}`,
    slide,
    config
  );
  return response.data;
};

const getslide = async (id) => {
  const response = await axios.get(`${base_url}/api/slides/${id}`, config);
  return response.data;
};

const deleteslide = async (id) => {
  const response = await axios.delete(`${base_url}/api/slides/${id}`, config);
  return response.data;
};

const slideService = {
  getslides,
  createslide,
  getslide,
  updateslide,
  deleteslide,
};

export default slideService;
