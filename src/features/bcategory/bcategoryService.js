import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getbcategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);
  return response.data;
};

const createbcategory = async (bcategory) => {
  const response = await axios.post(
    `${base_url}blogcategory/`,
    bcategory,
    config
  );
  return response.data;
};

const updatebcategory = async (bcategory) => {
  const response = await axios.put(
    `${base_url}blogcategory/${bcategory.id}`,
    { title: bcategory.bcategoryData.title },
    config
  );
  return response.data;
};

const getbcategory = async (id) => {
  const response = await axios.get(`${base_url}blogcategory/${id}`, config);
  return response.data;
};

const deletebcategory = async (id) => {
  const response = await axios.delete(`${base_url}blogcategory/${id}`, config);
  return response.data;
};

const bcategoryService = {
  getbcategories,
  createbcategory,
  updatebcategory,
  getbcategory,
  deletebcategory,
};

export default bcategoryService;
