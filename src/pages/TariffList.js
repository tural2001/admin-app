import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { VscEdit } from 'react-icons/vsc';
import {
  deleteAtariff,
  gettariffs,
  resetState,
} from '../features/tariffs/tariffSlice';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

const TariffList = () => {
  const [open, setOpen] = useState(false);
  const [tariffId, settariffId] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;

  const showModal = (e) => {
    setOpen(true);
    settariffId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(gettariffs());
  }, [dispatch]);

  const tariffstate = useSelector((state) => state.tariff.tariffs.data) || [];

  const deleteTariff = (e) => {
    setOpen(false);
    dispatch(deleteAtariff(e));
    toast.success('Delete tariff successfully');
    setTimeout(() => {
      dispatch(gettariffs());
    }, 100);
  };

  const filteredTariff = tariffstate?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(tariffstate?.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  console.log(filteredTariff);

  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title">Tariffs</h3>
        <Link
          to={`/admin/tariff`}
          className="flex justify-center items-center pr-3 gap-1 rounded-lg add_button_2"
        >
          <span className="mb-1 ml-2 text-[30px] hover:text-white">+</span>
          Add Tariff
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
                  <div className="flex items-center">Status</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Name</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Service</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Type</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Description</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Price</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Speed</div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTariff?.map((tariff, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {tariff.id}
                  </th>
                  <td
                    className={`px-6 py-4 ${
                      tariff.active === true ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {tariff.active === true ? 'Active' : 'Not Active'}
                  </td>
                  <td className="px-6 py-4">{tariff.name}</td>
                  <td className="px-6 py-4">{tariff.service.title.az}</td>
                  <td className="px-6 py-4">{tariff.type}</td>
                  <td className="px-6 py-4">{tariff.description}</td>
                  <td className="px-6 py-4">{tariff.price}</td>
                  <td className="px-6 py-4">{tariff.speed}</td>
                  <td className="px-6 py-16 flex gap-2">
                    <Link
                      to={`/admin/tariff/${filteredTariff[index]?.id}`}
                      className="text-[25px] text-blue-500 "
                    >
                      <VscEdit />
                    </Link>

                    <button
                      onClick={() => showModal(tariffstate[index]?.id)}
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
          deleteTariff(tariffId);
        }}
        title={`Are you sure you want to delete  this tariff ?`}
      />
    </div>
  );
};

export default TariffList;
