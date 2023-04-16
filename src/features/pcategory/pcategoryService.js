import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getpcategories = async () => {
  const response = await axios.get(`${base_url}category/`);
  return response.data;
};

const pcategoryService = {
  getpcategories,
};

export default pcategoryService;
