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
  createAourvalue,
  getAourvalue,
  resetState,
  updateAourvalue,
} from '../features/ourvalues/OurValuesSlice';
import { uploadImg } from '../features/upload/uploadSlice';
import { language } from '../Language/languages';
import { useTranslation } from '../components/TranslationContext';
import { debounce } from 'lodash';

const AddOurValue = () => {
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
    description: yup.object().shape(
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
  const [selectedLanguage2, setSelectedLanguage2] = useState('az');
  const [isFileDetected, setIsFileDetected] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getourvalueId = location.pathname.split('/')[3];
  const newourvalue = useSelector((state) => state.ourvalue);

  const {
    isSuccess,
    isError,
    createdOurvalue,
    ourvalueActive,
    OurvalueData,
    ourvalueIcon,
    updatedOurvalue,
  } = newourvalue;

  const onDrop = useCallback((acceptedFiles) => {
    formik.setFieldValue('icon', acceptedFiles);
    dispatch(uploadImg(acceptedFiles));
    setIsFileDetected(true);
  }, []);
  const imageState = useSelector((state) => state.upload.images.url);

  const debouncedApiCalls = useCallback(
    debounce(() => {
      if (getourvalueId !== undefined) {
        language.forEach((selectedLanguage) => {
          dispatch(getAourvalue(getourvalueId, selectedLanguage));
        });
      } else {
        dispatch(resetState());
      }
    }, 500),
    [getourvalueId, language, dispatch]
  );

  useEffect(() => {
    debouncedApiCalls();
  }, [debouncedApiCalls]);

  const prevUpdatedOurvalueRef = useRef();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const prevUpdatedOurvalue = prevUpdatedOurvalueRef.current;
    if (
      isSuccess &&
      updatedOurvalue !== undefined &&
      updatedOurvalue !== prevUpdatedOurvalue
    ) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        toast.success(`${translate('Updated', Language)}`);
        prevUpdatedOurvalueRef.current = updatedOurvalue;
        navigate('/admin/our-value-list');
      }, 1000);
    }
    if (
      isSuccess &&
      createdOurvalue !== undefined &&
      updatedOurvalue !== undefined
    ) {
      toast.success(`${translate('Added', Language)}`);
      navigate('/admin/our-value-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isError) {
      toast.error(`${translate('Wrong', Language)}`);
    }
  }, [isSuccess, isError, createAourvalue, updatedOurvalue, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: language.reduce((acc, lang) => {
        acc[lang] = OurvalueData ? OurvalueData[lang]?.data?.title || '' : '';
        return acc;
      }, {}),
      description: language.reduce((acc, lang) => {
        acc[lang] = OurvalueData
          ? OurvalueData[lang]?.data?.description || ''
          : '';
        return acc;
      }, {}),
      active: ourvalueActive ? 1 : 0,
      icon: ourvalueIcon || null,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      const updatedLanguages = language.filter((lang) => values.title[lang]);
      console.log(updatedLanguages);
      if (getourvalueId !== undefined) {
        updatedLanguages.forEach((lang) => {
          const data = {
            id: getourvalueId,
            ourvalueData: {
              title: values.title[lang],
              description: values.description[lang],
              icon: values.icon,
              active: values.active === 1 ? 1 : 0,
            },
            selectedLanguage: lang,
          };
          dispatch(updateAourvalue(data));
        });
      } else {
        if (updatedLanguages.length > 0) {
          const firstLang = updatedLanguages[0];
          const createData = {
            values: {
              title: values.title[firstLang],
              description: values.description[firstLang],
              icon: values.icon,
              active: values.active === 1 ? 1 : 0,
            },
            selectedLanguage: firstLang,
          };
          dispatch(createAourvalue(createData))
            .then((createdOurvalue) => {
              console.log(createdOurvalue);

              updatedLanguages.slice(1).forEach((lang) => {
                const updateData = {
                  id: createdOurvalue.payload.id,
                  ourvalueData: {
                    title: values.title[lang],
                    description: values.description[lang],
                    icon: values.icon,
                    active: values.active === 1 ? 1 : 0,
                  },
                  selectedLanguage: lang,
                };

                dispatch(updateAourvalue(updateData));
              });

              formik.resetForm();
              setTimeout(() => {
                dispatch(resetState());
              }, 300);
            })
            .catch((error) => {
              console.error('Error creating Ourvalue:', error);
            });
        }
      }
    },
  });

  useEffect(() => {
    if (getourvalueId === undefined) {
      formik.setFieldValue('active', 1);
    } else {
      formik.setFieldValue('active', newourvalue.ourvalueActive ? 1 : 0);
    }
  }, [getourvalueId, newourvalue.ourvalueActive]);
  const handleLanguageClick1 = (language) => {
    setSelectedLanguage1(language);
  };

  const handleLanguageClick2 = (language) => {
    setSelectedLanguage2(language);
  };

  return (
    <div>
      <h3 className="mb-4 title">
        {getourvalueId !== undefined
          ? `${translate('Edit_Our_Value', Language)}`
          : `${translate('Add_Our_Value', Language)}`}
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['title', 'description', 'icon'];
            const errors = {};
            requiredFields.forEach((fieldName) => {
              if (formik.touched[fieldName] && !formik.values[fieldName]) {
                errors[fieldName] = 'This field is Required';
              }
            });

            language.forEach((lang) => {
              const titleFieldName = `title.${lang}`;
              const descriptionFieldName = `description.${lang}`;

              if (formik.touched.title && !formik.values.title[lang]) {
                errors[titleFieldName] = `Name for ${lang} is Required`;
              }
              if (
                formik.touched.description &&
                !formik.values.description[lang]
              ) {
                errors[
                  descriptionFieldName
                ] = `Description for ${lang} is Required`;
              }
            });

            if (Object.keys(errors).length > 0) {
              toast.success(`${translate('Fill', Language)}`);
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
          <label htmlFor="" className="mt-2">
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
            {translate('Description', Language)}
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
          {language.map((lang, index) => {
            return (
              <div
                key={lang}
                className={lang === selectedLanguage2 ? '' : 'hidden'}
              >
                <CustomInput
                  type="text"
                  name={`description.${lang}`}
                  onCh={formik.handleChange}
                  onBl={formik.handleBlur}
                  val={formik.values.description[lang]}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="error" key={`${lang}-error`}>
                    {formik.errors.description[lang]}
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
                    {formik.touched.image && formik.errors.image}
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <img
                    src={imageState ? imageState : ''}
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
            {getourvalueId !== undefined
              ? `${translate('Edit', Language)}`
              : `${translate('Add', Language)}`}{' '}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOurValue;
