import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getsettings = async () => {
  const selectedLanguage = 'az';

  const response = await axios.get(`${base_url}/api/settings`, {
    headers: config.getHeaders(selectedLanguage),
  });
  console.log(response.data);
  return response.data;
};

const createsetting = async (setting) => {
  const selectedLanguage = 'az';

  const response = await axios.post(`${base_url}/api/settings`, setting, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const updatesetting = async (setting) => {
  const selectedLanguage = 'az';

  const response = await axios.put(
    `${base_url}/api/settings/${setting.id}`,
    {
      key: setting.settingData.key,
      value: setting.settingData.value,
    },
    {
      headers: config.getHeaders(selectedLanguage),
    }
  );
  return response.data;
};

const getsetting = async (id) => {
  const selectedLanguage = 'az';

  const response = await axios.get(`${base_url}/api/settings/${id}`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const deletesetting = async (id) => {
  const selectedLanguage = 'az';

  const response = await axios.delete(`${base_url}/api/settings/${id}`, {
    headers: config.getHeaders(selectedLanguage),
  });
  return response.data;
};

const settingService = {
  getsettings,
  createsetting,
  updatesetting,
  getsetting,
  deletesetting,
};

export default settingService;
