import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { AiOutlineLogout } from 'react-icons/ai';
import { TbListCheck } from 'react-icons/tb';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Outlet } from 'react-router-dom';
import { FaClipboardList } from 'react-icons/fa';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logo, vector1, vector2, vector3, vector4, vector5 } from '../assets';
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-4 text-center py-3 mb-0">
            <span className="sm-logo">
              {' '}
              {/* <div className="flex items-end mt-7 mb-3 ml-3 ">
                {' '}
                <img
                  src={vector1}
                  className="absolute ml-2 mt-1 "
                  alt=""
                />{' '}
                <img src={vector2} className="absolute ml-3" alt="" />{' '}
                <img src={vector3} className="absolute ml-4  " alt="" />{' '}
                <img src={vector4} className="absolute ml-7 " alt="" />{' '}
                <img src={vector5} className="absolute ml-7 " alt="" />{' '}
              </div> */}
              <img src={logo} alt="" />
            </span>

            <span className="lg-logo">
              {' '}
              <div className="flex items-center justify-center ">
                <div className="flex items-end mt-7 mb-3 ">
                  {' '}
                  <img
                    src={vector1}
                    className="absolute ml-2 mt-1 "
                    alt=""
                  />{' '}
                  <img src={vector2} className="absolute ml-3" alt="" />{' '}
                  <img src={vector3} className="absolute ml-4  " alt="" />{' '}
                  <img src={vector4} className="absolute ml-7 " alt="" />{' '}
                  <img src={vector5} className="absolute ml-7 " alt="" />{' '}
                </div>
                <div className="">
                  {' '}
                  <h1 className="text-white ml-12 text-[27px] font-medium tracking-wide mb-3">
                    Azeronline
                  </h1>
                </div>
              </div>{' '}
            </span>
          </h2>
        </div>
        <Menu
          mode="inline"
          className="Menu"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === 'signout') {
              localStorage.clear();
              window.location.reload();
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <TbListCheck className="fs-4" />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <TbListCheck className="fs-4" />,
              label: 'Customers',
            },
            {
              key: 'popup-list',
              icon: <TbListCheck className="fs-4" />,
              label: 'Popup List',
            },
            {
              key: 'review-list',
              icon: <TbListCheck className="fs-4" />,
              label: 'Review List',
            },
            {
              key: 'tariff-list',
              icon: <TbListCheck className="fs-4" />,
              label: 'Tariff List',
            },
            {
              key: 'structure-list',
              icon: <TbListCheck className="fs-4" />,
              label: 'Structure List',
            },
            {
              key: 'service-list',
              icon: <TbListCheck className="fs-4" />,
              label: 'Service List',
            },
            {
              key: 'payment-list',
              icon: <TbListCheck className="fs-4" />,
              label: 'Payment List',
            },
            {
              key: 'campaign-list',
              icon: <TbListCheck className="fs-4" />,
              label: 'Campaign List',
            },
            {
              key: 'channel-list',
              icon: <TbListCheck className="fs-4" />,
              label: 'Channel List',
            },
            {
              key: 'country-list',
              icon: <TbListCheck className="fs-4" />,
              label: 'Country List',
            },
            {
              key: 'partner-list',
              icon: <TbListCheck className="fs-4" />,
              label: 'Partner List',
            },
            {
              key: 'vacancy-list',
              icon: <TbListCheck className="fs-4" />,
              label: 'Vacancy List',
            },
            {
              key: 'faq-list',
              icon: <TbListCheck className="fs-4" />,
              label: 'Faq List',
              // children: [
              //   // {
              //   //   key: 'blog',
              //   //   icon: <ImBlog className="fs-4" />,
              //   //   label: 'Add Blog',
              //   // },
              //   {
              //     key: 'faq-list',
              //     icon: <FaBloggerB className="fs-4" />,
              //     label: 'Blog List',
              //   },
              //   {
              //     key: 'blog-category',
              //     icon: <ImBlog className="fs-4" />,
              //     label: 'Add Blog Category',
              //   },
              //   {
              //     key: 'blog-category-list',
              //     icon: <FaBloggerB className="fs-4" />,
              //     label: 'Blog Category List',
              //   },
              // ],
            },
            {
              key: 'enquiries',
              icon: <FaClipboardList className="fs-4" />,
              label: 'Enquiries',
            },
            {
              key: 'signout',
              icon: <AiOutlineLogout className="fs-4" />,
              label: 'Sign Out',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between px-4 py-1"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-3 aling-items-center">
            <div className="d-flex gap-15 align-items-center dropdown ">
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className="mt-3"
              >
                <img
                  width={38}
                  height={38}
                  src="https://avatars.githubusercontent.com/u/125383763?v=4"
                  alt=""
                />
                <h5 className="mb-0 text">Admin</h5>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: 'auto', lineHeight: '20px' }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: 'auto', lineHeight: '20px' }}
                    to="/"
                  >
                    Signout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
