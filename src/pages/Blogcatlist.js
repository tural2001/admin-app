import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAbcategory,
  getbcategories,
  resetState,
} from '../features/bcategory/bcategorySlice';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
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

const Blogcatlist = () => {
  const [open, setOpen] = useState(false);
  const [bcategoryId, setbcategoryId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setbcategoryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getbcategories());
  }, [dispatch]);
  const bcategorystate = useSelector((state) => state.bcategory.bcategories);
  const data = [];
  for (let i = 0; i < bcategorystate.length; i++) {
    data.push({
      key: i,
      name: bcategorystate[i].title,
      action: (
        <>
          <Link
            to={`/admin/blog-category/${bcategorystate[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(bcategorystate[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deletebcategory = (e) => {
    setOpen(false);
    dispatch(deleteAbcategory(e));
    setTimeout(() => {
      dispatch(getbcategories());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Blog Categories</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deletebcategory(bcategoryId);
        }}
        title="Are you sure you want to delete this Blog Category?"
      />
    </div>
  );
};

export default Blogcatlist;
