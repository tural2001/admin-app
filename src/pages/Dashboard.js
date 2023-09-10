import React, { useEffect } from 'react';
import { getcampaigns } from '../features/campaigns/campaignsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getvacancies } from '../features/vacancies/vacaciesSlice';
import { getfaqforms } from '../features/faqform/faqformSlice';
import { getcareers } from '../features/career/careerSlice';
import Popup from 'reactjs-popup';
const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getcampaigns());
    dispatch(getvacancies());
    dispatch(getfaqforms());
    dispatch(getcareers());
  }, [dispatch]);

  const campaignState = useSelector((state) => state.campaign?.campaigns?.data);
  const vacancyState = useSelector((state) => state.vacancy?.vacancies?.data);
  const faqformState = useSelector((state) => state.faqform?.faqforms?.data);
  const careerformState = useSelector((state) => state.career?.careers?.data);

  // const userState = useSelector((state) => state);

  // const activeVacanciesCount = vacancyState?.filter(
  //   (vacancy) => vacancy.active === true
  // ).length;
  // const activeCampaignsCount = campaignState?.filter(
  //   (campaign) => campaign.active === true
  // ).length;
  // const notactiveVacanciesCount = vacancyState?.filter(
  //   (vacancy) => vacancy.active === false
  // ).length;
  // const notactiveCampaignsCount = campaignState?.filter(
  //   (campaign) => campaign.active === false
  // ).length;

  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title">Dashboard</h3>
      </div>

      <div className="flex flex-col gap-10 w-full justify-between ">
        <div className=" overflow-x-auto shadow-md sm:rounded-lg">
          <label
            htmlFor=""
            className="text-[20px] text-blue-500 flex justify-center items-center  label-title"
          >
            Faq Form
          </label>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-3">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Name</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Phone</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Question</div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {faqformState?.map((faqform, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {faqform.id}
                  </th>

                  <td className="px-6 py-4">{faqform.name}</td>
                  <td className="px-6 py-4">{faqform.phone}</td>
                  <td className="px-6 py-4">{faqform.question}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className=" overflow-x-auto shadow-md sm:rounded-lg">
          <label
            htmlFor=""
            className="text-[20px] text-blue-500 flex justify-center items-center label-title"
          >
            Career Form
          </label>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-3">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Name</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Phone</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Email</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Vacancy Name</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Notes</div>
                </th>{' '}
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Cv</div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {careerformState?.map((faqform, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {faqform.id}
                  </th>

                  <td className="px-6 py-4">{faqform.name}</td>
                  <td className="px-6 py-4">{faqform.phone}</td>
                  <td className="px-6 py-4">{faqform.email}</td>
                  <td className="px-6 py-4">{faqform.vacancy_name}</td>
                  <td className="px-6 py-4">{faqform.notes}</td>
                  <Popup
                    trigger={
                      <button>
                        {' '}
                        <img
                          src="https://azeronline.netlify.app/static/media/blog2.891d84e7b5ab348201fd.png"
                          alt=""
                          width={150}
                          height={50}
                        />{' '}
                      </button>
                    }
                    modal
                    nested
                    contentStyle={{
                      padding: '0px',
                      borderRadius: '50px',
                      borderColor: 'white',
                      width: '1110px',
                      height: '575px',
                      overflow: 'hidden',
                    }}
                  >
                    <div>
                      <img
                        src="https://azeronline.netlify.app/static/media/blog2.891d84e7b5ab348201fd.png"
                        alt=""
                        width={1110}
                        height={50}
                      />{' '}
                    </div>
                  </Popup>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
