import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';
import {
  deleteAfaqform,
  getfaqforms,
  resetState,
} from '../features/faqform/faqformSlice';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { VscEdit } from 'react-icons/vsc';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useTranslation } from '../components/TranslationContext';

const FaqFormList = () => {
  const [open, setOpen] = useState(false);
  const [faqformId, setfaqformId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setfaqformId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getfaqforms());
  }, [dispatch]);

  const faqformstate =
    useSelector((state) => state.faqform.faqforms.data) || [];
  console.log(faqformstate);

  const deletefaqform = (e) => {
    setOpen(false);
    dispatch(deleteAfaqform(e));
    toast.success('faqform deleted successfully');
    setTimeout(() => {
      dispatch(getfaqforms());
    }, 100);
  };
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;

  const filteredfaqform = faqformstate?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(faqformstate?.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const { translate, Language } = useTranslation();

  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title">{translate('Faq_Forms', Language)}</h3>
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
                    {translate('Question', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredfaqform?.map((faqform, index) => (
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
                  <td className="px-6 py-16 flex gap-2">
                    <Link
                      to={`/admin/faq-form/${filteredfaqform[index]?.id}`}
                      className="text-[25px] text-blue-500 "
                    >
                      <VscEdit />
                    </Link>

                    <button
                      onClick={() => showModal(filteredfaqform[index]?.id)}
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
          deletefaqform(faqformId);
        }}
        title={translate('Faq_Form_Modal', Language)}
      />
    </div>
  );
};

export default FaqFormList;
