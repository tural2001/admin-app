import React, { useCallback, useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';

import {
  createApayment,
  getApayment,
  resetState,
  updateApayment,
} from '../features/payments/paymentsSlice';

let schema = yup.object({
  name: yup.string().required('Name s is Required'),
  meta_title: yup.string(),
  meta_description: yup.string(),
  description: yup.string().required('Description is Required'),
  redirect_link: yup.string().required('Link is Required'),
  image: yup.mixed().required('Icon is Required'),
  active: yup.string().required('Active status is Required'),
});

const AddPayment = () => {
  const [isFileDetected, setIsFileDetected] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getPaymentId = location.pathname.split('/')[3];
  const newPayment = useSelector((state) => state.payment);

  const {
    isSuccess,
    isError,
    isLoading,
    createdPayment,
    paymentName,
    paymentActive,
    paymentDescription,
    paymentRedirect_link,
    paymentImage,
    updatedPayment,
    paymentMeta_title,
    paymentMeta_description,
  } = newPayment;

  const onDrop = useCallback(
    (acceptedFiles) => {
      formik.setFieldValue('image', acceptedFiles);
      setIsFileDetected(true);
    }, // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (getPaymentId !== undefined) {
      dispatch(getApayment(getPaymentId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getPaymentId]);

  useEffect(() => {
    if (isSuccess && createdPayment) {
      toast.success('Payment Added Successfully!');
      navigate('/admin/payment-list');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    if (isSuccess && updatedPayment !== undefined) {
      toast.success('Payment Updated Successfully!');
      navigate('/admin/payment-list');
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdPayment,
    paymentName,
    paymentActive,
    paymentDescription,
    paymentRedirect_link,
    paymentMeta_title,
    paymentMeta_description,
    paymentImage,
    updatedPayment,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: paymentName || '',
      meta_title: paymentMeta_title || '',
      meta_description: paymentMeta_description || '',
      active: paymentActive ? 1 : 0,
      description: paymentDescription || '',
      redirect_link: paymentRedirect_link || '',
      image: paymentImage || null,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getPaymentId !== undefined) {
        const data = { id: getPaymentId, payment: values };
        dispatch(updateApayment(data));
      } else {
        dispatch(createApayment(values));
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
        {getPaymentId !== undefined ? 'Edit' : 'Add'} Payment
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = [
              'name',
              'description',
              'redirect_link',
              'image',
              'active',
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
                    newPayment.paymentActive
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
          <CustomInput
            type="text"
            label="Enter meta_title"
            name="meta_title"
            onCh={formik.handleChange('meta_title')}
            onBl={formik.handleBlur('meta_title')}
            val={formik.values.meta_title}
          />
          <div className="error">
            {formik.touched.meta_title && formik.errors.meta_title}
          </div>
          <CustomInput
            type="text"
            label="Enter meta_description"
            name="meta_description"
            onCh={formik.handleChange('meta_description')}
            onBl={formik.handleBlur('meta_description')}
            val={formik.values.meta_description}
          />
          <div className="error">
            {formik.touched.meta_description && formik.errors.meta_description}
          </div>
          <CustomInput
            type="text"
            label="Enter name"
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
            label="Enter redirect_link"
            name="redirect_link"
            onCh={formik.handleChange('redirect_link')}
            onBl={formik.handleBlur('redirect_link')}
            val={formik.values.redirect_link}
          />
          <div className="error">
            {formik.touched.redirect_link && formik.errors.redirect_link}
          </div>
          <div className="">
            <div className="text-center">
              <div className="flex justify-space w-full gap-10">
                <div className="mt-4 text-center">
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
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getPaymentId !== undefined ? 'Edit' : 'Add'} payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPayment;
