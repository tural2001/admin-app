import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { deleteABrand, getBrands } from '../features/brand/brandSlice';
import { resetState } from '../features/brand/brandSlice';
import CustomModal from '../components/CustomModal';

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
      name: brandstate[i].title,
      action: (
        <>
          <Link
            to={`/admin/brand/${brandstate[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(brandstate[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteBrand = (e) => {
    setOpen(false);
    dispatch(deleteABrand(e));
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Brands</h3>
      <div>
        <Table columns={columns} dataSource={data} />
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
