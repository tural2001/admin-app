import React, { useCallback, useEffect, useState } from 'react';
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

let schema = yup.object({
  name: yup.string().required('Brand name is Required'),
  logo: yup.mixed().required('Images is Required'),
  active: yup.string().required('Required'),
});

const AddPartner = () => {
  const [isFileDetected, setIsFileDetected] = useState(false);
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

  const onDrop = useCallback(
    (acceptedFiles) => {
      formik.setFieldValue('logo', acceptedFiles);
      setIsFileDetected(true);
    }, // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (isSuccess && createdPartner) {
      toast.success('Partner Added Successfully!');
      navigate('/admin/partner-list');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    if (isSuccess && updatedPartner) {
      toast.success('Partner Updated Successfully!');
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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: partnerName || '',
      logo: typeof partnerLogo === 'string' ? partnerLogo : null,
      active: partnerActive ? 1 : 0,
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
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getPartnerId !== undefined ? 'Edit' : 'Add'} Partner
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['name', 'logo', 'active'];
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
                    newPartner.partnerActive
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
                {formik.touched.logo && formik.errors.logo}
              </div>
            </div>
            <div className="mt-[90px]">
              <img
                src="https://azeronline.netlify.app/static/media/blog2.891d84e7b5ab348201fd.png"
                alt=""
                width={250}
                height={50}
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getPartnerId !== undefined ? 'Edit' : 'Add'} partner
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPartner;
