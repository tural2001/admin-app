import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAbcategory,
  getfaqs,
  resetState,
} from '../features/faq/faqSlice';
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
    dispatch(getfaqs());
  }, [dispatch]);
  const faqstate = useSelector((state) => state.faq);
  const data = [];

  for (let i = 0; i < faqstate.length; i++) {
    data.push({
      key: i,
      name: faqstate[i].title,
      action: (
        <>
          <Link
            to={`/admin/blog-category/${faqstate[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(faqstate[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  // const deletebcategory = (e) => {
  //   setOpen(false);
  //   dispatch(deleteAbcategory(e));
  //   setTimeout(() => {
  //     dispatch(getfaqs());
  //   }, 100);
  // };

  return (
    <div>
      <h3 className="mb-4 title">Blog Categories</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      {/* <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deletebcategory(bcategoryId);
        }}
        title="Are you sure you want to delete this Blog Category?"
      /> */}
    </div>
  );
};

export default Blogcatlist;
