/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import { getcampaigns } from '../features/campaigns/campaignsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getfaqforms } from '../features/faqform/faqformSlice';
import { getcareers } from '../features/career/careerSlice';
import { getformdatas } from '../features/formData/formDataSlice';
import { debounce } from 'lodash';
import { useTranslation } from '../components/TranslationContext';

const Dashboard = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const debouncedDispatch = debounce(dispatch, 1000);

  //   dispatch(getcampaigns());
  //   dispatch(getcareers());
  //   dispatch(getfaqforms());
  //   dispatch(getcareers());
  //   dispatch(getformdatas());
  //   return () => {
  //     debouncedDispatch.cancel();
  //   };
  // }, []);

  const debouncedApiCalls = useCallback(
    debounce(() => {
      dispatch(getcampaigns());
      dispatch(getcareers());
      dispatch(getfaqforms());
      dispatch(getformdatas());
    }, 1000),
    [dispatch]
  );

  useEffect(() => {
    debouncedApiCalls();
  }, [debouncedApiCalls]);

  const formdatastate =
    useSelector((state) => state.formdata?.formdatas?.data) || [];
  // const dataList = formdatastate.map((item) => item.data);
  // const parsedDataList = dataList.map((data) => JSON.parse(data));

  const faqformState =
    useSelector((state) => state.faqform?.faqforms?.data) || [];
  const careerformState =
    useSelector((state) => state.career?.careers?.data) || [];

  const formatDate = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };

    return new Date(dateTimeString).toLocaleString(undefined, options);
  };
  const { translate, Language } = useTranslation();

  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title"> {translate('Dashboard', Language)}</h3>
      </div>
      <div className="flex flex-col gap-10 w-full justify-between ">
        <div className=" overflow-x-auto shadow-md sm:rounded-lg">
          <label
            htmlFor=""
            className="text-[20px] text-blue-500 flex justify-center items-center  label-title"
          >
            {translate('Faq_Forms', Language)}
          </label>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-3">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Name', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Phone', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Question', Language)}
                  </div>
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
            {translate('Career_Forms', Language)}
          </label>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-3">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Name', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Phone', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Email', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Vacancy_Name', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Notes', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Cv', Language)}
                  </div>
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
                  <td className="px-6 py-4">
                    <a
                      href={faqform.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {faqform.cv}
                    </a>
                  </td>
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
