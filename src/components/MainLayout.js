import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { AiOutlineForm, AiOutlineLogout } from 'react-icons/ai';
import { TbListCheck } from 'react-icons/tb';
import { GrChannel } from 'react-icons/gr';
import {
  MdOutlineCampaign,
  MdOutlineMiscellaneousServices,
  MdPayment,
  MdOutlineRateReview,
  MdOutline6FtApart,
  MdWorkOutline,
  MdOutlinePriceCheck,
} from 'react-icons/md';
import { FaUserCog } from 'react-icons/fa';
import { GiExitDoor, GiModernCity } from 'react-icons/gi';
import { RiFileList3Line, RiPagesLine } from 'react-icons/ri';
import { FcFaq, FcTreeStructure } from 'react-icons/fc';
import { CgUserList } from 'react-icons/cg';
import { TfiLayoutSlider, TfiMapAlt } from 'react-icons/tfi';
import { BsFileEarmarkPost } from 'react-icons/bs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  campaign,
  channel,
  country,
  dashboard,
  form,
  logo,
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
  vacancy,
} from '../assets';
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
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
      '/admin/vacancy-list': 'vacancy-list',
      '/admin/slide-list': 'slide-list',
      '/admin/user-list': 'user-list',
      '/admin/form-list': 'form-list',
      '/admin/post-list': 'post-list',
      '/admin/field-list': 'field-list',
      '/admin/faq-list': 'faq-list',
      '/admin/channel-list': 'channel-list',
      '/admin/campaign-list': 'campaign-list',
      '/admin/partner-list': 'partner-list',
      '/admin/payment-list': 'payment-list',
      '/admin/region-list': 'region-list',
      '/admin/county-list': 'county-list',
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
              key: 'popup-list',
              icon: <img src={popup} className="w-6" alt="" />,

              label: 'Popup List',
            },
            {
              key: 'review-list',
              icon: <img src={review} className="w-6" alt="" />,
              label: 'Review List',
            },
            {
              key: 'tariff-list',
              icon: <img src={tariff} className="w-6" alt="" />,
              label: 'Tariff List',
            },
            {
              key: 'structure-list',
              icon: <FcTreeStructure className="fs-4" />,
              label: 'Structure List',
            },
            {
              key: 'service-list',
              icon: <img src={service} className="w-6" alt="" />,
              label: 'Service List',
            },
            {
              key: 'slide-list',
              icon: <img src={slide} className="w-6" alt="" />,
              label: 'Slide List',
            },
            {
              key: 'page-list',
              icon: <img src={page} className="w-6" alt="" />,
              label: 'Page List',
            },
            {
              key: 'region-list',
              icon: <img src={region} className="w-6" alt="" />,
              label: 'Region List',
            },
            {
              key: 'post-list',
              icon: <img src={post} className="w-6" alt="" />,
              label: 'Post List',
            },
            {
              key: 'form-list',
              icon: <img src={form} className="w-6" alt="" />,
              label: 'Form List',
            },
            {
              key: 'payment-list',
              icon: <img src={payment} className="w-6" alt="" />,
              label: 'Payment List',
            },
            {
              key: 'campaign-list',
              icon: <img src={campaign} className="w-6" alt="" />,
              label: 'Campaign List',
            },
            {
              key: 'channel-list',
              icon: <img src={channel} className="w-6" alt="" />,
              label: 'Channel List',
            },
            {
              key: 'country-list',
              icon: <img src={country} className="w-6" alt="" />,
              label: 'Country List',
            },
            {
              key: 'partner-list',
              icon: <img src={partner} className="w-6" alt="" />,
              label: 'Partner List',
            },

            {
              key: 'vacancy-list',
              icon: <img src={vacancy} className="w-6" alt="" />,
              label: 'Vacancy List',
            },
            {
              key: 'faq-list',
              icon: <FcFaq className="fs-4" />,
              label: 'Faq List',
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
            theme="dark"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
