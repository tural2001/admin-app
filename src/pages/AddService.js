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
  createAservice,
  getAservice,
  resetState,
  updateAservice,
} from '../features/services/servicesSlice';
import { uploadImg } from '../features/upload/uploadSlice';
import { language } from '../Language/languages';
import { getServicecategories } from '../features/servicecategories/servicecategoriesSlice';
import { useTranslation } from '../components/TranslationContext';

const AddService = () => {
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
          az: yup.string(),
        }),
        {}
      )
    ),
    icon: yup.mixed(),
    active: yup.string(),
    partner: yup.string(),
    parent_id: yup.number(),
    meta_title: yup.object().shape(
      language.reduce(
        (acc, lang) => ({
          ...acc,
          az: yup.string(),
        }),
        {}
      )
    ),
    meta_description: yup.object().shape(
      language.reduce(
        (acc, lang) => ({
          ...acc,
          az: yup.string(),
        }),
        {}
      )
    ),
  });
  const [selectedLanguage1, setSelectedLanguage1] = useState('az');
  const [selectedLanguage2, setSelectedLanguage2] = useState('az');
  const [selectedLanguage3, setSelectedLanguage3] = useState('az');
  const [selectedLanguage4, setSelectedLanguage4] = useState('az');
  const [isFileDetected, setIsFileDetected] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getServiceId = location.pathname.split('/')[3];
  const newService = useSelector((state) => state.service);

  const {
    isSuccess,
    isError,
    createdService,
    serviceActive,
    serviceData,
    serviceIcon,
    serviceIpTv,
    serviseAdsl,
    updatedService,
    serviceParentId,
    servicePartner,
  } = newService;

  const onDrop = useCallback((acceptedFiles) => {
    formik.setFieldValue('icon', acceptedFiles);
    dispatch(uploadImg(acceptedFiles));
    setIsFileDetected(true);
  }, []);
  const imageState = useSelector((state) => state.upload.images.url);

  useEffect(() => {
    dispatch(getServicecategories());
  }, [dispatch]);

  useEffect(() => {
    if (getServiceId !== undefined) {
      language.forEach((selectedLanguage) => {
        dispatch(getAservice(getServiceId, selectedLanguage));
      });
    } else {
      dispatch(resetState());
    }
  }, [getServiceId]);

  const prevUpdatedTariffRef = useRef();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const prevUpdatedFaq = prevUpdatedTariffRef.current;
    if (
      isSuccess &&
      updatedService !== undefined &&
      updatedService !== prevUpdatedFaq
    ) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        toast.success(`${translate('Updated', Language)}`);
        prevUpdatedTariffRef.current = updatedService;
        navigate('/admin/service-list');
      }, 1000);
    }
    if (
      isSuccess &&
      createdService !== undefined &&
      updatedService !== undefined
    ) {
      toast.success(`${translate('Added', Language)}`);
      navigate('/admin/service-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isError) {
      toast.error(`${translate('Wrong', Language)}`);
    }
  }, [isSuccess, isError, createdService, updatedService, navigate]);

  const servicecstate =
    useSelector((state) => state.servicecategory?.serviceC?.data) || [];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: language.reduce((acc, lang) => {
        acc[lang] = serviceData ? serviceData[lang]?.data?.title || '' : '';
        return acc;
      }, {}),
      active: serviceActive ? 1 : 0,
      adsl: serviseAdsl ? 1 : 0,
      ip_tv: serviceIpTv ? 1 : 0,
      partner: servicePartner ? 1 : 0,
      parent_id: serviceParentId || '',
      description: language.reduce((acc, lang) => {
        acc[lang] = serviceData
          ? serviceData[lang]?.data?.description || ''
          : '';
        return acc;
      }, {}),
      icon: serviceIcon || '',
      meta_title: language.reduce((acc, lang) => {
        acc[lang] = serviceData
          ? serviceData[lang]?.data?.meta_title || ''
          : '';
        return acc;
      }, {}),
      meta_description: language.reduce((acc, lang) => {
        acc[lang] = serviceData
          ? serviceData[lang]?.data?.meta_description || ''
          : '';
        return acc;
      }, {}),
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      const updatedLanguages = language.filter((lang) => values.title[lang]);
      console.log(updatedLanguages);
      if (getServiceId !== undefined) {
        updatedLanguages.forEach((lang) => {
          const data = {
            id: getServiceId,
            serviceData: {
              title: values.title[lang],
              description: values.description[lang],
              meta_title: values.meta_title[lang],
              meta_description: values.meta_description[lang],
              active: values.active === 1 ? 1 : 0,
              ip_tv: values.ip_tv === 1 ? 1 : 0,
              adsl: values.adsl === 1 ? 1 : 0,
              partner: values.partner === 1 ? 1 : 0,
              parent_id: values.parent_id,
              icon: values.icon,
            },
            selectedLanguage: lang,
          };
          dispatch(updateAservice(data));
        });
      } else {
        if (updatedLanguages.length > 0) {
          const firstLang = updatedLanguages[0];
          const ParentID = parseInt(values.parent_id);
          const createData = {
            values: {
              title: values.title[firstLang],
              description: values.description[firstLang],
              meta_title: values.meta_title[firstLang],
              meta_description: values.meta_description[firstLang],
              active: values.active === 1 ? 1 : 0,
              ip_tv: values.ip_tv === 1 ? 1 : 0,
              adsl: values.adsl === 1 ? 1 : 0,
              partner: values.partner === 1 ? 1 : 0,
              parent_id: ParentID,
              icon: values.icon,
            },
            selectedLanguage: firstLang,
          };
          console.log(createData);
          dispatch(createAservice(createData))
            .then((createdService) => {
              console.log(createdService);

              updatedLanguages.slice(1).forEach((lang) => {
                const updateData = {
                  id: createdService.payload.id,
                  serviceData: {
                    title: values.title[lang],
                    description: values.description[lang],
                    meta_title: values.meta_title[lang],
                    meta_description: values.meta_description[lang],
                    active: values.active === 1 ? 1 : 0,
                    ip_tv: values.ip_tv === 1 ? 1 : 0,
                    adsl: values.adsl === 1 ? 1 : 0,
                    partner: values.partner === 1 ? 1 : 0,
                    parent_id: values.parent_id,
                    icon: values.icon,
                  },
                  selectedLanguage: lang,
                };

                dispatch(updateAservice(updateData));
              });

              formik.resetForm();
              setTimeout(() => {
                dispatch(resetState());
              }, 300);
            })
            .catch((error) => {
              console.error('Error creating Service:', error);
            });
        }
      }
    },
  });

  useEffect(() => {
    if (getServiceId === undefined) {
      formik.setFieldValue('active', 1);
      formik.setFieldValue('partner', 0);
      formik.setFieldValue('ip_tv', 0);
      formik.setFieldValue('adsl', 0);
    } else {
      formik.setFieldValue('active', newService.serviceActive ? 1 : 0);
      formik.setFieldValue('partner', newService.servicePartner ? 1 : 0);
      formik.setFieldValue('ip_tv', newService.serviceIpTv ? 1 : 0);
      formik.setFieldValue('adsl', newService.serviseAdsl ? 1 : 0);
    }
  }, [
    getServiceId,
    newService.serviceActive,
    newService.servicePartner,
    newService.serviceIpTv,
    newService.serviseAdsl,
  ]);
  console.log(servicecstate);
  const handleLanguageClick1 = (language) => {
    setSelectedLanguage1(language);
  };

  const handleLanguageClick2 = (language) => {
    setSelectedLanguage2(language);
  };
  const handleLanguageClick3 = (language) => {
    setSelectedLanguage3(language);
  };

  const handleLanguageClick4 = (language) => {
    setSelectedLanguage4(language);
  };

  return (
    <div>
      <h3 className="mb-4 title">
        {getServiceId !== undefined
          ? `${translate('Edit_Service', Language)}`
          : `${translate('Add_Service', Language)}`}{' '}
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['title'];
            const errors = {};
            requiredFields.forEach((fieldName) => {
              if (formik.touched[fieldName] && !formik.values[fieldName]) {
                errors[fieldName] = 'This field is Required';
              }
            });

            language.forEach((lang) => {
              const titleFieldName = `title.${lang}`;

              if (formik.touched.title && !formik.values.title[lang]) {
                errors[titleFieldName] = `Name for ${lang} is Required`;
              }
            });
            console.log(errors);
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
            {translate('Partner', Language)}
          </label>
          <div className="my-2">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="partner"
                  onChange={() => formik.setFieldValue('partner', 1)}
                  onBlur={formik.handleBlur}
                  value={1}
                  checked={formik.values.partner === 1}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">{translate('Yes', Language)}</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="partner"
                  onChange={() => formik.setFieldValue('partner', 0)}
                  onBlur={formik.handleBlur}
                  value={0}
                  checked={formik.values.partner === 0}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">{translate('No', Language)}</span>
              </label>
            </div>
          </div>
          <label htmlFor="" className="mt-2">
            {translate('IpTv', Language)}
          </label>
          <div className="my-2">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="ip_tv"
                  onChange={() => formik.setFieldValue('ip_tv', 1)}
                  onBlur={formik.handleBlur}
                  value={1}
                  checked={formik.values.ip_tv === 1}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">{translate('Yes', Language)}</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="ip_tv"
                  onChange={() => formik.setFieldValue('ip_tv', 0)}
                  onBlur={formik.handleBlur}
                  value={0}
                  checked={formik.values.ip_tv === 0}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">{translate('No', Language)}</span>
              </label>
            </div>
          </div>
          <label htmlFor="" className="mt-2">
            {translate('Adsl', Language)}
          </label>
          <div className="my-2">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="adsl"
                  onChange={() => formik.setFieldValue('adsl', 1)}
                  onBlur={formik.handleBlur}
                  value={1}
                  checked={formik.values.adsl === 1}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">{translate('Yes', Language)}</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="adsl"
                  onChange={() => formik.setFieldValue('adsl', 0)}
                  onBlur={formik.handleBlur}
                  value={0}
                  checked={formik.values.adsl === 0}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">{translate('No', Language)}</span>
              </label>
            </div>
          </div>
          <label htmlFor="" className="mt-2">
            {translate('Service', Language)}
          </label>
          <select
            className="text-[#637381] mt-2 bg-inherit w text-[15px] font-medium rounded-lg block w-1/8 p-2.5 focus:ring-0 hom"
            id="parent_id"
            name="parent_id"
            onChange={formik.handleChange('parent_id')}
            onBlur={formik.handleBlur('parent_id')}
            value={formik.values.parent_id}
          >
            <option value="">{translate('Select_Service', Language)}</option>
            {servicecstate?.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
          <label htmlFor="" className="mt-2">
            {translate('Meta_Title', Language)}
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
                  name={`meta_title.${lang}`}
                  onCh={formik.handleChange}
                  onBl={formik.handleBlur}
                  val={formik.values.meta_title[lang]}
                />
              </div>
            );
          })}
          <label htmlFor="" className="mt-2">
            {translate('Meta_Description', Language)}
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
                {' '}
                <CustomInput
                  type="text"
                  name={`meta_description.${lang}`}
                  onCh={formik.handleChange}
                  onBl={formik.handleBlur}
                  val={formik.values.meta_description[lang]}
                />
              </div>
            );
          })}

          <label htmlFor="" className="mt-2">
            {translate('Title', Language)}
          </label>
          <div className="flex">
            {language.map((lang, index) => (
              <label
                key={lang}
                className={`cursor-pointer capitalize border-[1px] border-[#5e3989]  rounded-t-lg px-5 ${
                  lang === selectedLanguage3 ? 'font-bold' : ''
                }`}
                onClick={() => handleLanguageClick3(lang)}
              >
                {lang}
              </label>
            ))}
          </div>
          {language.map((lang, index) => {
            return (
              <div
                key={lang}
                className={lang === selectedLanguage3 ? '' : 'hidden'}
              >
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
                  lang === selectedLanguage4 ? 'font-bold' : ''
                }`}
                onClick={() => handleLanguageClick4(lang)}
              >
                {lang}
              </label>
            ))}
          </div>
          {language.map((lang, index) => {
            return (
              <div
                key={lang}
                className={lang === selectedLanguage4 ? '' : 'hidden'}
              >
                {' '}
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
            {translate('Icon', Language)}{' '}
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
                </div>
                <div className="mt-[70px] w-[200px]">
                  <img
                    src={
                      imageState
                        ? imageState
                        : '' || serviceIcon
                        ? serviceIcon
                        : ''
                    }
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
            {getServiceId !== undefined
              ? `${translate('Edit', Language)}`
              : `${translate('Add', Language)}`}{' '}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddService;
