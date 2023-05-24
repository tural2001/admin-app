import { Table } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getOrders, updateAOrder } from '../features/auth/authSlice';
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
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
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

const Orders = () => {
  const dispatch = useDispatch();
  const getTokenFromLocalStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const config3 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ''
      }`,
      Accept: 'application/json',
    },
  };
  useEffect(() => {
    dispatch(getOrders(config3));
  }, [dispatch]);
  const orderState = useSelector((state) => state?.auth?.orders?.orders);
  const data = [];
  for (let i = 0; i < orderState?.length; i++) {
    data.push({
      key: i,
      name: orderState[i].user?.name,
      product: (
        <Link to={`/admin/order/${orderState[i]?._id}`}>View Orders</Link>
      ),
      amount: orderState[i].totalPrice,
      date: new Date(orderState[i].createdAt).toLocaleString(),
      action: (
        <>
          <select
            name=""
            defaultValue={orderState[i]?.orderStatus}
            onChange={(e) =>
              updateOrderStatus(orderState[i]?._id, e.target.value)
            }
            className="form-control form-select"
            id=""
          >
            <option value="Ordered">Ordered</option>
            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </>
      ),
    });
  }
  console.log(data);

  const updateOrderStatus = (a, b) => {
    dispatch(updateAOrder({ id: a, status: b }));
  };

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Orders;
