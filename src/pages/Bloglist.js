import { Table } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../features/blogs/blogSlice';
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
];

const Bloglist = () => {
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(getBlogs());
  });
  const blogstate = useSelector((state) => state.blog.blogs);
  const data = [];
  for (let i = 0; i < blogstate.length; i++) {
    data.push({
      key: i,
      name: blogstate[i].title,
      category: blogstate[i].category,
      status: `London, Park Lane no. ${i}`,
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">Blog List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Bloglist;
