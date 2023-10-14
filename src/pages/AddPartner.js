/* eslint-disable react-hooks/exhaustive-deps */
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
import { uploadImg } from '../features/upload/uploadSlice';
import { useTranslation } from '../components/TranslationContext';

const AddPartner = () => {
  const { translate, Language } = useTranslation();

  let schema = yup.object({
    name: yup.string().required(`${translate('Required_Fill', Language)}`),
    logo: yup.mixed().required(`${translate('Required_Fill', Language)}`),
    active: yup.string(),
  });
  const [isFileDetected, setIsFileDetected] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getPartnerId = location.pathname.split('/')[3];
  const newPartner = useSelector((state) => state.partner);

  const {
    isSuccess,
    isError,
    createdPartner,
    PartnerName,
    partnerLogo,
    partnerActive,
    updatedPartner,
  } = newPartner;

  const onDrop = useCallback(
    (acceptedFiles) => {
      formik.setFieldValue('logo', acceptedFiles);
      dispatch(uploadImg(acceptedFiles));
      setIsFileDetected(true);
    }, // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
    []
  );
  const imageState = useSelector((state) => state.upload.images.url);

  useEffect(() => {
    if (getPartnerId !== undefined) {
      dispatch(getApartner(getPartnerId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getPartnerId]);

  useEffect(() => {
    if (isSuccess && createdPartner !== undefined) {
      toast.success(`${translate('Added', Language)}`);
      navigate('/admin/partner-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isSuccess && updatedPartner !== undefined) {
      toast.success(`${translate('Updated', Language)}`);
      navigate('/admin/partner-list');
    }
    if (isError) {
      toast.error(`${translate('Wrong', Language)}`);
    }
  }, [
    isSuccess,
    isError,
    isSuccess,
    isError,
    createdPartner,
    PartnerName,
    partnerLogo,
    partnerActive,
    updatedPartner,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: PartnerName || '',
      logo: partnerLogo || null,
      active: partnerActive ? 1 : 0,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getPartnerId !== undefined) {
        const data = { id: getPartnerId, partnerData: values };
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

  useEffect(() => {
    if (getPartnerId === undefined) {
      formik.setFieldValue('active', 1);
    } else {
      formik.setFieldValue('active', newPartner.partnerActive ? 1 : 0);
    }
  }, [getPartnerId, newPartner.partnerActive]);

  return (
    <div>
      <h3 className="mb-4 title">
        {getPartnerId !== undefined
          ? `${translate('Edit_Partner', Language)}`
          : `${translate('Add_Partner', Language)}`}{' '}
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['logo', 'name'];
            const errors = {};
            requiredFields.forEach((fieldName) => {
              if (formik.touched[fieldName] && !formik.values[fieldName]) {
                errors[fieldName] = 'This field is Required';
              }
            });

            if (Object.keys(errors).length > 0) {
              toast.error(`${translate('Fill', Language)}`);
              return;
            }

            formik.handleSubmit(e);
          }}
        >
          <label htmlFor="" className="mt-2">
            {translate('Status', Language)}
          </label>
          <div className="my-2">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="active"
                  onChange={() => formik.setFieldValue('active', 1)}
                  onBlur={formik.handleBlur}
                  value={1}
                  checked={formik.values.active === 1}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2"> {translate('Yes', Language)}</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="active"
                  onChange={() => formik.setFieldValue('active', 0)}
                  onBlur={formik.handleBlur}
                  value={0}
                  checked={formik.values.active === 0}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">{translate('No', Language)}</span>
              </label>
            </div>
          </div>
          <div className="error">
            {formik.touched.active && formik.errors.active}
          </div>
          <label htmlFor="" className="mt-1">
            {translate('Name', Language)}
          </label>
          <CustomInput
            type="text"
            name={`name`}
            onCh={formik.handleChange('name')}
            onBl={formik.handleBlur('name')}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <label htmlFor="" className="mt-3">
            {translate('Logo', Language)}
          </label>
          <div className="flex justify-space w-full gap-10">
            <div className="mt-2 text-center">
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
                                {translate('File_Detected', Language)}
                              </p>
                            ) : (
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                {translate('Image_Drop', Language)}
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
            <div className="flex justify-center items-center">
              <img
                src={
                  imageState ? imageState : '' || partnerLogo ? partnerLogo : ''
                }
                alt=""
                className="w-[300px] h-[200px] object-contain"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getPartnerId !== undefined
              ? `${translate('Edit', Language)}`
              : `${translate('Add', Language)}`}{' '}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPartner;
