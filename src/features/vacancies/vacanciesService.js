import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getvacancies = async () => {
  const response = await axios.get(
    `${base_url}/api/vacancies?inactive=true`,
    config
  );
  return response.data;
};

const createvacancy = async (vacancy) => {
  const response = await axios.post(
    `${base_url}/api/vacancies`,
    vacancy,
    config
  );
  return response.data;
};
const updatevacancy = async (vacancy) => {
  console.log(vacancy);
  const response = await axios.put(
    `${base_url}/api/vacancies/${vacancy.id}`,
    {
      title: vacancy.vacancyData.title,
      description: vacancy.vacancyData.description,
      active: vacancy.vacancyData.active,
    },
    config
  );
  return response.data;
};

const getvacancy = async (id) => {
  const response = await axios.get(`${base_url}/api/vacancies/${id}`, config);
  return response.data;
};

const deletevacancy = async (id) => {
  const response = await axios.delete(
    `${base_url}/api/vacancies/${id}`,
    config
  );
  return response.data;
};

const vacancyService = {
  getvacancies,
  createvacancy,
  getvacancy,
  updatevacancy,
  deletevacancy,
};

export default vacancyService;
