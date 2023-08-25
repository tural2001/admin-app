import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import customerReducer from '../features/customers/customerSlice';
import productReducer from '../features/product/productSlice';
import popupReducer from '../features/popup/popupSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';
import tariffReducer from '../features/tariffs/tariffSlice';
import faqReducer from '../features/faq/faqSlice';
import colorReducer from '../features/color/colorSlice';
import enquiryReducer from '../features/enquiry/enquirySlice';
import uploadReducer from '../features/upload/uploadSlice';
import partnerReducer from '../features/partners/partnersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    popup: popupReducer,
    reviews: reviewsReducer,
    tariff: tariffReducer,
    faq: faqReducer,
    color: colorReducer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
    partner: partnerReducer,
  },
});
