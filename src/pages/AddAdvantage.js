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
  createAadvantage,
  getAadvantage,
  resetState,
  updateAadvantage,
} from '../features/advantages/advantagesSlice';
import { uploadImg } from '../features/upload/uploadSlice';
import { language } from '../Language/languages';
import { useTranslation } from '../components/TranslationContext';

const Addadvantage = () => {
  const { translate, Language } = useTranslation();

  let schema = yup.object({
    title: yup.object().shape(
      language.reduce(
        (acc, lang) => ({
          ...acc,
          az: yup.string().required(`${translate('Required_Fill', Language)}`),
        }),
        {}
      )
    ),
    active: yup.string(),
    icon: yup.mixed().required(`${translate('Required_Fill', Language)}`),
  });
  const [selectedLanguage1, setSelectedLanguage1] = useState('az');
  const [isFileDetected, setIsFileDetected] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getadvantageId = location.pathname.split('/')[3];
  const newadvantage = useSelector((state) => state.advantage);

  const {
    isSuccess,
    isError,
    createdAdvantage,
    AdData,
    advantageActive,
    AdIcon,
    updatedAdvantage,
  } = newadvantage;

  const onDrop = useCallback((acceptedFiles) => {
    formik.setFieldValue('icon', acceptedFiles);
    dispatch(uploadImg(acceptedFiles));
    setIsFileDetected(true);
  }, []);
  const imageState = useSelector((state) => state?.upload?.images?.url);

  useEffect(() => {
    if (getadvantageId !== undefined) {
      language.forEach((selectedLanguage) => {
        dispatch(getAadvantage(getadvantageId, selectedLanguage));
      });
    } else {
      dispatch(resetState());
    }
  }, [getadvantageId]);

  const prevUpdatedAdvantageRef = useRef();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const prevUpdatedAdvantage = prevUpdatedAdvantageRef.current;
    if (
      isSuccess &&
      updatedAdvantage !== undefined &&
      updatedAdvantage !== prevUpdatedAdvantage
    ) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        toast.success(`${translate('Updated', Language)}`);
        prevUpdatedAdvantageRef.current = updatedAdvantage;
        navigate('/admin/advantage-list');
      }, 1000);
    }
    if (
      isSuccess &&
      createdAdvantage !== undefined &&
      updatedAdvantage !== undefined
    ) {
      toast.success(`${translate('Added', Language)}`);
      navigate('/admin/advantage-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isError) {
      toast.error(`${translate('Wrong', Language)}`);
    }
  }, [isSuccess, isError, createdAdvantage, updatedAdvantage, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: language.reduce((acc, lang) => {
        acc[lang] = AdData ? AdData[lang]?.data?.title || '' : '';
        return acc;
      }, {}),
      active: advantageActive ? 1 : 0,
      icon: AdIcon || null,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      const updatedLanguages = language.filter((lang) => values.title[lang]);
      console.log(updatedLanguages);
      if (getadvantageId !== undefined) {
        updatedLanguages.forEach((lang) => {
          const data = {
            id: getadvantageId,
            advantageData: {
              title: values.title[lang],
              active: values.active === 1 ? 1 : 0,
              icon: values.icon,
            },
            selectedLanguage: lang,
          };
          dispatch(updateAadvantage(data));
        });
      } else {
        if (updatedLanguages.length > 0) {
          const firstLang = updatedLanguages[0];
          const createData = {
            values: {
              title: values.title[firstLang],
              active: values.active === 1 ? 1 : 0,
              icon: values.icon,
            },
            selectedLanguage: firstLang,
          };
          dispatch(createAadvantage(createData))
            .then((createdAdvantage) => {
              console.log(createdAdvantage);

              updatedLanguages.slice(1).forEach((lang) => {
                const updateData = {
                  id: createdAdvantage.payload.id,
                  advantageData: {
                    title: values.title[lang],
                    active: values.active === 1 ? 1 : 0,
                    icon: values.icon,
                  },
                  selectedLanguage: lang,
                };

                dispatch(updateAadvantage(updateData));
              });

              formik.resetForm();
              setTimeout(() => {
                dispatch(resetState());
              }, 300);
            })
            .catch((error) => {
              console.error('Error creating Advantage:', error);
            });
        }
      }
    },
  });

  useEffect(() => {
    if (getadvantageId === undefined) {
      formik.setFieldValue('active', 1);
    } else {
      formik.setFieldValue('active', newadvantage.advantageActive ? 1 : 0);
    }
  }, [getadvantageId, newadvantage.advantageActive]);

  const handleLanguageClick1 = (language) => {
    setSelectedLanguage1(language);
  };
  console.log(AdIcon);
  return (
    <div>
      <h3 className="mb-4 title">
        {getadvantageId !== undefined
          ? `${translate('Edit_Advantage', Language)}`
          : `${translate('Add_Advantage', language)}`}
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['title', 'icon'];
            const errors = {};
            requiredFields.forEach((fieldName) => {
              if (formik.touched[fieldName] && !formik.values[fieldName]) {
                errors[fieldName] = 'This field is Required';
              }
            });

            language.forEach((lang) => {
              const titleFieldName = `title.${lang}`;

              if (formik.touched.title && !formik.values.title[lang]) {
                errors[titleFieldName] = `Title for ${lang} is Required`;
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
                <span className="ml-2"> {translate('No', Language)}</span>
              </label>
            </div>
          </div>
          <label htmlFor="" className="mt-1">
            {translate('Title', Language)}
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
                  name={`title.${lang}`}
                  onCh={formik.handleChange}
                  onBl={formik.handleBlur}
                  val={formik.values.title[lang]}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="error" key={`${lang}-error`}>
                    {formik.errors.title[lang]}
                  </div>
                )}
              </div>
            );
          })}
          <label htmlFor="" className="mt-2">
            {translate('Icon', Language)}
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
                            className={`flex items-center justify-center w-[800px]`}
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
                    {formik.touched.image && formik.errors.image}
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <img
                    src={imageState ? imageState : '' || AdIcon ? AdIcon : ''}
                    className="w-[300px] h-[200px] object-contain"
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
            {getadvantageId !== undefined
              ? `${translate('Edit', Language)}`
              : `${translate('Add', language)}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addadvantage;
