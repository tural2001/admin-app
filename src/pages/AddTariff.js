import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useLocation, useNavigate } from 'react-router-dom';
import {
  createAtariff,
  getAtariff,
  resetState,
  updateAtariff,
} from '../features/tariffs/tariffSlice';

let schema = yup.object({
  name: yup.string().required(' Required'),
  description: yup.string().required(' Required'),
  price: yup.number().required(' Required'),
  speed: yup.number().required(' Required'),
  active: yup.string().required(' Required'),
  most_wanted: yup.string().required(' Required'),
});
const AddTariff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getTariffId = location.pathname.split('/')[3];
  const newTariff = useSelector((state) => state.tariff);

  console.log(newTariff);
  const {
    isSuccess,
    isError,
    isLoading,
    createdTariff,
    tariffName,
    tariffSpeed,
    tariffPrice,
    tariffDescription,
    tariffActive,
    updatedTariff,
    tariffMostWanted,
  } = newTariff;

  useEffect(() => {
    if (getTariffId !== undefined) {
      dispatch(getAtariff(getTariffId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getTariffId]);

  useEffect(() => {
    if (isSuccess && createdTariff) {
      toast.success('Tariff Added Successfully!');
      navigate('/admin/tariff-list');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    if (isSuccess && updatedTariff !== undefined) {
      toast.success('Tariff Updated Successfully!');
      navigate('/admin/tariff-list');
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdTariff,
    tariffName,
    tariffSpeed,
    tariffPrice,
    tariffDescription,
    tariffActive,
    updatedTariff,
    tariffMostWanted,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: tariffName || '',
      speed: tariffSpeed || '',
      price: tariffPrice || '',
      description: tariffDescription || '',
      active: tariffActive ? 1 : 0,
      most_wanted: tariffMostWanted ? 1 : 0,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getTariffId !== undefined) {
        const data = { id: getTariffId, tariffData: values };
        dispatch(updateAtariff(data));
      } else {
        dispatch(createAtariff(values));
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
        {getTariffId !== undefined ? 'Edit' : 'Add'} Tariff
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="my-4">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="active"
                  onChange={() => formik.setFieldValue('active', '1')}
                  onBlur={formik.handleBlur}
                  value="1"
                  checked={
                    newTariff.tariffActive
                      ? 1
                      : 0 || formik.values.active === '1'
                  }
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">Active</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="active"
                  onChange={() => formik.setFieldValue('active', '0')}
                  onBlur={formik.handleBlur}
                  value="1"
                  checked={formik.values.active === '0'}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">Not Active</span>
              </label>
            </div>
          </div>
          <div className="error">
            {formik.touched.active && formik.errors.active}
          </div>
          <div className="my-4">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="most_wanted"
                  onChange={() => formik.setFieldValue('most_wanted', '1')}
                  onBlur={formik.handleBlur}
                  value="1"
                  checked={
                    newTariff.tariffMostWanted
                      ? 1
                      : 0 || formik.values.most_wanted === '1'
                  }
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">most_wanted</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="most_wanted"
                  onChange={() => formik.setFieldValue('most_wanted', '0')}
                  onBlur={formik.handleBlur}
                  value="0"
                  checked={formik.values.most_wanted === '0'}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">Not most_wanted</span>
              </label>
            </div>
          </div>
          <div className="error">
            {formik.touched.most_wanted && formik.errors.most_wanted}
          </div>
          <CustomInput
            type="text"
            label="Enter "
            name="name"
            onCh={formik.handleChange('name')}
            onBl={formik.handleBlur('name')}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="text"
            label="Enter "
            name="description"
            onCh={formik.handleChange('description')}
            onBl={formik.handleBlur('description')}
            val={formik.values.description}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            label="Number"
            name="speed"
            onCh={formik.handleChange('speed')}
            onBl={formik.handleBlur('speed')}
            val={formik.values.speed}
          />
          <div className="error">
            {formik.touched.speed && formik.errors.speed}
          </div>
          <CustomInput
            type="number"
            label="Number"
            name="price"
            onCh={formik.handleChange('price')}
            onBl={formik.handleBlur('price')}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getTariffId !== undefined ? 'Edit' : 'Add'} tariff
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTariff;
