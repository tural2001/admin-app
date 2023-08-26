import React, { useCallback, useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  createApopup,
  getApopup,
  resetState,
  updateApopup,
} from '../features/popup/popupSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';

let schema = yup.object({
  content: yup.string().required('Brand s is Required'),
  handle: yup.string().required('Brand namse is Required'),
  image: yup.array().required('Brand namswe is Required'),
  active: yup.string().required('Brand nawsme is Required'),
});

const Addpopup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getPopupId = location.pathname.split('/')[3];
  const newPopup = useSelector((state) => state.popup);
  const {
    isSuccess,
    isError,
    isLoading,
    createdPopup,
    popupContent,
    popupActive,
    popupHandle,
    popupImage,
    updatedPopup,
  } = newPopup;

  const onDrop = useCallback((acceptedFiles) => {
    formik.setFieldValue('image', acceptedFiles);
  }, []);

  useEffect(() => {
    if (getPopupId !== undefined) {
      dispatch(getApopup(getPopupId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getPopupId]);

  useEffect(() => {
    if (isSuccess && createdPopup) {
      toast.success('Brand Added Successfully!');
      navigate('/admin/popup-list');
      setTimeout(() => {
        window.location.reload();
      }, 10);
    }
    if (isSuccess && updatedPopup !== undefined) {
      toast.success('Brand Updated Successfully!');
      navigate('/admin/popup-list');
      setTimeout(() => {
        window.location.reload();
      }, 10);
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdPopup,
    popupContent,
    popupActive,
    popupHandle,
    popupImage,
    updatedPopup,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      content: popupContent || '',
      active: popupActive ? 1 : 0,
      handle: popupHandle || '',
      image: popupImage || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getPopupId !== undefined) {
        const data = { id: getPopupId, popup: values };
        console.log(data);
        dispatch(updateApopup(data));
      } else {
        dispatch(createApopup(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 1000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getPopupId !== undefined ? 'Edit' : 'Add'} Popup
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter"
            name="content"
            onCh={formik.handleChange('content')}
            onBl={formik.handleBlur('content')}
            val={formik.values.content}
            id="content"
          />
          <div className="error">
            {formik.touched.content && formik.errors.content}
          </div>
          <CustomInput
            type="text"
            label="Enter Coupon Name"
            name="handle"
            onCh={formik.handleChange('handle')}
            onBl={formik.handleBlur('handle')}
            val={formik.values.handle}
          />
          <div className="error">
            {formik.touched.handle && formik.errors.handle}
          </div>

          <div className="">
            <div className="mt-10 text-center">
              <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />

                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
            </div>
          </div>

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
                    newPopup.popupActive ? 1 : 0 || formik.values.active === '1'
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

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getPopupId !== undefined ? 'Edit' : 'Add'} Popup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addpopup;
