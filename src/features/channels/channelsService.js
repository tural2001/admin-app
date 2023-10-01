import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getchannels = async (selectedLanguage) => {
  const response = await axios.get(`${base_url}/api/channels?inactive=true`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createchannel = async (channel) => {
  const response = await axios.post(`${base_url}/api/channels`, channel, {
    headers: config.getHeaders(channel.selectedLanguage),
  });
  return response.data;
};
const updatechannel = async (channel, id, channelData) => {
  const response = await axios.post(`${base_url}/api/channels/${id}`, channel, {
    headers: config.getHeaders(channelData.selectedLanguage),
  });
  return response.data;
};

const getchannel = async (id) => {
  const data = {};

  for (const lang of language) {
    const response = await axios.get(`${base_url}/api/channels/${id}`, {
      headers: config.getHeaders(lang),
    });

    data[lang] = response.data;
  }
  return data;
};

const deletechannel = async (id, language) => {
  const response = await axios.delete(`${base_url}/api/channels/${id}`, {
    headers: config.getHeaders(language),
  });
  return response.data;
};

const channelService = {
  getchannels,
  createchannel,
  getchannel,
  updatechannel,
  deletechannel,
};

export default channelService;
