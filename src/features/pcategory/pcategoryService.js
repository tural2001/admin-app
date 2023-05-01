import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getpcategories = async () => {
  const response = await axios.get(`${base_url}category/`);
  return response.data;
};

const createCategory = async (category) => {
  const response = await axios.post(`${base_url}category/`, category, config);
  return response.data;
};
const updateCategory = async (category) => {
  const response = await axios.put(
    `${base_url}category/${category.id}`,
    { title: category.categoryData.title },
    config
  );
  return response.data;
};
const getCategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, config);
  return response.data;
};
const deleteCategory = async (id) => {
  const response = await axios.delete(`${base_url}category/${id}`, config);
  return response.data;
};
const pcategoryService = {
  getpcategories,
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
};

export default pcategoryService;
