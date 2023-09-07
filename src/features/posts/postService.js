import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getposts = async () => {
  const response = await axios.get(
    `${base_url}/api/posts?published=true`,
    config
  );
  return response.data;
};

const createpost = async (post) => {
  const response = await axios.post(`${base_url}/api/posts`, post, config);
  return response.data;
};

const updatepost = async (post, slug) => {
  const response = await axios.post(
    `${base_url}/api/posts/${slug}`,
    post,
    config
  );
  return response.data;
};

const getpost = async (slug) => {
  const response = await axios.get(`${base_url}/api/posts/${slug}`, config);

  return response.data;
};

const deletepost = async (slug) => {
  const response = await axios.delete(`${base_url}/api/posts/${slug}`, config);
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
