/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetState } from '../features/reviews/reviewsSlice';
import {
  createAreview,
  getAreview,
  updateAreview,
} from '../features/reviews/reviewsSlice';
import Dropzone from 'react-dropzone';
import { uploadImg } from '../features/upload/uploadSlice';
import { language } from '../Language/languages';
import { useTranslation } from '../components/TranslationContext';
import { debounce } from 'lodash';

const Addreview = () => {
  const { translate, Language } = useTranslation();

  let schema = yup.object({
    reviewer_name: yup.object().shape(
      language.reduce(
        (acc, lang) => ({
          ...acc,
          az: yup.string().required(`${translate('Required_Fill', Language)}`),
        }),
        {}
      )
    ),
    comment: yup.object().shape(
      language.reduce(
        (acc, lang) => ({
          ...acc,
          az: yup.string().required(`${translate('Required_Fill', Language)}`),
        }),
        {}
      )
    ),
    reviewer_image: yup
      .mixed()
      .required(`${translate('Required_Fill', Language)}`),
    active: yup.string(),
  });
  const [selectedLanguage1, setSelectedLanguage1] = useState('az');
  const [selectedLanguage2, setSelectedLanguage2] = useState('az');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isFileDetected, setIsFileDetected] = useState(false);
  const getReviewId = location.pathname.split('/')[3];
  const newReview = useSelector((state) => state.reviews);
  const {
    isSuccess,
    isError,
    createdReview,
    reviewActive,
    ReviewData,
    reviewReviewer_image,
    updatedReview,
  } = newReview;

  const onDrop = useCallback((acceptedFiles) => {
    formik.setFieldValue('reviewer_image', acceptedFiles);
    dispatch(uploadImg(acceptedFiles));
    setIsFileDetected(true);
  }, []);
  const imageState = useSelector((state) => state.upload.images.url);

  const debouncedApiCalls = useCallback(
    debounce(() => {
      if (getReviewId !== undefined) {
        language.forEach((selectedLanguage) => {
          dispatch(getAreview(getReviewId, selectedLanguage));
        });
      } else {
        dispatch(resetState());
      }
    }, 500),
    [getReviewId, dispatch]
  );

  useEffect(() => {
    debouncedApiCalls();
  }, [debouncedApiCalls]);

  const prevUpdatedReviewfRef = useRef();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const prevUpdatedReview = prevUpdatedReviewfRef.current;
    if (
      isSuccess &&
      updatedReview !== undefined &&
      updatedReview !== prevUpdatedReview
    ) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        toast.success(`${translate('Updated', Language)}`);
        prevUpdatedReviewfRef.current = updatedReview;
        navigate('/admin/review-list');
      }, 1000);
    }
    if (
      isSuccess &&
      createdReview !== undefined &&
      updatedReview !== undefined
    ) {
      toast.success(`${translate('Added', Language)}`);
      navigate('/admin/review-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isError) {
      toast.error(`${translate('Wrong', Language)}`);
    }
  }, [isSuccess, isError, createdReview, updatedReview, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      reviewer_name: language.reduce((acc, lang) => {
        acc[lang] = ReviewData
          ? ReviewData[lang]?.data?.reviewer_name || ''
          : '';
        return acc;
      }, {}),
      comment: language.reduce((acc, lang) => {
        acc[lang] = ReviewData ? ReviewData[lang]?.data?.comment || '' : '';
        return acc;
      }, {}),

      reviewer_image: reviewReviewer_image || null,
      active: reviewActive ? 1 : 0,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      const updatedLanguages = language.filter(
        (lang) => values.reviewer_name[lang]
      );
      console.log(updatedLanguages);
      if (getReviewId !== undefined) {
        updatedLanguages.forEach((lang) => {
          const data = {
            id: getReviewId,
            reviewData: {
              reviewer_name: values.reviewer_name[lang],
              comment: values.comment[lang],
              reviewer_image: values.reviewer_image,
              active: values.active === 1 ? 1 : 0,
            },
            selectedLanguage: lang,
          };
          dispatch(updateAreview(data));
        });
      } else {
        if (updatedLanguages.length > 0) {
          const firstLang = updatedLanguages[0];
          const createData = {
            values: {
              reviewer_name: values.reviewer_name[firstLang],
              comment: values.comment[firstLang],
              reviewer_image: values.reviewer_image,
              active: values.active === 1 ? 1 : 0,
            },
            selectedLanguage: firstLang,
          };
          dispatch(createAreview(createData))
            .then((createdReview) => {
              console.log(createdReview);

              updatedLanguages.slice(1).forEach((lang) => {
                const updateData = {
                  id: createdReview.payload.id,
                  reviewData: {
                    reviewer_name: values.reviewer_name[lang],
                    comment: values.comment[lang],
                    reviewer_image: values.reviewer_image,
                    active: values.active === 1 ? 1 : 0,
                  },
                  selectedLanguage: lang,
                };

                dispatch(updateAreview(updateData));
              });

              formik.resetForm();
              setTimeout(() => {
                dispatch(resetState());
              }, 300);
            })
            .catch((error) => {
              console.error('Error creating Tariff:', error);
            });
        }
      }
    },
  });

  useEffect(() => {
    if (getReviewId === undefined) {
      formik.setFieldValue('active', 1);
    } else {
      formik.setFieldValue('active', newReview.reviewActive ? 1 : 0);
    }
  }, [getReviewId, newReview.reviewActive]);

  const handleLanguageClick1 = (language) => {
    setSelectedLanguage1(language);
  };

  const handleLanguageClick2 = (language) => {
    setSelectedLanguage2(language);
  };

  return (
    <div>
      <h3 className="mb-4 title">
        {getReviewId !== undefined
          ? `${translate('Edit_Review', Language)}`
          : `${translate('Add_Review', Language)}`}{' '}
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = [
              'reviewer_name',
              'comment',
              'reviewer_image',
            ];
            const errors = {};
            requiredFields.forEach((fieldName) => {
              if (formik.touched[fieldName] && !formik.values[fieldName]) {
                errors[fieldName] = 'This field is Required';
              }
            });

            language.forEach((lang) => {
              const nameFieldName = `reviewer_name.${lang}`;
              const commentFieldName = `comment.${lang}`;

              if (
                formik.touched.reviewer_name &&
                !formik.values.reviewer_name[lang]
              ) {
                errors[nameFieldName] = `Name for ${lang} is Required`;
              }

              if (formik.touched.comment && !formik.values.comment[lang]) {
                errors[commentFieldName] = `Comment for ${lang} is Required`;
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
          <div className="error">
            {formik.touched.active && formik.errors.active}
          </div>
          <label htmlFor="" className="mt-2">
            {translate('Name', Language)}
          </label>
          <div className="flex">
            {language.map((lang, index) => (
              <label
                key={lang}
                className={`cursor-pointer capitalize border-[1px] border-[#5e3989]  rounded-t-lg px-5 ${
                  lang === selectedLanguage1 ? 'font-bold' : ''
                }`}
                onClick={() => handleLanguageClick1(lang)}
              >
                {lang}
              </label>
            ))}
          </div>
          {language.map((lang, index) => {
            return (
              <div
                key={lang}
                className={lang === selectedLanguage1 ? '' : 'hidden'}
              >
                {' '}
                <CustomInput
                  type="text"
                  name={`reviewer_name.${lang}`}
                  onCh={formik.handleChange}
                  onBl={formik.handleBlur}
                  val={formik.values.reviewer_name[lang]}
                />
                {formik.touched.reviewer_name &&
                  formik.errors.reviewer_name && (
                    <div className="error" key={`${lang}-error`}>
                      {formik.errors.reviewer_name[lang]}
                    </div>
                  )}
              </div>
            );
          })}
          <label htmlFor="" className="mt-2">
            {translate('Comment', Language)}
          </label>
          <div className="flex">
            {language.map((lang, index) => (
              <label
                key={lang}
                className={`cursor-pointer capitalize border-[1px] border-[#5e3989]  rounded-t-lg px-5 ${
                  lang === selectedLanguage2 ? 'font-bold' : ''
                }`}
                onClick={() => handleLanguageClick2(lang)}
              >
                {lang}
              </label>
            ))}
          </div>
          {language.map((lang) => {
            return (
              <div
                key={lang}
                className={lang === selectedLanguage2 ? '' : 'hidden'}
              >
                <CustomInput
                  type="text"
                  name={`comment.${lang}`}
                  onCh={formik.handleChange}
                  onBl={formik.handleBlur}
                  val={formik.values.comment[lang]}
                />
                {formik.touched.comment && formik.errors.comment && (
                  <div className="error" key={lang}>
                    {formik.errors.comment[lang]}
                  </div>
                )}
              </div>
            );
          })}
          <label htmlFor="" className="mt-2">
            {translate('Image', Language)}
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
                    {formik.touched.reviewer_image &&
                      formik.errors.reviewer_image}
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <img
                    src={
                      imageState
                        ? imageState
                        : '' || reviewReviewer_image
                        ? reviewReviewer_image
                        : ''
                    }
                    alt=""
                    className="w-[300px] h-[200px] object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getReviewId !== undefined
              ? `${translate('Edit', Language)}`
              : `${translate('Add', Language)}`}{' '}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addreview;
