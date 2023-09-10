import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getcolors = async () => {
  const response = await axios.get(
    `${base_url}/api/colors?inactive=true`,
    config
  );
  return response.data;
};

const createcolor = async (color) => {
  const response = await axios.post(`${base_url}/api/colors`, color, config);
  return response.data;
};

const updatecolor = async (color) => {
  const response = await axios.put(
    `${base_url}/api/colors/${color.id}`,
    {
      code: color.colorData.code,
      name: color.colorData.name,
      active: color.colorData.active,
    },
    config
  );
  return response.data;
};

const getcolor = async (id) => {
  const response = await axios.get(`${base_url}/api/colors/${id}`, config);
  return response.data;
};

const deletecolor = async (id) => {
  const response = await axios.delete(`${base_url}/api/colors/${id}`, config);
  return response.data;
};

const colorService = {
  getcolors,
  createcolor,
  updatecolor,
  getcolor,
  deletecolor,
};

export default colorService;
