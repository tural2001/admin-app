import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { FcFaq, FcTreeStructure } from 'react-icons/fc';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  advantage,
  campaign,
  channel,
  color,
  country,
  dashboard,
  form,
  logo,
  ourvalue,
  page,
  partner,
  payment,
  popup,
  post,
  region,
  review,
  service,
  signout,
  slide,
  smlogo,
  tariff,
  user,
  users,
} from '../assets';
import { useTranslation } from './TranslationContext';
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const { translate, changeLanguage, currentLanguage } = useTranslation();

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    changeLanguage(newLanguage);
  };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const handleSignoutClick = () => {
    localStorage.clear();
    window.location.reload();
  };
  const getIdFromLocalStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const location = useLocation();

  const getDefaultSelectedKey = () => {
    const path = location.pathname;
    const keyMap = {
      '/admin/popup-list': 'popup-list',
      '/admin/review-list': 'review-list',
      '/admin/structure-list': 'structure-list',
      '/admin/page-list': 'page-list',
      '/admin/tariff-list': 'tariff-list',
      '/admin/slide-list': 'slide-list',
      '/admin/user-list': 'user-list',
      '/admin/post-list': 'post-list',
      '/admin/field-list': 'field-list',
      '/admin/faq-list': 'faq-list',
      '/admin/channel-list': 'channel-list',
      '/admin/campaign-list': 'campaign-list',
      '/admin/advantage-list': 'advantage-list',
      '/admin/our-value-list': 'our-value-list',
      '/admin/service-list': 'service-list',
      '/admin/color-list': 'color-list',
      '/admin/partner-list': 'partner-list',
      '/admin/payment-list': 'payment-list',
      '/admin/region-list': 'region-list',
      '/admin/county-list': 'county-list',
      '/admin/setting-list': 'setting-list',
    };

    return keyMap[path] || '';
  };

  const defaultSelectedKey = getDefaultSelectedKey();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="flex justify-center ">
            <span className="sm-logo ">
              <img src={smlogo} width={50} className="mt-3" alt="" />
            </span>
            <span className="lg-logo ">
              <img
                src={logo}
                className="mt-3 h-[30px] w-[190px]"
                width={130}
                height={130}
                alt=""
              />
            </span>
          </h2>
        </div>
        <Menu
          mode="inline"
          className="Menu"
          defaultSelectedKeys={[defaultSelectedKey]}
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
              icon: <img src={dashboard} className="w-6" alt="" />,
              label: 'Dashboard',
            },
            {
              key: 'advantage-list',
              icon: <img src={advantage} className="w-6" alt="" />,
              label: 'Advantage List',
            },
            {
              key: 'campaign-list',
              icon: <img src={campaign} className="w-6" alt="" />,
              label: 'Campaign List',
            },
            {
              key: 'career-list',
              icon: <img src={campaign} className="w-6" alt="" />,
              label: 'Career List',
            },
            {
              key: 'career-form-list',
              icon: <img src={form} className="w-6" alt="" />,
              label: 'Career Form List',
            },
            {
              key: 'channel-list',
              icon: <img src={channel} className="w-6" alt="" />,
              label: 'Channel List',
            },
            {
              key: 'color-list',
              icon: <img src={color} className="w-6" alt="" />,
              label: 'Color List',
            },
            {
              key: 'country-list',
              icon: <img src={country} className="w-6" alt="" />,
              label: 'Country List',
            },
            {
              key: 'faq-list',
              icon: <FcFaq className="fs-4" />,
              label: 'Faq List',
            },
            {
              key: 'faq-form-list',
              icon: <img src={form} className="w-6" alt="" />,
              label: 'Faq Form List',
            },
            {
              key: 'our-value-list',
              icon: <img src={ourvalue} className="w-6" alt="" />,
              label: 'Our-Value List',
            },
            {
              key: 'page-list',
              icon: <img src={page} className="w-6" alt="" />,
              label: 'Page List',
            },
            {
              key: 'partner-list',
              icon: <img src={partner} className="w-6" alt="" />,
              label: 'Partner List',
            },
            {
              key: 'payment-list',
              icon: <img src={payment} className="w-6" alt="" />,
              label: 'Payment List',
            },
            {
              key: 'popup-list',
              icon: <img src={popup} className="w-6" alt="" />,

              label: 'Popup List',
            },
            {
              key: 'post-list',
              icon: <img src={post} className="w-6" alt="" />,
              label: 'Post List',
            },
            {
              key: 'region-list',
              icon: <img src={region} className="w-6" alt="" />,
              label: 'Region List',
            },
            {
              key: 'formdata-list',
              icon: <img src={form} className="w-6" alt="" />,
              label: 'Register Form Data List',
            },
            {
              key: 'field-list',
              icon: <img src={form} className="w-6" alt="" />,
              label: 'Register Form Field List',
            },
            {
              key: 'review-list',
              icon: <img src={review} className="w-6" alt="" />,
              label: 'Review List',
            },
            {
              key: 'service-list',
              icon: <img src={service} className="w-6" alt="" />,
              label: 'Service List',
            },
            {
              key: 'service-category-list',
              icon: <img src={service} className="w-6" alt="" />,
              label: 'Service Category List',
            },
            {
              key: 'slide-list',
              icon: <img src={slide} className="w-6" alt="" />,
              label: 'Slide List',
            },
            {
              key: 'structure-list',
              icon: <FcTreeStructure className="fs-4" />,
              label: 'Structure List',
            },
            {
              key: 'tariff-list',
              icon: <img src={tariff} className="w-6" alt="" />,
              label: 'Tariff List',
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
          <div className="d-flex gap-3 aling-items-center ">
            <div className="d-flex gap-15 align-items-center dropdown ">
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className="mt-3"
              >
                <img src={user} className="w-10" alt="" />
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: 'auto', lineHeight: '20px' }}
                    to={`/admin/user/${getIdFromLocalStorage?.data?.id}`}
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1 flex  items-center gap-1"
                    style={{ height: 'auto', lineHeight: '20px' }}
                    to="user-list"
                  >
                    {' '}
                    <img src={users} alt="" className="w-6" />
                    User List
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1 flex  items-center gap-1"
                    style={{ height: 'auto', lineHeight: '20px' }}
                    to="setting-list"
                  >
                    <img src={page} alt="" className="w-6" />
                    Setting List
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item py-1 mb-1 flex  items-center gap-1"
                    onClick={handleSignoutClick}
                    style={{ height: 'auto', lineHeight: '20px' }}
                  >
                    {' '}
                    <img src={signout} alt="" className="w-6" /> Signout
                  </button>
                </li>
              </div>
              <div className="">
                <select
                  className="rounded-3xl px-[10px] py-0 mt-9 text-[14px] "
                  onChange={handleLanguageChange}
                  value={currentLanguage}
                >
                  <option value="az">Azerbaijani</option>
                  <option value="en">English</option>
                </select>
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
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="dark"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
