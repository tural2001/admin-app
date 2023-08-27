import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getcampaigns = async () => {
  const response = await axios.get(
    `${base_url}/api/campaigns?inactive=true`,
    config
  );
  return response.data;
};

const createcampaign = async (campaign) => {
  const response = await axios.post(
    `${base_url}/api/campaigns`,
    campaign,
    config
  );
  return response.data;
};
const updatecampaign = async (campaign, id) => {
  const response = await axios.post(
    `${base_url}/api/campaigns/${id}`,
    campaign,
    config
  );
  return response.data;
};

const getcampaign = async (id) => {
  const response = await axios.get(`${base_url}/api/campaigns/${id}`, config);
  return response.data;
};

const deletecampaign = async (id) => {
  const response = await axios.delete(
    `${base_url}/api/campaigns/${id}`,
    config
  );
  return response.data;
};

const campaignService = {
  getcampaigns,
  createcampaign,
  getcampaign,
  updatecampaign,
  deletecampaign,
};

export default campaignService;
