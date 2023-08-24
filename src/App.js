import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import Enquiries from './pages/Enquiries';
import FaqList from './pages/FaqList';
import Blogcatlist from './pages/Blogcatlist';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Colorlist from './pages/Colorlist';
import Brandlist from './pages/Brandlist';
import Productlist from './pages/Productlist';
import Addblogcat from './pages/Addblogcat';
import Addcolor from './pages/Addcolor';
import Addbrand from './pages/Addbrand';
import Addproduct from './pages/Addproduct';
import Couponlist from './pages/Couponlist';
import AddCoupon from './pages/AddCoupon';
import ViewEnq from './pages/ViewEnq';
import ViewOrder from './pages/ViewOrder';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing//OpenRoutes';
import Addfaq from './pages/Addfaq';
import Addreview from './pages/Addreview';
import ReviewList from './pages/ReviewList';

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
          <Route path="coupon-list" element={<Couponlist />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="coupon/:id" element={<AddCoupon />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="blog-category/:id" element={<Addblogcat />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<ViewOrder />} />
          <Route path="customers" element={<Customers />} />
          {/* <Route path="color-list" element={<Colorlist />} />
          <Route path="color" element={<Addcolor />} />
          <Route path="color/:id" element={<Addcolor />} /> */}
          <Route path="review-list" element={<ReviewList />} />
          <Route path="review" element={<Addreview />} />
          <Route path="review/:id" element={<Addreview />} />
          <Route path="brand-list" element={<Brandlist />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="product-list" element={<Productlist />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="product/:id" element={<Addproduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
