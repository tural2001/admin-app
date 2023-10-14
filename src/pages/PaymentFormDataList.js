import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../components/CustomModal';
import { RiDeleteBin5Line } from 'react-icons/ri';

import ReactPaginate from 'react-paginate';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Popup from 'reactjs-popup';
import axios from 'axios';
import { base_url } from '../utils/base_url';
import { config } from '../utils/axiosconfig';
import { x } from '../assets';
import { useTranslation } from '../components/TranslationContext';
import {
  deleteApaymentformdata,
  getpaymentformdatas,
  resetState,
} from '../features/paymentformData/paymentformDataSlice';

const PaymentFormDataList = () => {
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
    dispatch(getpaymentformdatas());
  }, [dispatch]);

  const paymentformdatastate =
    useSelector((state) => state.paymentformdata?.paymentformdatas?.data) || [];

  const deleteformdata = (e) => {
    setOpen(false);
    dispatch(deleteApaymentformdata(e));
    setTimeout(() => {
      dispatch(getpaymentformdatas());
    }, 100);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;

  const filteredformdata = paymentformdatastate?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(paymentformdatastate?.length / itemsPerPage);

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

  const fetchFormData = (formId) => {
    console.log(formId);
    axios
      .get(`${base_url}/api/installment-payment-form-data/${formId}`, {
        headers: config.getHeaders('az'),
      })
      .then((response) => {
        console.log(response);
        dispatch(getpaymentformdatas());
      })
      .catch((error) => {
        console.error('Form Data Request Error:', error);
      });
  };

  const { translate, Language } = useTranslation();

  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title">
          {translate('Payment_Register_Form_Data_List', Language)}
        </h3>{' '}
      </div>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-3">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Data', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Reat_At', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Create_At', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Update_at', Language)}
                  </div>
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
                    <td className="px-6 py-4">
                      <Popup
                        trigger={<button>{translate('Read', Language)}</button>}
                        modal
                        nested
                        contentStyle={{
                          padding: '20px',
                          borderRadius: '50px',
                          borderColor: 'white',
                          width: '500px',
                          height: '250px',
                          overflow: 'hidden',
                        }}
                        onOpen={() => fetchFormData(form.id)}
                      >
                        {(close) => (
                          <>
                            <div className="flex flex-col   justify-center items-center p-2">
                              <img
                                src={x}
                                className="absolute right-7 top-5 w-10"
                                onClick={close}
                                alt=""
                              />
                              {(() => {
                                try {
                                  const formDataObject = JSON.parse(form.data);

                                  const formDataElements = Object.keys(
                                    formDataObject
                                  ).map((key, index) => {
                                    const isURL =
                                      /^(http|https):\/\/[^ "]+$/.test(
                                        formDataObject[key]
                                      );

                                    if (isURL) {
                                      return (
                                        <p key={index}>
                                          {key}:{' '}
                                          <a href={formDataObject[key]}>
                                            {formDataObject[key]}
                                          </a>
                                        </p>
                                      );
                                    } else {
                                      return (
                                        <p key={index}>
                                          {key}: {formDataObject[key]}
                                        </p>
                                      );
                                    }
                                  });
                                  return formDataElements;
                                } catch (error) {
                                  console.error(
                                    'Error parsing form.data:',
                                    error
                                  );
                                  return null;
                                }
                              })()}
                            </div>
                          </>
                        )}
                      </Popup>
                    </td>
                    <td className="px-6 py-4">
                      {form.read_at ? formatDate(form.read_at) : 'null'}
                    </td>
                    <td className="px-6 py-4">{formatDate(form.created_at)}</td>
                    <td className="px-6 py-4">{formatDate(form.updated_at)}</td>
                    <td className="px-6 py-16 flex gap-2">
                      <button
                        onClick={() => showModal(filteredformdata[index]?.id)}
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
        title={translate('Form_Data_Modal', Language)}
      />
    </div>
  );
};

export default PaymentFormDataList;
