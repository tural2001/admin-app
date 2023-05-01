import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteABlog, getBlogs, resetState } from '../features/blogs/blogSlice';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
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
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Bloglist = () => {
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setblogId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(resetState());
    dispacth(getBlogs());
  }, [dispacth]);
  const blogstate = useSelector((state) => state.blog.blogs);
  const data = [];
  for (let i = 0; i < blogstate.length; i++) {
    data.push({
      key: i,
      name: blogstate[i].title,
      category: blogstate[i].category,
      status: `London, Park Lane no. ${i}`,
      action: (
        <>
          <Link
            to={`/admin/blog/${blogstate[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(blogstate[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteBlog = (e) => {
    setOpen(false);
    dispacth(deleteABlog(e));
    setTimeout(() => {
      dispacth(getBlogs());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Blog List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBlog(blogId);
        }}
        title="Are you sure you want to delete this blog?"
      />
    </div>
  );
};

export default Bloglist;
