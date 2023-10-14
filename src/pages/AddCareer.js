/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import {
  createAcareer,
  getAcareer,
  resetState,
  updateAcareer,
} from '../features/career/careerSlice';
import { uploadImg } from '../features/upload/uploadSlice';
import { useTranslation } from '../components/TranslationContext';

const AddCareer = () => {
  const { translate, Language } = useTranslation();

  let schema = yup.object({
    name: yup.string(),
    email: yup.string(),
    phone: yup.string(),
    notes: yup.string(),
    vacancy_name: yup
      .string()
      .required(`${translate('Required_Fill', Language)}`),
    cv: yup.mixed().required(`${translate('Required_Fill', Language)}`),
  });

  const [isFileDetected, setIsFileDetected] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getcareerId = location.pathname.split('/')[3];
  const newcareer = useSelector((state) => state.career);

  const {
    isSuccess,
    isError,
    isLoading,
    createdcareer,
    careerName,
    careerPhone,
    careerEmail,
    careerCv,
    careerNotes,
    careerVancancy,
    updatedcareer,
  } = newcareer;

  const onDrop = useCallback((acceptedFiles) => {
    formik.setFieldValue('cv', acceptedFiles);
    dispatch(uploadImg(acceptedFiles));
    setIsFileDetected(true);
  }, []);

  useEffect(() => {
    if (getcareerId !== undefined) {
      dispatch(getAcareer(getcareerId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getcareerId]);
  const prevUpdatedCareerRef = useRef();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const prevUpdatedFaq = prevUpdatedCareerRef.current;
    if (
      isSuccess &&
      updatedcareer !== undefined &&
      updatedcareer !== prevUpdatedFaq
    ) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        toast.success(`${translate('Updated', Language)}`);
        prevUpdatedCareerRef.current = updatedcareer;
        navigate('/admin/career-list');
      }, 1000);
    }

    if (isError) {
      toast.error(`${translate('Wrong', Language)}`);
    }
  }, [isSuccess, isError, updatedcareer]);
  useEffect(() => {
    if (
      isSuccess &&
      createdcareer !== undefined &&
      updatedcareer !== undefined
    ) {
      toast.success(`${translate('Added', Language)}`);
      navigate('/admin/career-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isSuccess && createdcareer !== undefined) {
      toast.success(`${translate('Added', Language)}`);
      navigate('/admin/faq-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isError) {
      toast.error(`${translate('Wrong', Language)}`);
    }
  }, [isSuccess, isError, isLoading, createdcareer, updatedcareer, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: careerName || '',
      phone: careerPhone || '',
      email: careerEmail || '',
      notes: careerNotes || '',
      vacancy_name: careerVancancy || '',
      cv: careerCv || null,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getcareerId !== undefined) {
        const data = { id: getcareerId, career: values };
        dispatch(updateAcareer(data));
      } else {
        dispatch(createAcareer(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 1000);
      }
    },
  });

  useEffect(() => {
    if (getcareerId === undefined) {
      formik.setFieldValue('active', 1);
    } else {
      formik.setFieldValue('active', newcareer.campaignActive ? 1 : 0);
    }
  }, [getcareerId, newcareer.campaignActive]);

  return (
    <div>
      <h3 className="mb-4 title">
        {getcareerId !== undefined
          ? `${translate('Edit_Career', Language)}`
          : `${translate('Add_Career', Language)}`}
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['cv', 'vacancy_name'];
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
          {' '}
          <label htmlFor="" className="">
            Status
          </label>
          <div className="my-3">
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
                <span className="ml-2">{translate('Yes', Language)}</span>
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
          <label htmlFor="">{translate('Name', Language)}</label>
          <CustomInput
            type="text"
            label="Enter career name"
            name="name"
            onCh={formik.handleChange('name')}
            onBl={formik.handleBlur('name')}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <label htmlFor="">{translate('Phone', Language)}</label>
          <CustomInput
            type="number"
            label="Enter career Phone"
            name="phone"
            onCh={formik.handleChange('phone')}
            onBl={formik.handleBlur('phone')}
            val={formik.values.phone}
          />
          <div className="error">
            {formik.touched.phone && formik.errors.phone}
          </div>
          <label htmlFor="">{translate('Email', Language)}</label>
          <CustomInput
            type="email"
            label="Enter career email"
            name="email"
            onCh={formik.handleChange('email')}
            onBl={formik.handleBlur('email')}
            val={formik.values.email}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email}
          </div>
          <label htmlFor="" className="my-2">
            {translate('Vacancy_Name', Language)}
          </label>
          <CustomInput
            type="text"
            label="Enter career vacancy name"
            name="vacancy_name"
            onCh={formik.handleChange('vacancy_name')}
            onBl={formik.handleBlur('vacancy_name')}
            val={formik.values.vacancy_name}
          />
          <div className="error">
            {formik.touched.vacancy_name && formik.errors.vacancy_name}
          </div>
          <label htmlFor="" className="my-2">
            {translate('Notes', Language)}
          </label>
          <CustomInput
            type="email"
            label="Enter career Notes"
            name="notes"
            onCh={formik.handleChange('notes')}
            onBl={formik.handleBlur('notes')}
            val={formik.values.notes}
          />
          <div className="error">
            {formik.touched.notes && formik.errors.notes}
          </div>
          <label htmlFor="" className="mt-2">
            {translate('Cv', Language)}
          </label>
          <div className="">
            <div className="text-center">
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
                                    {translate('File_Detected', Language)}{' '}
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
                    {formik.touched.cv && formik.errors.cv}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getcareerId !== undefined
              ? `${translate('Edit_Career', Language)}`
              : `${translate('Add_Career', Language)}`}{' '}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCareer;
