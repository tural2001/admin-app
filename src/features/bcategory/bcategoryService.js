import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getbcategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);
  return response.data;
};

const bcategoryService = {
  getbcategories,
};

export default bcategoryService;
