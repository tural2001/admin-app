import React, { useEffect, useState } from 'react';
import { BsArrowDownRight } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import {
  getMonthlyData,
  getOrders,
  getYearlyData,
} from '../features/auth/authSlice';
import { Column } from '@ant-design/plots';

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
    title: 'Product Count',
    dataIndex: 'product',
  },
  {
    title: 'Total Price',
    dataIndex: 'price',
  },
  {
    title: 'Total Price After Discount',
    dataIndex: 'dprice',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

const Dashboard = () => {
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

  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state) => state?.auth?.montlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const orderState = useSelector((state) => state?.auth?.orders?.orders);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    dispatch(getMonthlyData(config3));
    dispatch(getYearlyData(config3));
    dispatch(getOrders(config3));
  }, []);

  useEffect(() => {
    let monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    let data = [];
    let monthlyOrderCount = [];
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({
        type: monthNames[element?._id?.month],
        income: element?.amount,
      });
      monthlyOrderCount.push({
        type: monthNames[element?._id?.month],
        income: element?.count,
      });
    }
    setDataMonthly(data);
    setDataMonthlySales(monthlyOrderCount);

    const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
      data1.push({
        key: i,
        name: orderState[i]?.user?.name,
        product: orderState[i]?.orderItems?.length,
        price: orderState[i]?.totalPrice,
        dprice: orderState[i]?.totalPriceAfterDiscount,
        status: orderState[i]?.orderStatus,
      });
      setOrderData(data1);
    }
  }, [monthlyDataState]);

  const config = {
    data: dataMonthly,
    xField: 'type',
    yField: 'income',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Monthly',
      },
      sales: {
        alias: 'Income',
      },
    },
  };
  const config2 = {
    data: dataMonthlySales,
    xField: 'type',
    yField: 'income',
    label: {
      position: 'middle',

      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Monthly',
      },
      sales: {
        alias: 'Income',
      },
    },
  };
  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title">Dashboard</h3>{' '}
      </div>

      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Income</p> <br />{' '}
            <h4 className="mb-0 sub-title">
              {yearlyDataState &&
                yearlyDataState.map((item, index) => {
                  return <>{item?.amount} Azn</>;
                })}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight />
              32%
            </h6>
            <p className="mb-0 desc">Yearly Total Income</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total Sales</p> <br />
            <h4 className="mb-0 sub-title">
              {' '}
              {yearlyDataState &&
                yearlyDataState.map((item, index) => {
                  return item?.count;
                })}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight />
              32%
            </h6>
            <p className="mb-0 desc">Yearly Total Sales</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between gap-3">
        <div className="mt-4">
          <h3 className="mb-5">Income Statics</h3>
          <div className="app">
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="mb-5">Income Statics</h3>
          <div className="app">
            <Column {...config2} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
