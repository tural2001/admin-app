import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';
import { language } from '../../Language/languages';

const getcampaigns = async (selectedLanguage) => {
  const response = await axios.get(`${base_url}/api/campaigns?inactive=true`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const createcampaign = async (campaign) => {
  const response = await axios.post(`${base_url}/api/campaigns`, campaign, {
    headers: config.getHeaders(campaign.selectedLanguage),
  });
  return response.data;
};
const updatecampaign = async (campaign, id, campaignData) => {
  console.log(campaign);
  const response = await axios.post(
    `${base_url}/api/campaigns/${id}`,
    campaign,
    {
      headers: config.getHeaders(campaignData.selectedLanguage),
    }
  );
  return response.data;
};

const getcampaign = async (id) => {
  const data = {};

  for (const lang of language) {
    const response = await axios.get(`${base_url}/api/campaigns/${id}`, {
      headers: config.getHeaders(lang),
    });

    data[lang] = response.data;
  }
  return data;
};

const deletecampaign = async (id, language) => {
  const response = await axios.delete(`${base_url}/api/campaigns/${id}`, {
    headers: config.getHeaders(language),
  });
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
