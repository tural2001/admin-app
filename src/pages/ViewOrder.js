import { Table } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { getOrder } from '../features/auth/authSlice';
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
    title: 'Count',
    dataIndex: 'count',
  },
];

const ViewOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split('/')[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, []);

  const orderState = useSelector((state) => state?.auth?.singleorder?.orders);
  console.log(orderState);
  const data = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data.push({
      key: i + 1,
      name: orderState?.orderItems[i]?.product?.title,
      brand: orderState?.orderItems[i]?.product?.brand,
      count: orderState?.orderItems[i]?.quantity,
      price: orderState?.orderItems[i]?.product?.price,
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
