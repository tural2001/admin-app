/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../components/CustomModal';
import { VscEdit } from 'react-icons/vsc';
import { RiDeleteBin5Line } from 'react-icons/ri';

import ReactPaginate from 'react-paginate';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Popup from 'reactjs-popup';
import {
  deleteServicecategories,
  getServicecategories,
  resetState,
} from '../features/servicecategories/servicecategoriesSlice';
import { getservices } from '../features/services/servicesSlice';
import { useTranslation } from '../components/TranslationContext';

const ServiceCList = () => {
  const [open, setOpen] = useState(false);
  const [reviewId, setreviewId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setreviewId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getServicecategories());
  }, []);

  const servicecstate =
    useSelector((state) => state.servicecategory?.serviceC?.data) || [];
  console.log(servicecstate);

  const deleteReview = (e) => {
    setOpen(false);
    dispatch(deleteServicecategories(e));
    setTimeout(() => {
      dispatch(getservices());
    }, 100);
  };
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;

  const filteredServiceC = servicecstate?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(servicecstate?.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const { translate, Language } = useTranslation();

  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title">{translate('Service_Categories', Language)}</h3>
        <Link
          to={`/admin/service-category`}
          className="flex justify-center items-center pr-3 gap-1 rounded-lg add_button_2"
        >
          <span className="mb-1 ml-2 text-[30px] hover:text-white">+</span>
          {translate('Add_Service_Category', Language)}
        </Link>
      </div>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Status', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Name', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Icon', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredServiceC?.map((servicec, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {servicec.id}
                  </th>
                  <td
                    className={`px-6 py-4 ${
                      servicec.active === true
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {servicec.active === true
                      ? `${translate('Active', Language)}`
                      : `${translate('Not_Active', Language)}`}
                  </td>
                  <td className="px-6 py-4">{servicec.name}</td>
                  <td className="px-6 py-4">
                    <Popup
                      trigger={
                        <div className="w-[150px] h-[50px] flex justify-center items-center">
                          <img
                            src={servicec.icon}
                            alt=""
                            className="object-cover"
                          />
                        </div>
                      }
                      modal
                      nested
                      contentStyle={{
                        padding: '0px',
                        borderRadius: '50px',
                        borderColor: 'white',
                        overflow: 'hidden',
                      }}
                    >
                      <div className="flex justify-center items-center">
                        <img
                          src={servicec.icon}
                          alt=""
                          className="object-cover"
                        />
                      </div>
                    </Popup>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link
                      to={`/admin/service-category/${filteredServiceC[index]?.id}`}
                      className="text-[25px] text-blue-500 "
                    >
                      <VscEdit />
                    </Link>

                    <button
                      onClick={() => showModal(filteredServiceC[index]?.id)}
                      className="text-[25px] text-red-500 "
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ReactPaginate
        previousLabel={<BsArrowLeft />}
        nextLabel={<BsArrowRight />}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteReview(reviewId);
        }}
        title={translate('Service_Category_Modal', Language)}
      />
    </div>
  );
};

export default ServiceCList;
