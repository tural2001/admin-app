import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../components/CustomModal';
import { RiDeleteBin5Line } from 'react-icons/ri';

import ReactPaginate from 'react-paginate';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import {
  deleteAformdata,
  getformdatas,
  resetState,
} from '../features/formData/formDataSlice';

const FormDataList = () => {
  const [open, setOpen] = useState(false);
  const [formdataId, setformdataId] = useState('');

  const showModal = (e) => {
    setOpen(true);
    setformdataId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getformdatas());
  }, [dispatch]);

  const formdatastate =
    useSelector((state) => state.formdata?.formdatas?.data) || [];
  // const dataList = formdatastate.map((item) => item.data);
  // const parsedDataList = dataList.map((data) => JSON.parse(data));

  const deleteformdata = (e) => {
    setOpen(false);
    dispatch(deleteAformdata(e));
    setTimeout(() => {
      dispatch(getformdatas());
    }, 100);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;

  const filteredformdata = formdatastate?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(formdatastate?.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

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

  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title">Form Data List</h3>{' '}
      </div>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-3">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Data</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Read At</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Created At</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Updated At</div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredformdata?.map((form, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {form.id}
                    </th>
                    <td className="px-6 py-4">{form.data}</td>
                    <td className="px-6 py-4">
                      {form.read_at ? form.read_at : 'null'}
                    </td>
                    <td className="px-6 py-4">{formatDate(form.created_at)}</td>
                    <td className="px-6 py-4">{formatDate(form.updated_at)}</td>
                    <td className="px-6 py-16 flex gap-2">
                      <button
                        onClick={() => showModal(formdatastate[index]?.id)}
                        className="text-[25px] text-red-500 "
                      >
                        <RiDeleteBin5Line />
                      </button>
                    </td>
                  </tr>
                );
              })}
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
          deleteformdata(formdataId);
        }}
        title="Are you sure you want to delete this category?"
      />
    </div>
  );
};

export default FormDataList;
