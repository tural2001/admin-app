import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import Enquiries from './pages/Enquiries';
import FaqList from './pages/FaqList';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Colorlist from './pages/Colorlist';
import Productlist from './pages/Productlist';
import Addcolor from './pages/Addcolor';
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
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<ViewEnq />} />
          <Route path="faq-list" element={<FaqList />} />
          <Route path="faq" element={<Addfaq />} />
          <Route path="faq/:id" element={<Addfaq />} />
          <Route path="partner-list" element={<Partnerlist />} />
          <Route path="partner" element={<AddPartner />} />
          <Route path="partner/:id" element={<AddPartner />} />
          <Route path="tariff-list" element={<TariffList />} />
          <Route path="tariff" element={<AddTariff />} />
          <Route path="tariff/:id" element={<AddTariff />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<ViewOrder />} />
          <Route path="customers" element={<Customers />} />
          {/* <Route path="color-list" element={<Colorlist />} />
          <Route path="color" element={<Addcolor />} />
          <Route path="color/:id" element={<Addcolor />} /> */}
          <Route path="review-list" element={<ReviewList />} />
          <Route path="review" element={<Addreview />} />
          <Route path="review/:id" element={<Addreview />} />
          <Route path="service-list" element={<ServiceList />} />
          <Route path="service" element={<AddService />} />
          <Route path="service/:id" element={<AddService />} />
          <Route path="structure-list" element={<StructureList />} />
          <Route path="structure" element={<AddStructure />} />
          <Route path="structure/:id" element={<AddStructure />} />
          <Route path="popup-list" element={<Popuplist />} />
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
