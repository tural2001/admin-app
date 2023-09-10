import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getcareers = async () => {
  const response = await axios.get(`${base_url}/api/career-forms`, config);
  return response.data;
};

const createcareer = async (career) => {
  const response = await axios.post(
    `${base_url}/api/career-forms`,
    career,
    config
  );
  return response.data;
};
const updatecareer = async (career, id) => {
  const response = await axios.post(
    `${base_url}/api/career-forms/${id}`,
    career,
    config
  );
  return response.data;
};

const getcareer = async (id) => {
  const response = await axios.get(
    `${base_url}/api/career-forms/${id}`,
    config
  );
  return response.data;
};

const deletecareer = async (id) => {
  const response = await axios.delete(
    `${base_url}/api/career-forms/${id}`,
    config
  );
  return response.data;
};

const careerService = {
  getcareers,
  createcareer,
  getcareer,
  updatecareer,
  deletecareer,
};

export default careerService;
