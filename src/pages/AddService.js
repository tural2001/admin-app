import React, { useCallback, useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import {
  createAservice,
  getAservice,
  getservices,
  resetState,
  updateAservice,
} from '../features/services/servicesSlice';

let schema = yup.object({
  title: yup.string().required('Brand s is Required'),
  description: yup.string().required('Brand namse is Required'),
  link: yup.string().required('Brand nawsme is Required'),
  icon: yup.array().required('Brand namswe is Required'),
  active: yup.string().required('Brand nawsme is Required'),
});

const AddService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getServiceId = location.pathname.split('/')[3];
  const newService = useSelector((state) => state.service);

  const {
    isSuccess,
    isError,
    isLoading,
    createdService,
    serviceTitle,
    serviceActive,
    serviceDescription,
    serviceLink,
    serviceIcon,
    updatedService,
  } = newService;

  const onDrop = useCallback((acceptedFiles) => {
    formik.setFieldValue('icon', acceptedFiles);
  }, []);

  useEffect(() => {
    if (getServiceId !== undefined) {
      dispatch(getAservice(getServiceId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getServiceId]);

  useEffect(() => {
    if (isSuccess && createdService) {
      toast.success('Service Added Successfully!');
      navigate('/admin/service-list');
      setTimeout(() => {
        window.location.reload();
      }, 10);
    }
    if (isSuccess && updatedService !== undefined) {
      toast.success('Service Updated Successfully!');
      navigate('/admin/service-list');
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
    createdService,
    serviceTitle,
    serviceActive,
    serviceDescription,
    serviceLink,
    serviceIcon,
    updatedService,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: serviceTitle || '',
      active: serviceActive ? 1 : 0,
      description: serviceDescription || '',
      link: serviceLink || '',
      icon: serviceIcon || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getServiceId !== undefined) {
        const data = { id: getServiceId, service: values };
        dispatch(updateAservice(data));
      } else {
        dispatch(createAservice(values));
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
        {getServiceId !== undefined ? 'Edit' : 'Add'} Service
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
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
          <CustomInput
            type="text"
            label="Enter link"
            name="link"
            onCh={formik.handleChange('link')}
            onBl={formik.handleBlur('link')}
            val={formik.values.link}
          />
          <div className="error">
            {formik.touched.link && formik.errors.link}
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
                    newService.serviceActive
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
            {getServiceId !== undefined ? 'Edit' : 'Add'} Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
