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
  const activeVacanciesCount = vacancyState?.filter(
    (vacancy) => vacancy.active === true
  ).length;
  const activeCampaignsCount = campaignState?.filter(
    (campaign) => campaign.active === true
  ).length;
  const notactiveVacanciesCount = vacancyState?.filter(
    (vacancy) => vacancy.active === false
  ).length;
  const notactiveCampaignsCount = campaignState?.filter(
    (campaign) => campaign.active === false
  ).length;

  const data = [
    {
      status: 'Active',
      name: 'Campaigns.',
      value: activeCampaignsCount,
    },
    {
      status: 'Not Active',
      name: 'Campaigns.',
      value: notactiveCampaignsCount,
    },
    {
      status: 'Active',
      name: 'Vacancies.',
      value: activeVacanciesCount,
    },
    {
      status: 'Not Active',
      name: 'Vacancies.',
      value: notactiveVacanciesCount,
    },
  ];
  const config = {
    data,
    isGroup: true,
    xField: 'name',
    yField: 'value',
    seriesField: 'status',

    /** 设置颜色 */
    color: ['#1ca9e6', '#e12525'],

    /** 设置间距 */
    // marginRatio: 0.1,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
  };

  return (
    <div>
      <div classstatus="flex justify-between gap-3 mb-4">
        <h3 classstatus="title">Dashboard</h3>{' '}
      </div>

      <div classstatus="">
        <Column {...config} />
      </div>
    </div>
  );
};

export default Dashboard;
