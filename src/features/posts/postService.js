import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getposts = async () => {
  const response = await axios.get(
    `${base_url}/api/posts?inactive=true`,
    config
  );
  return response.data;
};

const createpost = async (post) => {
  const response = await axios.post(`${base_url}/api/posts`, post, config);
  return response.data;
};
const updatepost = async (post, id) => {
  const response = await axios.post(
    `${base_url}/api/posts/${id}`,
    post,
    config
  );
  return response.data;
};

const getpost = async (id) => {
  const response = await axios.get(`${base_url}/api/posts/${id}`, config);
  return response.data;
};

const deletepost = async (id) => {
  const response = await axios.delete(`${base_url}/api/posts/${id}`, config);
  return response.data;
};

const postService = {
  getposts,
  createpost,
  getpost,
  updatepost,
  deletepost,
};

export default postService;
