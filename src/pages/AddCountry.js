import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { useLocation, useNavigate } from 'react-router-dom';
import {
  createAcountry,
  getAcountry,
  updateAcountry,
  resetState,
} from '../features/countries/countriesSlice';

let schema = yup.object({
  name: yup.string().required('Name is Required'),
  active: yup.string().required('Required'),
});

const AddCountry = (e) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getcountryId = location.pathname.split('/')[3];
  const newCountry = useSelector((state) => state.country);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCountry,
    countryName,
    countryActive,
    updatedCountry,
  } = newCountry;

  useEffect(() => {
    if (getcountryId !== undefined) {
      dispatch(getAcountry(getcountryId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getcountryId]);

  useEffect(() => {
    if (isSuccess && createdCountry) {
      toast.success('Country Added Successfully!');
      navigate('/admin/country-list');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    if (isSuccess && updatedCountry !== undefined) {
      toast.success('Country Updated Successfully!');
      navigate('/admin/country-list');
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdCountry,
    countryActive,
    countryName,
    updatedCountry,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: countryName || '',
      active: countryActive ? 1 : 0,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getcountryId !== undefined) {
        const data = { id: getcountryId, countryData: values };
        dispatch(updateAcountry(data));
      } else {
        dispatch(createAcountry(values));
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
        {getcountryId !== undefined ? 'Edit' : 'Add'} Country
      </h3>
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-4">
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
                      newCountry.countryActive
                        ? 1
                        : 0 || formik.values.active === '1'
                    }
                    className="text-blue-500 form-radio h-4 w-4"
                  />
                  <span className={`ml-2`}>Active</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    name="active"
                    onChange={() => formik.setFieldValue('active', '0')}
                    onBlur={formik.handleBlur}
                    value="0"
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
            <CustomInput
              type="text"
              label="Enter country Name"
              name="name"
              onCh={formik.handleChange('name')}
              onBl={formik.handleBlur('name')}
              val={formik.values.name}
            />
            <div className="error">
              {formik.touched.name && formik.errors.name}
            </div>
          </div>
          <button className="bg-blue-300 p-3  rounded-xl my-5" type="submit">
            {getcountryId !== undefined ? 'Edit' : 'Add'} Country
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCountry;
