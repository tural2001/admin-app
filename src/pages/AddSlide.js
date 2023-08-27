import React, { useCallback, useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import {
  createAslide,
  getAslide,
  updateAslide,
} from '../features/slides/slidesSlice';
import { resetState } from '../features/users/usersSlice';

let schema = yup.object({
  title: yup.string().required('title is Required'),
  order: yup.number().required('order is Required'),
  show_button: yup.string().required('Show_button s is Required'),
  button_text: yup.string().required('button_text s is Required'),
  button_link: yup.string().required('button_link s is Required'),
  description: yup.string().required('Description is Required'),
  image: yup.mixed().required('Image is Required'),
  active: yup.string().required('Active status is Required'),
});

const AddSlide = () => {
  const [isFileDetected, setIsFileDetected] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getslideId = location.pathname.split('/')[3];
  const newslide = useSelector((state) => state.slide);

  const {
    isSuccess,
    isError,
    isLoading,
    createdSlide,
    slideTitle,
    slideOrder,
    slideShow_button,
    slideButton_text,
    slideButton_link,
    slideDescription,
    updatedSlide,
    slideImage,
  } = newslide;

  const onDrop = useCallback(
    (acceptedFiles) => {
      formik.setFieldValue('image', acceptedFiles);
      setIsFileDetected(true);
    }, // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (getslideId !== undefined) {
      dispatch(getAslide(getslideId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getslideId]);

  useEffect(() => {
    if (isSuccess && createdSlide) {
      toast.success('Slide Added Successfully!');
      navigate('/admin/slide-list');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    if (isSuccess && updatedSlide !== undefined) {
      toast.success('Slide Updated Successfully!');
      navigate('/admin/slide-list');
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdSlide,
    slideTitle,
    slideOrder,
    slideShow_button,
    slideButton_text,
    slideButton_link,
    slideDescription,
    updatedSlide,
    slideImage,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: slideTitle || '',
      active: slideTitle ? 1 : 0,
      order: slideOrder || '',
      show_button: slideShow_button ? 1 : 0,
      button_text: slideButton_text || '',
      button_link: slideButton_link || '',
      description: slideDescription || '',
      image: slideImage || null,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getslideId !== undefined) {
        const data = { id: getslideId, slide: values };
        dispatch(updateAslide(data));
      } else {
        dispatch(createAslide(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 1000);
      }
    },
  });

  console.log(newslide.slideOrder);

  return (
    <div>
      <h3 className="mb-4 title">
        {getslideId !== undefined ? 'Edit' : 'Add'} slide
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="my-4">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="active"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value="1"
                  checked={
                    newslide.slideActive ? 1 : 0 || formik.values.active === '1'
                  }
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">Active</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="active"
                  onChange={formik.handleChange}
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
            type="number"
            label="Enter order"
            name="order"
            onCh={formik.handleChange('order')}
            onBl={formik.handleBlur('order')}
            val={formik.values.order}
          />
          <div className="error">
            {formik.touched.order && formik.errors.order}
          </div>
          <CustomInput
            type="text"
            label="Enter title"
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
            label="Enter description"
            name="description"
            onCh={formik.handleChange('description')}
            onBl={formik.handleBlur('description')}
            val={formik.values.description}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <div className="my-4">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="show_button"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value="1"
                  checked={
                    newslide.slideShow_button
                      ? 1
                      : 0 || formik.values.show_button === '1'
                  }
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">Show</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="show_button"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value="0"
                  checked={formik.values.show_button === '0'}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">Hidden</span>
              </label>
            </div>
            <div className="error">
              {formik.touched.show_button && formik.errors.show_button}
            </div>
          </div>
          <CustomInput
            type="text"
            label="Enter button_text"
            name="button_text"
            onCh={formik.handleChange('button_text')}
            onBl={formik.handleBlur('button_text')}
            val={formik.values.button_text}
          />
          <div className="error">
            {formik.touched.button_text && formik.errors.button_text}
          </div>
          <CustomInput
            type="text"
            label="Enter button_link"
            name="button_link"
            onCh={formik.handleChange('button_link')}
            onBl={formik.handleBlur('button_link')}
            val={formik.values.button_link}
          />
          <div className="error">
            {formik.touched.button_link && formik.errors.button_link}
          </div>
          <div className="">
            <div className="mt-10 text-center">
              <div className="flex justify-space w-full gap-10">
                <div className="mt-10 text-center">
                  <Dropzone onDrop={onDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />

                          <div
                            className={`flex items-center justify-center w-[800px]
                        `}
                          >
                            <label
                              htmlFor="dropzone-file"
                              className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ${
                                isFileDetected
                                  ? 'bg-green-200'
                                  : 'dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100'
                              } dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {isFileDetected ? (
                                  <p className="mb-2 text-sm text-yellow-600 dark:text-yellow-400">
                                    File detected
                                  </p>
                                ) : (
                                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>{' '}
                                    or drag and drop
                                  </p>
                                )}

                                <svg
                                  aria-hidden="true"
                                  className="w-10 h-10 mb-3 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                  ></path>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{' '}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </div>
                              <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  <div className="error">
                    {formik.touched.image && formik.errors.image}
                  </div>
                </div>
                <div className="mt-[70px] w-[200px]">
                  <img
                    src="https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg?w=2000"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getslideId !== undefined ? 'Edit' : 'Add'} slide
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSlide;
