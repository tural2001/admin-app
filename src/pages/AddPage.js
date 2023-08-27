import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  createApage,
  getApage,
  resetState,
  updateApage,
} from '../features/pagess/pagesSlice';

let schema = yup.object({
  title: yup.string().required(' Required'),
  slug: yup.string().required(' Required'),
  content: yup.string().required(' Required'),
});
const AddPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getpageId = location.pathname.split('/')[3];
  const newPage = useSelector((state) => state.page);

  console.log(newPage);
  const {
    isSuccess,
    isError,
    isLoading,
    createdPage,
    pageTitle,
    pageSlug,
    pageContent,
    updatedPage,
  } = newPage;

  useEffect(() => {
    if (getpageId !== undefined) {
      dispatch(getApage(getpageId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getpageId]);

  useEffect(() => {
    if (isSuccess && createdPage) {
      toast.success('Page Added Successfully!');
      navigate('/admin/page-list');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    if (isSuccess && updatedPage !== undefined) {
      toast.success('Page Updated Successfully!');
      navigate('/admin/page-list');
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdPage,
    pageTitle,
    pageSlug,
    pageContent,
    updatedPage,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: pageTitle || '',
      slug: pageSlug || '',
      content: pageContent || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getpageId !== undefined) {
        const data = { id: getpageId, pageData: values };
        dispatch(updateApage(data));
      } else {
        dispatch(createApage(values));
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
        {getpageId !== undefined ? 'Edit' : 'Add'} page
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Slug"
            name="slug"
            onCh={formik.handleChange('slug')}
            onBl={formik.handleBlur('slug')}
            val={formik.values.slug}
          />
          <div className="error">
            {formik.touched.slug && formik.errors.slug}
          </div>
          <CustomInput
            type="text"
            label="Enter "
            name="title"
            onCh={formik.handleChange('title')}
            onBl={formik.handleBlur('title')}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <CustomInput
            type="text"
            label="Enter Content"
            name="content"
            onCh={formik.handleChange('content')}
            onBl={formik.handleBlur('content')}
            val={formik.values.content}
          />
          <div className="error">
            {formik.touched.content && formik.errors.content}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getpageId !== undefined ? 'Edit' : 'Add'} page
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPage;
