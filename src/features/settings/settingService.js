import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getsettings = async () => {
  const response = await axios.get(`${base_url}/api/settings`, config);
  console.log(response.data);
  return response.data;
};

const createsetting = async (setting) => {
  const response = await axios.post(
    `${base_url}/api/settings`,
    setting,
    config
  );
  return response.data;
};

const updatesetting = async (setting) => {
  const response = await axios.put(
    `${base_url}/api/settings/${setting.id}`,
    {
      key: setting.settingData.key,
      value: setting.settingData.value,
    },
    config
  );
  return response.data;
};

const getsetting = async (id) => {
  const response = await axios.get(`${base_url}/api/settings/${id}`, config);
  return response.data;
};

const deletesetting = async (id) => {
  const response = await axios.delete(`${base_url}/api/settings/${id}`, config);
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
