import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getchannels = async () => {
  const response = await axios.get(
    `${base_url}/api/channels?inactive=true`,
    config
  );
  return response.data;
};

const createchannel = async (channel) => {
  const response = await axios.post(
    `${base_url}/api/channels`,
    channel,
    config
  );
  return response.data;
};
const updatechannel = async (channel, id) => {
  const response = await axios.post(
    `${base_url}/api/channels/${id}`,
    channel,
    config
  );
  return response.data;
};

const getchannel = async (id) => {
  const response = await axios.get(`${base_url}/api/channels/${id}`, config);
  return response.data;
};

const deletechannel = async (id) => {
  const response = await axios.delete(`${base_url}/api/channels/${id}`, config);
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
