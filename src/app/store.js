import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import customerReducer from '../features/customers/customerSlice';
import productReducer from '../features/product/productSlice';
import popupReducer from '../features/popup/popupSlice';
import reviewsReducer from '../features/reviews/reviewsSlice';
import tariffReducer from '../features/tariffs/tariffSlice';
import pageReducer from '../features/pagess/pagesSlice';
import faqReducer from '../features/faq/faqSlice';
import settingReducer from '../features/settings/settingSlice';
import userReducer from '../features/users/usersSlice';
import countryReducer from '../features/countries/countriesSlice';
import uploadReducer from '../features/upload/uploadSlice';
import partnerReducer from '../features/partners/partnersSlice';
import structureReducer from '../features/structures/structuresSlice';
import serviceReducer from '../features/services/servicesSlice';
import paymentReducer from '../features/payments/paymentsSlice';
import campaignReducer from '../features/campaigns/campaignsSlice';
import channelReducer from '../features/channels/channelsSlice';
import slideReducer from '../features/slides/slidesSlice';
import regionReducer from '../features/regions/regionSlice';
import postReducer from '../features/posts/postSlice';
import formReducer from '../features/form/formSlice';
import advantageReducer from '../features/advantages/advantagesSlice';
import ourvalueReducer from '../features/ourvalues/OurValuesSlice';
import colorReducer from '../features/color/colorSlice';
import careerReducer from '../features/career/careerSlice';
import faqformReducer from '../features/faqform/faqformSlice';
import formdataReducer from '../features/formData/formDataSlice';
import careerpageReducer from '../features/careerpage/careerpageSlice';
import servicecategoryReducer from '../features/servicecategories/servicecategoriesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    popup: popupReducer,
    reviews: reviewsReducer,
    tariff: tariffReducer,
    servicecategory: servicecategoryReducer,
    region: regionReducer,
    field: formReducer,
    post: postReducer,
    advantage: advantageReducer,
    ourvalue: ourvalueReducer,
    color: colorReducer,
    page: pageReducer,
    structure: structureReducer,
    service: serviceReducer,
    payment: paymentReducer,
    channel: channelReducer,
    campaign: campaignReducer,
    career: careerReducer,
    slide: slideReducer,
    faq: faqReducer,
    careerpage: careerpageReducer,
    faqform: faqformReducer,
    formdata: formdataReducer,
    setting: settingReducer,
    user: userReducer,
    country: countryReducer,
    upload: uploadReducer,
    partner: partnerReducer,
  },
});
