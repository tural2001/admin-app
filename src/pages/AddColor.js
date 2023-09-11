/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import {
  createAcolor,
  getAcolor,
  resetState,
  updateAcolor,
} from '../features/color/colorSlice';
import { useLocation, useNavigate } from 'react-router-dom';

let schema = yup.object({
  name: yup.string().required('Name is Required'),
  code: yup.string().required('Code is Required'),
  active: yup.string(),
});

const AddColor = (e) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getcolorId = location.pathname.split('/')[3];
  const newcolor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdcolor,
    colorName,
    colorActive,
    colorCode,
    updatedcolor,
  } = newcolor;

  useEffect(() => {
    if (getcolorId !== undefined) {
      dispatch(getAcolor(getcolorId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getcolorId]);

  useEffect(() => {
    if (isSuccess && createdcolor !== undefined) {
      toast.success('Color Added Successfully!');
      navigate('/admin/color-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isSuccess && updatedcolor !== undefined) {
      toast.success('Color Updated Successfully!');
      navigate('/admin/color-list');
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdcolor,
    colorName,
    colorActive,
    colorCode,
    updatedcolor,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: colorName || '',
      code: colorCode || '',
      active: colorActive ? 1 : 0,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getcolorId !== undefined) {
        const data = { id: getcolorId, colorData: values };
        dispatch(updateAcolor(data));
      } else {
        dispatch(createAcolor(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  useEffect(() => {
    if (getcolorId === undefined) {
      formik.setFieldValue('active', '1');
    } else {
      formik.setFieldValue('active', newcolor.colorActive ? '1' : '0');
    }
  }, [getcolorId, newcolor.colorActive]);
  return (
    <div>
      <h3 className="mb-4 title">
        {getcolorId !== undefined ? 'Edit' : 'Add'} Color
      </h3>
      <div className="">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['name', 'code'];
            const errors = {};
            requiredFields.forEach((fieldName) => {
              if (formik.touched[fieldName] && !formik.values[fieldName]) {
                errors[fieldName] = 'This field is Required';
              }
            });
            if (Object.keys(errors).length > 0) {
              toast.error('Please fill in the required fields.');
              return;
            }
            formik.handleSubmit(e);
          }}
        >
          {' '}
          <label htmlFor="" className="mt-2">
            Status
          </label>
          <div className="mt-2">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="active"
                  onChange={() => formik.setFieldValue('active', '1')}
                  onBlur={formik.handleBlur}
                  value="1"
                  checked={formik.values.active === '1'}
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
                  value="0"
                  checked={formik.values.active === '0'}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">Not Active</span>
              </label>
            </div>
            <div className="error">
              {formik.touched.active && formik.errors.active}
            </div>
            <label htmlFor="" className="mt-2">
              Name
            </label>
            <CustomInput
              type="text"
              label="Enter color Name"
              name="name"
              onCh={formik.handleChange('name')}
              onBl={formik.handleBlur('name')}
              val={formik.values.name}
            />
            <div className="error">
              {formik.touched.name && formik.errors.name}
            </div>
            <label htmlFor="" className="mt-2">
              Code
            </label>
            <CustomInput
              type="color"
              label="Enter color Code"
              name="code"
              onCh={formik.handleChange('code')}
              onBl={formik.handleBlur('code')}
              val={formik.values.code}
            />
            <div className="error">
              {formik.touched.code && formik.errors.code}
            </div>
          </div>
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getcolorId !== undefined ? 'Edit' : 'Add'} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
