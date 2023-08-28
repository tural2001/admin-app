import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import Enquiries from './pages/Enquiries';
import FaqList from './pages/FaqList';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Productlist from './pages/Productlist';
import Addproduct from './pages/Addproduct';
import ViewEnq from './pages/ViewEnq';
import ViewOrder from './pages/ViewOrder';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing//OpenRoutes';
import Addfaq from './pages/Addfaq';
import Addreview from './pages/Addreview';
import ReviewList from './pages/ReviewList';
import AddPartner from './pages/AddPartner';
import Partnerlist from './pages/Partnerlist';
import Addpopup from './pages/Addpopup';
import Popuplist from './pages/Popuplist';
import TariffList from './pages/TariffList';
import AddTariff from './pages/AddTariff';
import StructureList from './pages/StructureList';
import AddStructure from './pages/AddStructure';
import ServiceList from './pages/ServiceList';
import AddService from './pages/AddService';
import VacancyList from './pages/VacancyList';
import AddVacancy from './pages/AddVacancy';
import PaymentList from './pages/PaymentList';
import AddPayment from './pages/AddPayment';
import CampaignList from './pages/CampaignList';
import AddCampaign from './pages/AddCampaign';
import ChannelList from './pages/ChannelList';
import Addchannel from './pages/AddChannel';
import CountryList from './pages/CountryList';
import AddCountry from './pages/AddCountry';
import UserList from './pages/UserList';
import AddUser from './pages/AddUser';
import SlideList from './pages/SlideList';
import AddSlide from './pages/AddSlide';
import PageList from './pages/PageList';
import AddPage from './pages/AddPage';
import RegionList from './pages/RegionList';
import AddRegion from './pages/AddRegion';
import PostList from './pages/PostList';
import AddPost from './pages/AddPost';
import FormList from './pages/FormList';
import AddForm from './pages/AddForm';
import FieldList from './pages/FieldList';
import AddField from './pages/AddField';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoutes>
              <Login />
            </OpenRoutes>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoutes>
              <MainLayout />
            </PrivateRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="user-list" element={<UserList />} />
          <Route path="user" element={<AddUser />} />
          <Route path="user/:id" element={<AddUser />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<ViewEnq />} />
          <Route path="faq-list" element={<FaqList />} />
          <Route path="faq" element={<Addfaq />} />
          <Route path="faq/:id" element={<Addfaq />} />
          <Route path="region-list" element={<RegionList />} />
          <Route path="region" element={<AddRegion />} />
          <Route path="region/:id" element={<AddRegion />} />
          <Route path="post-list" element={<PostList />} />
          <Route path="post" element={<AddPost />} />
          <Route path="post/:id" element={<AddPost />} />
          <Route path="form/:id/field-list" element={<FieldList />} />
          <Route path="form/:id/field-list/:id" element={<AddField />} />
          <Route path="form/:id/field" element={<AddField />} />
          <Route path="form-list" element={<FormList />} />
          <Route path="form" element={<AddForm />} />
          <Route path="form/:id" element={<AddForm />} />
          <Route path="slide-list" element={<SlideList />} />
          <Route path="slide" element={<AddSlide />} />
          <Route path="slide/:id" element={<AddSlide />} />
          <Route path="page-list" element={<PageList />} />
          <Route path="page" element={<AddPage />} />
          <Route path="page/:id" element={<AddPage />} />
          <Route path="partner-list" element={<Partnerlist />} />
          <Route path="partner" element={<AddPartner />} />
          <Route path="partner/:id" element={<AddPartner />} />
          <Route path="tariff-list" element={<TariffList />} />
          <Route path="tariff" element={<AddTariff />} />
          <Route path="tariff/:id" element={<AddTariff />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<ViewOrder />} />
          <Route path="customers" element={<Customers />} />
          <Route path="review-list" element={<ReviewList />} />
          <Route path="review" element={<Addreview />} />
          <Route path="review/:id" element={<Addreview />} />
          <Route path="service-list" element={<ServiceList />} />
          <Route path="payment-list" element={<PaymentList />} />
          <Route path="campaign-list" element={<CampaignList />} />
          <Route path="campaign" element={<AddCampaign />} />
          <Route path="campaign/:id" element={<AddCampaign />} />
          <Route path="channel-list" element={<ChannelList />} />
          <Route path="channel" element={<AddCountry />} />
          <Route path="channel/:id" element={<AddCountry />} />
          <Route path="country-list" element={<CountryList />} />
          <Route path="country" element={<AddCountry />} />
          <Route path="country/:id" element={<AddCountry />} />
          <Route path="payment" element={<AddPayment />} />
          <Route path="payment/:id" element={<AddPayment />} />
          <Route path="service" element={<AddService />} />
          <Route path="service/:id" element={<AddService />} />
          <Route path="structure-list" element={<StructureList />} />
          <Route path="structure" element={<AddStructure />} />
          <Route path="structure/:id" element={<AddStructure />} />
          <Route path="popup-list" element={<Popuplist />} />
          <Route path="vacancy-list" element={<VacancyList />} />
          <Route path="vacancy" element={<AddVacancy />} />
          <Route path="vacancy/:id" element={<AddVacancy />} />
          <Route path="popup" element={<Addpopup />} />
          <Route path="popup/:id" element={<Addpopup />} />
          <Route path="product-list" element={<Productlist />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="product/:id" element={<Addproduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
