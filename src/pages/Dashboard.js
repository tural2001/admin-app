import React, { useEffect } from 'react';
import { Column } from '@ant-design/plots';
import { getcampaigns } from '../features/campaigns/campaignsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getvacancies } from '../features/vacancies/vacaciesSlice';
const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getcampaigns());
    dispatch(getvacancies());
  }, [dispatch]);

  const campaignState = useSelector((state) => state.campaign.campaigns.data);
  const vacancyState = useSelector((state) => state.vacancy.vacancies.data);
  // const userState = useSelector((state) => state);

  console.log(vacancyState, campaignState);
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

  // const config = {
  //   data,
  //   isGroup: true,
  //   xField: 'name',
  //   yField: 'value',
  //   seriesField: 'status',

  //   /** 设置颜色 */
  //   color: ['#1ca9e6', '#e12525'],

  //   /** 设置间距 */
  //   // marginRatio: 0.1,
  //   label: {
  //     // 可手动配置 label 数据标签位置
  //     position: 'middle',
  //     // 'top', 'middle', 'bottom'
  //     // 可配置附加的布局方法
  //     layout: [
  //       {
  //         type: 'interval-adjust-position',
  //       },
  //       {
  //         type: 'interval-hide-overlap',
  //       },
  //       {
  //         type: 'adjust-color',
  //       },
  //     ],
  //   },
  // };

  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title">Dashboard</h3>
      </div>
      {/* <div classstatus="">
        <Column {...config} />
      </div> */}
      <div className="flex w-full justify-between ">
        {' '}
        <div className=" overflow-x-auto shadow-md sm:rounded-lg">
          <label
            htmlFor=""
            className="text-[20px] text-blue-500 flex justify-center items-center border-b-2 rounded-3xl"
          >
            Campaigns
          </label>
          <table className="w-[500px] text-sm text-left text-gray-500 dark:text-gray-400 mt-3">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Status
                    <a href="#/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Name
                    <a href="#/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {campaignState?.map((campaign, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {campaign.id}
                  </th>
                  <td
                    className={`px-6 py-4 ${
                      campaign.active === true
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {campaign.active === true ? 'Active' : 'Not Active'}
                  </td>
                  <td className="px-6 py-4">{campaign.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <label
            htmlFor=""
            className="text-[20px]  text-blue-500 flex justify-center items-center border-b-2 rounded-3xl"
          >
            Vacancies
          </label>
          <table className="w-[500px] text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Status
                    <a href="#/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Title
                    <a href="#/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {vacancyState?.map((vacancy, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {vacancy.id}
                  </th>
                  <td
                    className={`px-6 py-4 ${
                      vacancy.active === true
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {vacancy.active === true ? 'Active' : 'Not Active'}
                  </td>
                  <td className="px-6 py-4">{vacancy.title}</td>
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
