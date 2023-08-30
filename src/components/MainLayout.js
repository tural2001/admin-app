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
import { GiModernCity } from 'react-icons/gi';
import { RiFileList3Line, RiPagesLine } from 'react-icons/ri';
import { FcFaq, FcTreeStructure } from 'react-icons/fc';
import { CgUserList } from 'react-icons/cg';
import { TfiLayoutSlider, TfiMapAlt } from 'react-icons/tfi';
import { BsFileEarmarkPost } from 'react-icons/bs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Outlet } from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logo, smlogo } from '../assets';
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
              key: 'popup-list',
              icon: <RiFileList3Line className="fs-4" />,

              label: 'Popup List',
            },
            {
              key: 'review-list',
              icon: <MdOutlineRateReview className="fs-4" />,
              label: 'Review List',
            },
            {
              key: 'tariff-list',
              icon: <MdOutlinePriceCheck className="fs-4" />,
              label: 'Tariff List',
            },
            {
              key: 'structure-list',
              icon: <FcTreeStructure className="fs-4" />,
              label: 'Structure List',
            },
            {
              key: 'service-list',
              icon: <MdOutlineMiscellaneousServices className="fs-4" />,
              label: 'Service List',
            },
            {
              key: 'slide-list',
              icon: <TfiLayoutSlider className="fs-4" />,
              label: 'Slide List',
            },
            {
              key: 'page-list',
              icon: <RiPagesLine className="fs-4" />,
              label: 'Page List',
            },
            {
              key: 'region-list',
              icon: <GiModernCity className="fs-4" />,
              label: 'Region List',
            },
            {
              key: 'post-list',
              icon: <BsFileEarmarkPost className="fs-4" />,
              label: 'Post List',
            },
            {
              key: 'form-list',
              icon: <AiOutlineForm className="fs-4" />,
              label: 'Form List',
            },
            {
              key: 'payment-list',
              icon: <MdPayment className="fs-4" />,
              label: 'Payment List',
            },
            {
              key: 'campaign-list',
              icon: <MdOutlineCampaign className="fs-4" />,
              label: 'Campaign List',
            },
            {
              key: 'channel-list',
              icon: <GrChannel className="fs-4" />,
              label: 'Channel List',
            },
            {
              key: 'country-list',
              icon: <TfiMapAlt className="fs-4" />,
              label: 'Country List',
            },
            {
              key: 'user-list',
              icon: <CgUserList className="fs-4" />,
              label: 'User List',
            },
            {
              key: 'partner-list',
              icon: <MdOutline6FtApart className="fs-4" />,
              label: 'Partner List',
            },

            {
              key: 'vacancy-list',
              icon: <MdWorkOutline className="fs-4" />,
              label: 'Vacancy List',
            },
            {
              key: 'faq-list',
              icon: <FcFaq className="fs-4" />,
              label: 'Faq List',
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
                <FaUserCog className="fs-3 mr-2" />
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
