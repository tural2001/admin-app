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
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

let schema = yup.object({
  title: yup.string().required('Title is Required'),
  slug: yup.string(),
  content: yup.string().required('Content is Required'),
  meta_title: yup.string(),
  meta_description: yup.string(),
});
const AddPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getpageId = location.pathname.split('/')[3];
  const newPage = useSelector((state) => state.page);

  const {
    isSuccess,
    isError,
    isLoading,
    createdPage,
    pageTitle,
    pageSlug,
    pageContent,
    updatedPage,
    pageMeta_title,
    pagelMeta_description,
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
    pageMeta_title,
    pagelMeta_description,
    updatedPage,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: pageTitle || '',
      slug: pageSlug || '',
      content: pageContent || '',
      meta_title: pageContent || '',
      meta_description: pageContent || '',
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

  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    [{ list: 'check' }],
    ['clean'],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  return (
    <div>
      <h3 className="mb-4 title">
        {getpageId !== undefined ? 'Edit' : 'Add'} Page
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['title', 'slug', 'content'];
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
            Meta title
          </label>
          <CustomInput
            type="text"
            label="Enter Meta Title"
            name="meta_title"
            onCh={formik.handleChange('meta_title')}
            onBl={formik.handleBlur('meta_title')}
            val={formik.values.meta_title}
          />
          <div className="error">
            {formik.touched.meta_title && formik.errors.meta_title}
          </div>
          <label htmlFor="" className="mt-2">
            Meta description
          </label>
          <CustomInput
            type="text"
            label="Enter Meta Description"
            name="meta_description"
            onCh={formik.handleChange('meta_description')}
            onBl={formik.handleBlur('meta_description')}
            val={formik.values.meta_description}
          />
          <div className="error">
            {formik.touched.meta_description && formik.errors.meta_description}
          </div>
          <label htmlFor="" className="mt-2">
            Slug
          </label>
          <CustomInput
            type="text"
            label="Enter Page Slug"
            name="slug"
            onCh={formik.handleChange('slug')}
            onBl={formik.handleBlur('slug')}
            val={formik.values.slug}
            readOnly={'readOnly'}
          />
          <label htmlFor="" className="mt-2">
            Type
          </label>
          <CustomInput
            type="text"
            label="Enter Page Title"
            name="title"
            onCh={formik.handleChange('title')}
            onBl={formik.handleBlur('title')}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <label htmlFor="" className="mt-2">
            Content
          </label>
          <ReactQuill
            theme="snow"
            name="description"
            className="mt-3"
            onChange={formik.handleChange('content')}
            value={formik.values.content}
            modules={module}
          />
          <div className="error">
            {formik.touched.content && formik.errors.content}
          </div>
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getpageId !== undefined ? 'Edit' : 'Add'} Page
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPage;
