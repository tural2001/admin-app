import React, { useCallback, useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Dropzone from 'react-dropzone';

import { useLocation, useNavigate } from 'react-router-dom';
import {
  createApartner,
  getApartner,
  resetState,
  updateApartner,
} from '../features/partners/partnersSlice';
import { uploadImg } from '../features/upload/uploadSlice';
import { config } from '../utils/axiosconfig';

let schema = yup.object({
  name: yup.string().required('Brand name is Required'),
  logo: yup.array().required('Images is Required'),
  active: yup.string().required('Required'),
});

const AddPartner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getPartnerId = location.pathname.split('/')[3];

  const newPartner = useSelector((state) => state.partner);

  const {
    isSuccess,
    isError,
    isLoading,
    createdPartner,
    partnerName,
    partnerLogo,
    partnerActive,
    updatedPartner,
  } = newPartner;

  useEffect(() => {
    if (getPartnerId !== undefined) {
      dispatch(getApartner(getPartnerId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getPartnerId]);

  const onDrop = useCallback((acceptedFiles) => {
    formik.setFieldValue('logo', acceptedFiles);
  }, []);

  useEffect(() => {
    if (isSuccess && createdPartner) {
      toast.success('Coupon Added Successfully!');
    }
    if (isSuccess && updatedPartner) {
      toast.success('Coupon Updated Successfully!');
      navigate('/admin/partner-list');
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdPartner,
    partnerName,
    partnerLogo,
    partnerActive,
    updatedPartner,
    navigate,
  ]);
  // const onSubmit = async (values) => {
  //   const apiUrl =
  //     getPartnerId !== undefined
  //       ? `http://127.0.0.1:8000/api/partners/${getPartnerId}`
  //       : 'http://127.0.0.1:8000/api/partners';

  //   const formdata = new FormData();
  //   if (getPartnerId !== undefined) {
  //     formdata.append('_method', 'PUT');
  //   }
  //   formdata.append('active', values.active);
  //   formdata.append('logo', values.logo[0]);
  //   formdata.append('name', values.name);

  //   const requestOptions = {
  //     method: 'POST',
  //     headers: { ...config.headers },
  //     body: formdata,
  //     redirect: 'follow',
  //   };

  //   try {
  //     const response = await fetch(apiUrl, requestOptions);
  //     const result = await response.text();
  //     console.log(result);

  //     if (response.ok) {
  //       if (getPartnerId !== undefined) {
  //         toast.success('Coupon Updated Successfully!');
  //         navigate('/admin/partner-list');
  //       } else {
  //         toast.success('Coupon Added Successfully!');
  //         formik.resetForm();
  //         setTimeout(() => {
  //           dispatch(resetState());
  //         }, 300);
  //       }
  //     } else {
  //       toast.error('Something Went Wrong!');
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //     toast.error('Something Went Wrong!');
  //   }
  // };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: partnerName || '',
      logo: partnerLogo || '',
      active: partnerActive || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getPartnerId !== undefined) {
        const data = { id: getPartnerId, partner: values };
        console.log(data);
        dispatch(updateApartner(data));
      } else {
        dispatch(createApartner(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },

    // onSubmit: onSubmit,
  });

  const partnerState = useSelector((state) => state.partner?.partners?.data);
  console.log(partnerState);

  return (
    <div>
      <h3 className="mb-4 title">
        {getPartnerId !== undefined ? 'Edit' : 'Add'} Partner
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Coupon Name"
            name="name"
            onCh={formik.handleChange('name')}
            onBl={formik.handleBlur('name')}
            val={formik.values.name}
            id="coupon"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
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
                  checked={formik.values.active === '1'}
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
            {getPartnerId !== undefined ? 'Edit' : 'Add'} Partner
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPartner;
