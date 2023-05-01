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
      name: pcategorystate[i].title,
      action: (
        <>
          <Link
            to={`/admin/category/${pcategorystate[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(pcategorystate[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
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
        <Table columns={columns} dataSource={data} />
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
