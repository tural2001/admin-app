import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import FaqList from './pages/FaqList';
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
import FieldList from './pages/FieldList';
import AddField from './pages/AddField';
import SettingList from './pages/SettingList';
import Addsetting from './pages/AddSetting';
import AdvantageList from './pages/AdvantageList';
import Addadvantage from './pages/AddAdvantage';
import OurValueList from './pages/OurValueList';
import AddOurValue from './pages/AddOurValue';
import AddColor from './pages/AddColor';
import ColorList from './pages/ColorList';
import CareerList from './pages/CareerList';
import AddCareer from './pages/AddCareer';
import FaqFormList from './pages/FaqFormList';
import AddFaqForm from './pages/AddFaqForm';
import FormDataList from './pages/FormDataList';
import Addcareer from './pages/Addcareerpage';
import CareerpageList from './pages/Careerpage';
import Addcareerpage from './pages/Addcareerpage';
import ServiceCList from './pages/ServiceCList';
import AddServiceC from './pages/AddServiceC';

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
          <Route path="setting-list" element={<SettingList />} />
          <Route path="setting/:id" element={<Addsetting />} />
          <Route path="setting" element={<Addsetting />} />
          <Route path="faq-form-list" element={<FaqFormList />} />
          <Route path="formdata-list" element={<FormDataList />} />
          <Route path="faq-form" element={<AddFaqForm />} />
          <Route path="faq-form/:id" element={<AddFaqForm />} />
          <Route path="service-category-list" element={<ServiceCList />} />
          <Route path="service-category" element={<AddServiceC />} />
          <Route path="service-category/:id" element={<AddServiceC />} />
          <Route path="color-list" element={<ColorList />} />
          <Route path="color" element={<AddColor />} />
          <Route path="color/:id" element={<AddColor />} />
          <Route path="career-form-list" element={<CareerList />} />
          <Route path="career-list" element={<CareerpageList />} />
          <Route path="career" element={<Addcareerpage />} />
          <Route path="career/:id" element={<Addcareerpage />} />
          <Route path="faq-list" element={<FaqList />} />
          <Route path="faq" element={<Addfaq />} />
          <Route path="faq/:id" element={<Addfaq />} />
          <Route path="advantage-list" element={<AdvantageList />} />
          <Route path="advantage" element={<Addadvantage />} />
          <Route path="advantage/:id" element={<Addadvantage />} />
          <Route path="our-value-list" element={<OurValueList />} />
          <Route path="our-value" element={<AddOurValue />} />
          <Route path="our-value/:id" element={<AddOurValue />} />
          <Route path="region-list" element={<RegionList />} />
          <Route path="region" element={<AddRegion />} />
          <Route path="region/:id" element={<AddRegion />} />
          <Route path="post-list" element={<PostList />} />
          <Route path="post" element={<AddPost />} />
          <Route path="post/:id" element={<AddPost />} />
          <Route path="field-list" element={<FieldList />} />
          <Route path="field" element={<AddField />} />
          <Route path="field-list/:id" element={<AddField />} />
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
          <Route path="review-list" element={<ReviewList />} />
          <Route path="review" element={<Addreview />} />
          <Route path="review/:id" element={<Addreview />} />
          <Route path="service-list" element={<ServiceList />} />
          <Route path="payment-list" element={<PaymentList />} />
          <Route path="campaign-list" element={<CampaignList />} />
          <Route path="campaign" element={<AddCampaign />} />
          <Route path="campaign/:id" element={<AddCampaign />} />
          <Route path="channel-list" element={<ChannelList />} />
          <Route path="channel" element={<Addchannel />} />
          <Route path="channel/:id" element={<Addchannel />} />
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
