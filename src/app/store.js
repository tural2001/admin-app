import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import customerReducer from '../features/customers/customerSlice';
import productReducer from '../features/product/productSlice';
import popupReducer from '../features/popup/popupSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';
import tariffReducer from '../features/tariffs/tariffSlice';
import vacancyReducer from '../features/vacancies/vacaciesSlice';
import faqReducer from '../features/faq/faqSlice';
import countryReducer from '../features/countries/countriesSlice';
import colorReducer from '../features/color/colorSlice';
import enquiryReducer from '../features/enquiry/enquirySlice';
import uploadReducer from '../features/upload/uploadSlice';
import partnerReducer from '../features/partners/partnersSlice';
import structureReducer from '../features/structures/structuresSlice';
import serviceReducer from '../features/services/servicesSlice';
import paymentReducer from '../features/payments/paymentsSlice';
import campaignReducer from '../features/campaigns/campaignsSlice';
import channelReducer from '../features/channels/channelsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    popup: popupReducer,
    reviews: reviewsReducer,
    tariff: tariffReducer,
    vacancy: vacancyReducer,
    structure: structureReducer,
    service: serviceReducer,
    payment: paymentReducer,
    channel: channelReducer,
    campaign: campaignReducer,
    faq: faqReducer,
    country: countryReducer,
    color: colorReducer,
    enquiry: enquiryReducer,
    upload: uploadReducer,
    partner: partnerReducer,
  },
});
