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
import { getcolors } from '../features/color/colorSlice';

let schema = yup.object({
  name: yup.string().required('Name is Required'),
  description: yup.string().required('Description is Required'),
  active: yup.string(),
  color_id: yup.string().required('Color is Required'),
  handle: yup.string(),
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
    regionHandle,
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
    regionHandle,
    regionColor,
    updatedRegion,
    navigate,
  ]);
  useEffect(() => {
    dispatch(getcolors());
  }, []);
  const colorState = useSelector((state) => state.color.colors.data);
  console.log(colorState);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: regionName || '',
      description: regionDescription || '',
      active: regionActive ? 1 : 0,
      color_id: regionColor || '',
      handle: regionHandle || '',
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
        {getregionId !== undefined ? 'Edit' : 'Add'} Region
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = [
              'name',
              'description',
              'active',
              'color_id',
            ];
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
          <div className="my-2">
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
          <label htmlFor="" className="mt-2">
            Name
          </label>
          <CustomInput
            type="text"
            label="Enter Region Name"
            name="name"
            onCh={formik.handleChange('name')}
            onBl={formik.handleBlur('name')}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <label htmlFor="" className="mt-2">
            Description
          </label>
          <CustomInput
            type="text"
            label="Enter Region Description"
            name="description"
            onCh={formik.handleChange('description')}
            onBl={formik.handleBlur('description')}
            val={formik.values.description}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <label htmlFor="" className="mt-2">
            Handle
          </label>
          <CustomInput
            type="text"
            label="Enter Region Handle"
            name="handle"
            onCh={formik.handleChange('handle')}
            onBl={formik.handleBlur('handle')}
            val={formik.values.handle}
            readOnly={'readOnly'}
          />
          <label htmlFor="" className="mt-2">
            Color
          </label>
          <select
            className="text-[#637381] mt-2 bg-inherit w text-[15px] font-medium rounded-lg block w-1/8 p-2.5 focus:ring-0 hom"
            id="color"
            name="color_id"
            onChange={formik.handleChange('color_id')}
            onBlur={formik.handleBlur('color_id')}
            value={formik.values.color_id}
          >
            <option value="">Select Color</option>
            {colorState?.map((color) => (
              <option key={color.id} value={color.id}>
                {color.name}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.color_id && formik.errors.color_id}
          </div>
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getregionId !== undefined ? 'Edit' : 'Add'} Region
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRegion;
