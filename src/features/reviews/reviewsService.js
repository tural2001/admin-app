import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getReviews = async () => {
  const response = await axios.get(`${base_url}/api/reviews`, config);
  return response.data;
};

const createReview = async (review) => {
  const response = await axios.post(`${base_url}/api/reviews`, review, config);
  return response.data;
};
const updateReview = async (review) => {
  const response = await axios.put(
    `${base_url}/api/reviews/${review.id}`,
    {
      reviewer_name: review.reviewData.reviewer_name,
      comment: review.reviewData.comment,
      active: review.reviewData.active,
      show_on_home_page: review.reviewData.show_on_home_page,
    },
    config
  );
  return response.data;
};
const getReview = async (id) => {
  const response = await axios.get(`${base_url}/api/reviews/${id}`, config);
  return response.data;
};
const deleteReview = async (id) => {
  const response = await axios.delete(`${base_url}/api/reviews/${id}`, config);
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
