/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../components/CustomModal';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import {
  deleteAcareer,
  getcareers,
  resetState,
} from '../features/career/careerSlice';
import { useTranslation } from '../components/TranslationContext';

const CareerList = () => {
  const [open, setOpen] = useState(false);
  const [careerId, setcareerId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setcareerId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getcareers());
  }, []);

  const careerstate = useSelector((state) => state.career.careers.data) || [];
  console.log(careerstate);

  const deletecareer = (e) => {
    setOpen(false);
    dispatch(deleteAcareer(e));
    toast.success('career Deleted Successfully!');
    setTimeout(() => {
      dispatch(getcareers());
    }, 1000);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;

  const filteredcareer = careerstate?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(careerstate?.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const { translate, Language } = useTranslation();

  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title">{translate('Career_Forms', Language)}</h3>{' '}
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
              {filteredcareer?.map((career, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {career.id}
                  </th>
                  <td className="px-6 py-4">{career.name}</td>
                  <td className="px-6 py-4">{career.phone}</td>
                  <td className="px-6 py-4">{career.email}</td>
                  <td className="px-6 py-4">{career.vacancy_name}</td>
                  <td className="px-6 py-4">{career.notes}</td>

                  <td className="px-6 py-4">
                    <a
                      href={career.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {career.cv}
                    </a>
                  </td>
                  <td className="px-6 py-16 flex gap-2">
                    <button
                      onClick={() => showModal(filteredcareer[index]?.id)}
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
          deletecareer(careerId);
        }}
        title={translate('Career_Modal', Language)}
      />
    </div>
  );
};

export default CareerList;
