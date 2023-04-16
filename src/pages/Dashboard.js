import React, { Component } from 'react';
import { BsArrowDownRight } from 'react-icons/bs';
import Chart from 'react-apexcharts';

import { Table } from 'antd';
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
    title: 'Status',
    dataIndex: 'status',
  },
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'basic-bar',
        },
        xaxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'July',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec',
          ],
        },
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 95, 70, 51, 70, 40, 62, 54],
        },
      ],
    };
  }
  render() {
    return (
      <div>
        <h3 className="mb-4 title">Dashboard</h3>
        <div className="d-flex justify-content-between align-items-center gap-3">
          <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
            <div>
              <p className="desc">Total</p> <br />{' '}
              <h4 className="mb-0 sub-title">1100azn</h4>
            </div>
            <div className="d-flex flex-column align-items-end">
              <h6 className="red">
                <BsArrowDownRight />
                32%
              </h6>
              <p className="mb-0 desc">Compared To April 2022</p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
            <div>
              <p className="desc">Total</p> <br />
              <h4 className="mb-0 sub-title">1100azn</h4>
            </div>
            <div className="d-flex flex-column align-items-end">
              <h6 className="red">
                <BsArrowDownRight />
                32%
              </h6>
              <p className="mb-0 desc">Compared To April 2022</p>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
            <div>
              <p className="desc">Total</p> <br />{' '}
              <h4 className="mb-0 sub-title">1100azn</h4>
            </div>
            <div className="d-flex flex-column align-items-end">
              <h6 className="green">
                <BsArrowDownRight />
                32%
              </h6>
              <p className="mb-0 desc">Compared To April 2022</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="mb-5">Income Statics</h3>
          <div className="app">
            <div className="row">
              <div className="mixed-chart">
                <Chart
                  options={this.state.options}
                  series={this.state.series}
                  type="bar"
                  width="1100px"
                  height="400px"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="mb-5">Recent Orders</h3>
          <div>
            <Table columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
