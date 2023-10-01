import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getReviews = async (selectedLanguage) => {
  const response = await axios.get(`${base_url}/api/reviews?inactive=true`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createReview = async (review) => {
  const response = await axios.post(`${base_url}/api/reviews`, review, {
    headers: config.getHeaders(review.selectedLanguage),
  });
  return response.data;
};
const updateReview = async (review, id, reviewData) => {
  const response = await axios.post(`${base_url}/api/reviews/${id}`, review, {
    headers: config.getHeaders(reviewData.selectedLanguage),
  });
  return response.data;
};
const getReview = async (id) => {
  const data = {};
  for (const lang of language) {
    const response = await axios.get(`${base_url}/api/reviews/${id}`, {
      headers: config.getHeaders(lang),
    });
    data[lang] = response.data;
  }

  return data;
};
const deleteReview = async (id, selectedLanguage) => {
  const response = await axios.delete(`${base_url}/api/reviews/${id}`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};
const reviewsService = {
  getReviews,
  createReview,
  getReview,
  deleteReview,
  updateReview,
};

export default reviewsService;
