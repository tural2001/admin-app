import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../components/CustomModal';
import { VscEdit } from 'react-icons/vsc';
import { RiDeleteBin5Line } from 'react-icons/ri';
import ReactPaginate from 'react-paginate';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useTranslation } from '../components/TranslationContext';
import {
  deleteApaymentfield,
  getpaymentfields,
  resetState,
} from '../features/paymentform/paymentformSlice';

const PaymentFieldList = () => {
  const [open, setOpen] = useState(false);
  const [fieldId, setFieldId] = useState('');

  const showModal = (e) => {
    setOpen(true);
    setFieldId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getpaymentfields());
  }, [dispatch]);

  const paymentfieldstate =
    useSelector((state) => state.paymentfield?.paymentfields?.data) || [];
  console.log(paymentfieldstate);
  const deleteField = (e) => {
    setOpen(false);
    dispatch(deleteApaymentfield(e));
    setTimeout(() => {
      dispatch(getpaymentfields());
    }, 100);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;

  const filteredField = paymentfieldstate?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(paymentfieldstate?.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const { translate, Language } = useTranslation();

  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title"> {translate('Fields', Language)}</h3>
        <Link
          to="/admin/payment-field"
          className="flex justify-center items-center pr-3 gap-1 rounded-lg add_button_2"
        >
          <span className="mb-1 ml-2 text-[30px] hover:text-white">+</span>
          {translate('Add_Field', Language)}{' '}
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
                    {' '}
                    {translate('Label', Language)}{' '}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {' '}
                    {translate('Type', Language)}{' '}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {' '}
                    {translate('Name', Language)}{' '}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {' '}
                    {translate('Required', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {' '}
                    {translate('Data', Language)}{' '}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredField?.map((field, index) => (
                <tr key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {field.id}
                  </th>
                  <td className="px-6 py-4">{field.label}</td>
                  <td className="px-6 py-4">{field.type}</td>
                  <td className="px-6 py-4">{field.name}</td>
                  <td
                    className={`px-6 py-4 ${
                      field.required === true
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {field.required === true
                      ? `${translate('Required', Language)}`
                      : `${translate('Not_Required', Language)}`}
                  </td>
                  <td className="px-6 py-4">{field.data}</td>
                  <td className="px-6 py-16 flex gap-2">
                    <Link
                      to={`/admin/field-list/${field.id}`}
                      className="text-[25px] text-blue-500"
                    >
                      <VscEdit />
                    </Link>
                    <button
                      onClick={() => showModal(filteredField[index]?.id)}
                      className="text-[25px] text-red-500"
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
          deleteField(fieldId);
        }}
        title={translate('Field_Modal', Language)}
      />
    </div>
  );
};

export default PaymentFieldList;
