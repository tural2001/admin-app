import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getposts = async () => {
  const selectedLanguage = 'az';

  const response = await axios.get(`${base_url}/api/posts?published=true`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createpost = async (post) => {
  const selectedLanguage = 'az';

  const response = await axios.post(`${base_url}/api/posts`, post, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const updatepost = async (post, slug, postData) => {
  const selectedLanguage = 'az';
  const response = await axios.post(`${base_url}/api/posts/${slug}`, post, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const getpost = async (slug) => {
  const selectedLanguage = 'az';

  const data = {};

  for (const lang of language) {
    const response = await axios.get(`${base_url}/api/posts/${slug}`, {
      headers: config.getHeaders(selectedLanguage),
    });

    data[lang] = response.data;
  }
  return data;
};

const deletepost = async (slug, language) => {
  const selectedLanguage = 'az';

  const response = await axios.delete(`${base_url}/api/posts/${slug}`, {
    headers: config.getHeaders(selectedLanguage),
  });
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
