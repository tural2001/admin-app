import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createCategory,
  getACategory,
  updateACategory,
} from '../features/pcategory/pcategorySlice';
import { resetState } from '../features/pcategory/pcategorySlice';

let schema = yup.object({
  title: yup.string().required('Category name is Required'),
});

const Addcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCategoryId = location.pathname.split('/')[3];
  const newCategory = useSelector((state) => state.pcategory);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    categoryName,
    updatedCategory,
  } = newCategory;

  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getACategory(getCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getCategoryId]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success('Category added successfully');
    }
    if (isSuccess && updatedCategory !== undefined) {
      toast.success('Category Updated Successfully!');
      navigate('/admin/category-list');
    }
    if (isError) {
      toast.error('Something went wrong');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    categoryName,
    updatedCategory,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCategoryId !== undefined) {
        const data = { id: getCategoryId, categoryData: values };
        dispatch(updateACategory(data));
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  console.log(categoryName);

  return (
    <div>
      <h3 className="mb-4 title">
        {getCategoryId !== undefined ? 'Edit' : 'Add'} Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Category"
            name="title"
            onCh={formik.handleChange('title')}
            onBl={formik.handleBlur('title')}
            val={formik.values.title}
            id="category"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCategoryId !== undefined ? 'Edit' : 'Add'} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
