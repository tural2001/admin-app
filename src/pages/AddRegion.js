import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useLocation, useNavigate } from 'react-router-dom';
import {
  createAregion,
  getAregion,
  resetState,
  updateAregion,
} from '../features/regions/regionSlice';

let schema = yup.object({
  name: yup.string().required(' Required'),
  description: yup.string().required(' Required'),
  active: yup.string().required(' Required'),
  color: yup.string().required(' Required'),
});
const AddRegion = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getregionId = location.pathname.split('/')[3];
  const newRegion = useSelector((state) => state.region);

  console.log(newRegion);
  const {
    isSuccess,
    isError,
    isLoading,
    createdRegion,
    regionName,
    regionDescription,
    regionActive,
    regionColor,
    updatedRegion,
  } = newRegion;

  useEffect(() => {
    if (getregionId !== undefined) {
      dispatch(getAregion(getregionId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getregionId]);

  useEffect(() => {
    if (isSuccess && createdRegion) {
      toast.success('region Added Successfully!');
      navigate('/admin/region-list');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    if (isSuccess && updatedRegion !== undefined) {
      toast.success('region Updated Successfully!');
      navigate('/admin/region-list');
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdRegion,
    regionName,
    regionDescription,
    regionActive,
    regionColor,
    updatedRegion,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: regionName || '',
      description: regionDescription || '',
      active: regionActive ? 1 : 0,
      color: regionColor || 'black',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getregionId !== undefined) {
        const data = { id: getregionId, regionData: values };
        dispatch(updateAregion(data));
      } else {
        dispatch(createAregion(values));
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
        {getregionId !== undefined ? 'Edit' : 'Add'} region
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
                    newRegion.regionActive
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
            type="text"
            label="Number"
            name="color"
            onCh={formik.handleChange('color')}
            onBl={formik.handleBlur('color')}
            val={formik.values.color}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getregionId !== undefined ? 'Edit' : 'Add'} region
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRegion;
