import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getstructures = async () => {
  const response = await axios.get(
    `${base_url}/api/structures?inactive=true`,
    config
  );
  return response.data;
};

const createstructure = async (structure) => {
  const response = await axios.post(
    `${base_url}/api/structures`,
    structure,
    config
  );
  return response.data;
};
const updatestructure = async (structure, id) => {
  const response = await axios.post(
    `${base_url}/api/structures/${id}`,
    structure,
    config
  );
  return response.data;
};

const getstructure = async (id) => {
  const response = await axios.get(`${base_url}/api/structures/${id}`, config);
  return response.data;
};

const deletestructure = async (id) => {
  const response = await axios.delete(
    `${base_url}/api/structures/${id}`,
    config
  );
  return response.data;
};

const structureService = {
  getstructures,
  createstructure,
  getstructure,
  updatestructure,
  deletestructure,
};

export default structureService;
