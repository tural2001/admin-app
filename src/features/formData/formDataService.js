import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getformdatas = async () => {
  const response = await axios.get(`${base_url}/api/form-data`, config);
  return response.data;
};

// const createformdata = async (formdata) => {
//   const response = await axios.post(
//     `${base_url}/api/form-data`,
//     formdata,
//     config
//   );
//   return response.data;
// };

// const updateformdata = async (formdata, id) => {
//   const response = await axios.post(
//     `${base_url}/api/form-data/${id}`,
//     formdata,
//     config
//   );
//   return response.data;
// };

const getformdata = async (id) => {
  const response = await axios.get(`${base_url}/api/form-data/${id}`, config);
  console.log(response.data);
  return response.data;
};

const deleteformdata = async (id) => {
  const response = await axios.delete(
    `${base_url}/api/form-data/${id}`,
    config
  );
  return response.data;
};

const formService = {
  getformdatas,
  // createformdata,
  // updateformdata,
  getformdata,
  deleteformdata,
};

export default formService;
