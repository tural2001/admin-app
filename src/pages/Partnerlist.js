import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';
import {
  deleteApartner,
  getpartners,
  resetState,
} from '../features/partners/partnersSlice';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { VscEdit } from 'react-icons/vsc';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: 'Expiry',
    dataIndex: 'expiry',
    sorter: (a, b) => a.expiry.length - b.expiry.length,
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    sorter: (a, b) => parseFloat(a.discount) - parseFloat(b.discount),
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Partnerlist = () => {
  const [open, setOpen] = useState(false);
  const [partnerId, setpartnerId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setpartnerId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getpartners());
  }, [dispatch]);
  const partnerState = useSelector((state) => state.partner.partners.data);

  console.log(partnerState);

  const deletePartner = (e) => {
    setOpen(false);
    dispatch(deleteApartner(e));
    setTimeout(() => {
      dispatch(getpartners());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Partners</h3>
      <Link to="/admin/partner">Add Partner</Link>
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
                    Name
                    <a href="#/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Logo
                    <a href="#/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {partnerState?.map((partner, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {partner.id}
                  </th>
                  <td className="px-6 py-4">{partner.name}</td>
                  <td className="px-6 py-4">{partner.logo}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link
                      to={`/admin/partner/${partnerState[index]?.id}`}
                      className="text-lg text-black dark:text-blue-500 hover:underline"
                    >
                      <VscEdit />
                    </Link>

                    <button
                      onClick={() => showModal(partnerState[index]?.id)}
                      className="text-lg text-black dark:text-blue-500 hover:text-red-500"
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
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deletePartner(partnerId);
        }}
        title={`Are you sure you want to delete  this faq ?`}
      />
    </div>
  );
};

export default Partnerlist;