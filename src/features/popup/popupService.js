import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getpopups = async () => {
  const response = await axios.get(`${base_url}/api/popups`, config);
  return response.data;
};

const createpopup = async (popup) => {
  const response = await axios.post(`${base_url}/api/popups`, popup, config);
  return response.data;
};
const updatepopup = async (popup) => {
  const response = await axios.put(
    `${base_url}/api/popups/${popup.id}`,
    {
      content: popup.popupData.content,
      handle: popup.popupData.handle,
      active: popup.popupData.active,
    },
    config
  );
  return response.data;
};

const getpopup = async (id) => {
  const response = await axios.get(`${base_url}/api/popups/${id}`, config);
  return response.data;
};

const deletepopup = async (id) => {
  const response = await axios.delete(`${base_url}/api/popups/${id}`, config);
  return response.data;
};

const popupService = {
  getpopups,
  createpopup,
  getpopup,
  updatepopup,
  deletepopup,
};

export default popupService;
