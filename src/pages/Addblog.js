import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone';
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getbcategories } from '../features/bcategory/bcategorySlice';
import { createBlog, getABlog, updateABlog } from '../features/blogs/blogSlice';
import { resetState } from '../features/blogs/blogSlice';
import { useLocation, useNavigate } from 'react-router-dom';

let schema = yup.object({
  title: yup.string().required('Title is Required'),
  description: yup.string().required('Description is Required'),
  category: yup.string().required('Category is Required'),
  images: yup.array().required('Images is Required'),
});

const Addblog = (e) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split('/')[3];

  useEffect(() => {
    dispatch(getbcategories());
  }, [dispatch]);

  const imgState = useSelector((state) => state.upload.images);
  const bcategoryState = useSelector((state) => state.bcategory.bcategories);
  const newBlog = useSelector((state) => state.blog);

  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    blogName,
    updatedBlog,
    blogCategory,
    blogDescription,
  } = newBlog;

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getBlogId]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success('Blog Added Successfully!');
    }
    if (isSuccess && updatedBlog !== undefined) {
      toast.success('Blog Updated Successfully!');
      navigate('/admin/blog-list');
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    blogName,
    blogCategory,
    blogDescription,
    updatedBlog,
    navigate,
  ]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [img]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || '',
      description: blogDescription || '',
      category: blogCategory || '',
      images: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateABlog(data));
      } else {
        dispatch(createBlog(values));
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
        {getBlogId !== undefined ? 'Edit' : 'Add'} Blog
      </h3>

      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              label="Enter Blog Title"
              name="title"
              onCh={formik.handleChange('title')}
              onBl={formik.handleBlur('title')}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
          </div>
          <select
            className="form-control py-3 mb-3 mt-3"
            name="category"
            onChange={formik.handleChange('category')}
            onBlur={formik.handleBlur('category')}
            value={formik.values.category}
            id=""
          >
            <option value="">Select Blog Category</option>
            {bcategoryState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <div className="mb-3">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange('description')}
              value={formik.values.description}
            />
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>
          </div>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="submit"
                    onClick={() => dispatch(deleteImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: '10px', right: '10px' }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBlogId !== undefined ? 'Edit' : 'Add'} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
