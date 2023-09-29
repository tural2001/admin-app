import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { VscEdit } from 'react-icons/vsc';
import { toast } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import {
  deleteAcolor,
  getcolors,
  resetState,
} from '../features/color/colorSlice';

const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getcolors());
  }, [dispatch]);

  const colorstate = useSelector((state) => state.color.colors.data) || [];
  console.log(colorstate);

  const deletecolor = (e) => {
    setOpen(false);
    dispatch(deleteAcolor(e));
    toast.success('color deleted successfully');
    setTimeout(() => {
      dispatch(getcolors());
    }, 100);
  };
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;

  const filteredcolor = colorstate?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(colorstate?.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title">Colors</h3>{' '}
        <Link
          to="/admin/color"
          className="flex justify-center items-center pr-3 gap-1 rounded-lg add_button_2"
        >
          {' '}
          <span className="mb-1 ml-2 text-[30px] hover:text-white">+</span>
          Add color
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
                  <div className="flex items-center">Code</div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredcolor?.map((color, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {color.id}
                  </th>
                  <td
                    className={`px-6 py-4 ${
                      color.active === true ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {color.active === true ? 'Active' : 'Not Active'}
                  </td>
                  <td className="px-6 py-4">{color.name}</td>
                  <td className="px-6 py-4">{color.code}</td>
                  <td className="px-6 py-16 flex gap-2">
                    <Link
                      to={`/admin/color/${colorstate[index]?.id}`}
                      className="text-[25px] text-blue-500 "
                    >
                      <VscEdit />
                    </Link>

                    <button
                      onClick={() => showModal(colorstate[index]?.id)}
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
          deletecolor(colorId);
        }}
        title={`Are you sure you want to delete  this color ?`}
      />
    </div>
  );
};

export default ColorList;