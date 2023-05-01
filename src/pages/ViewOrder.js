import { Table } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { getOrderByUser } from '../features/auth/authSlice';
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
    title: 'Brand',
    dataIndex: 'brand',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Color',
    dataIndex: 'color',
  },
  {
    title: 'Count',
    dataIndex: 'count',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split('/')[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, [dispatch, userId]);

  const orderState = useSelector((state) => state.auth.orderbyuser?.products);
  console.log(orderState);
  const data = [];
  for (let i = 0; i < orderState.length; i++) {
    data.push({
      key: i + 1,
      name: orderState[i]?.product.title,
      brand: orderState[i]?.product.brand,
      count: orderState[i]?.count,
      price: orderState[i]?.product.price,
      color: orderState[i]?.product.color,
      date: orderState[i]?.product.createdAt,
      action: (
        <>
          <Link to="/" className="fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link to="/" className="ms-3 fs-3 text-danger">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4 title">View Order</h3>
      <div>
        {' '}
        <Table columns={columns} dataSource={data} />{' '}
      </div>
    </div>
  );
};

export default ViewOrder;
