import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  getACoupon,
  resetState,
  updateACoupon,
} from '../features/coupon/couponSlice';
import { createCoupon } from '../features/coupon/couponSlice';
import { useLocation, useNavigate } from 'react-router-dom';

let schema = yup.object({
  name: yup.string().required('Brand name is Required'),
  expiry: yup.date().required('Expiry dates is Required'),
  discount: yup.number().required('Discount  is Required'),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCouponId = location.pathname.split('/')[3];

  const newCoupon = useSelector((state) => state.coupon);

  const {
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    couponName,
    couponExpiry,
    couponDiscount,
    updatedCoupon,
  } = newCoupon;

  const changeDateFormat = (date) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getCouponId]);

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success('Coupon Added Successfully!');
    }
    if (isSuccess && updatedCoupon) {
      toast.success('Coupon Updated Successfully!');
      navigate('/admin/coupon-list');
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdCoupon,
    couponName,
    updatedCoupon,
    couponExpiry,
    couponDiscount,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || '',
      expiry: changeDateFormat(couponExpiry) || '',
      discount: couponDiscount || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateACoupon(data));
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getCouponId !== undefined ? 'Edit' : 'Add'} Coupon
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Coupon Name"
            name="name"
            onCh={formik.handleChange('name')}
            onBl={formik.handleBlur('name')}
            val={formik.values.name}
            id="coupon"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            label="Enter Expiry Date"
            name="expiry"
            onCh={formik.handleChange('expiry')}
            onBl={formik.handleBlur('expiry')}
            val={formik.values.expiry}
            id="expiry"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            label="Enter Discount"
            name="discount"
            onCh={formik.handleChange('discount')}
            onBl={formik.handleBlur('discount')}
            val={formik.values.discount}
            id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCouponId !== undefined ? 'Edit' : 'Add'} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
