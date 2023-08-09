import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { deleteABrand, getBrands } from '../features/brand/brandSlice';
import { resetState } from '../features/brand/brandSlice';
import CustomModal from '../components/CustomModal';
import { VscEdit } from 'react-icons/vsc';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Brandlist = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, [dispatch]);
  const brandstate = useSelector((state) => state.brand.brands);

  const data = [];
  for (let i = 0; i < brandstate.length; i++) {
    data.push({
      key: i + 1,
      title: brandstate[i].title,
    });
  }

  const deleteBrand = (e) => {
    setOpen(false);
    dispatch(deleteABrand(e));
    toast.success('Brand Deleted Successfully!');

    setTimeout(() => {
      dispatch(getBrands());
    }, 1000);
  };

  return (
    <div>
      <h3 className="mb-4 title">Brands</h3>
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
              {data?.map((brand, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {brand.title}
                  </th>

                  <td className="px-6 py-4 flex gap-2">
                    <Link
                      to={`/admin/brand/${brandstate[index]?._id}`}
                      className="text-lg text-black dark:text-blue-500 hover:underline"
                    >
                      <VscEdit />
                    </Link>

                    <button
                      onClick={() => showModal(brandstate[index]?._id)}
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
          deleteBrand(brandId);
        }}
        title="Are you sure you want to delete this brand?"
      />
    </div>
  );
};

export default Brandlist;
