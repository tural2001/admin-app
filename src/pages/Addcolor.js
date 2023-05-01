import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  createColor,
  getAColor,
  updateAColor,
} from '../features/color/colorSlice';
import { resetState } from '../features/color/colorSlice';

let schema = yup.object({
  name: yup.string().required('Color is Required'),
});

const Addcolor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getColorId = location.pathname.split('/')[3];
  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    colorName,
    updatedColor,
  } = newColor;

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getColorId]);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success('Color added successfully');
    }
    if (isSuccess && updatedColor !== undefined) {
      toast.success('Color Updated Successfully!');
      navigate('/admin/color-list');
    }
    if (isError) {
      toast.error('Something went wrong');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdColor,
    colorName,
    updatedColor,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: colorName || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateAColor(data));
      } else {
        dispatch(createColor(values));
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
        {getColorId !== undefined ? 'Edit' : 'Add'} Color
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter Color"
            name="title"
            onCh={formik.handleChange('name')}
            onBl={formik.handleBlur('name')}
            val={formik.values.name}
            id="color"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getColorId !== undefined ? 'Edit' : 'Add'} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;
