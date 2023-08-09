import { Table } from 'antd';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteACategory,
  getpcategories,
} from '../features/pcategory/pcategorySlice';
import CustomModal from '../components/CustomModal';
import { resetState } from '../features/pcategory/pcategorySlice';
import { VscEdit } from 'react-icons/vsc';
import { RiDeleteBin5Line } from 'react-icons/ri';

const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [categoryId, setcategoryId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setcategoryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getpcategories());
  }, [dispatch]);
  const pcategorystate = useSelector((state) => state.pcategory.pcategories);

  const data = [];
  for (let i = 0; i < pcategorystate.length; i++) {
    data.push({
      key: i + 1,
      title: pcategorystate[i].title,
    });
  }

  const deleteCategory = (e) => {
    setOpen(false);
    dispatch(deleteACategory(e));
    setTimeout(() => {
      dispatch(getpcategories());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Product Categories</h3>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>

                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((category, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {category.title}
                  </th>

                  <td className="px-6 py-4 flex gap-2">
                    <Link
                      to={`/admin/product/${pcategorystate[0]?._id}`}
                      className="text-lg text-black dark:text-blue-500 hover:underline"
                    >
                      <VscEdit />
                    </Link>

                    <button
                      onClick={() => showModal(pcategorystate[0]?._id)}
                      className="text-lg text-black dark:text-blue-500 hover:text-red-500"
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>{' '}
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteCategory(categoryId);
        }}
        title="Are you sure you want to delete this category?"
      />
    </div>
  );
};

export default Categorylist;
