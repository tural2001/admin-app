/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useLocation, useNavigate } from 'react-router-dom';
import {
  createAtariff,
  getAtariff,
  resetState,
  updateAtariff,
} from '../features/tariffs/tariffSlice';
import { getservices } from '../features/services/servicesSlice';
import { language } from '../Language/languages';
import { uploadImg } from '../features/upload/uploadSlice';
import Dropzone from 'react-dropzone';

let schema = yup.object({
  name: yup.object().shape(
    language.reduce(
      (acc, lang) => ({
        ...acc,
        az: yup.string().required(`Name for az is Required`),
      }),
      {}
    )
  ),
  description: yup.object().shape(
    language.reduce(
      (acc, lang) => ({
        ...acc,
        az: yup.string().required(`Description for az is Required`),
      }),
      {}
    )
  ),
  price: yup.number(),
  service_id: yup.number().required('Service Id is Required'),
  speed: yup.number().required('Speed is Required'),
  active: yup.string(),
  channel: yup.string(),
  type: yup.number().required('Type is Required'),
  most_wanted: yup.string(),
  icon: yup.mixed().required('Icon is Required'),
});

const AddTariff = () => {
  const [selectedLanguageAn, setSelectedLanguageAn] = useState('az');
  const [selectedLanguageQu, setSelectedLanguageQu] = useState('az');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getTariffId = location.pathname.split('/')[3];
  const newTariff = useSelector((state) => state.tariff);
  console.log(newTariff);
  const {
    isSuccess,
    isError,
    isLoading,
    createdTariff,
    tariffChannel,
    tariffSpeed,
    tariffPrice,
    tariffType,
    tariffIcon,
    TariffActive,
    TariffData,
    tariffService_id,
    updatedTariff,
    tariffMostWanted,
  } = newTariff;

  useEffect(() => {
    if (getTariffId !== undefined) {
      language.forEach((selectedLanguage) => {
        dispatch(getAtariff(getTariffId, selectedLanguage));
      });
    } else {
      dispatch(resetState());
    }
  }, [getTariffId]);

  const prevUpdatedTariffRef = useRef();
  const debounceTimeoutRef = useRef(null);

  // useEffect(() => {
  //   const prevUpdatedFaq = prevUpdatedTariffRef.current;
  //   if (
  //     isSuccess &&
  //     updatedTariff !== undefined &&
  //     updatedTariff !== prevUpdatedFaq
  //   ) {
  //     if (debounceTimeoutRef.current) {
  //       clearTimeout(debounceTimeoutRef.current);
  //     }
  //     debounceTimeoutRef.current = setTimeout(() => {
  //       toast.success('Tariff Updated Successfully!');
  //       prevUpdatedTariffRef.current = updatedTariff;
  //       navigate('/admin/tariff-list');
  //     }, 1000);
  //   }
  //   if (
  //     isSuccess &&
  //     createdTariff !== undefined &&
  //     updatedTariff !== undefined
  //   ) {
  //     toast.success('Tariff Added Successfully!');
  //     navigate('/admin/tariff-list');
  //     setTimeout(() => {
  //       window.location.reload();
  //     }, 1000);
  //   }
  //   if (isError) {
  //     toast.error('Something Went Wrong!');
  //   }
  // }, [isSuccess, isError, createdTariff, updatedTariff, navigate]);

  const serviceState = useSelector((state) => state.service.services.data);
  console.log(serviceState);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: language.reduce((acc, lang) => {
        acc[lang] = TariffData ? TariffData[lang]?.data?.name || '' : '';
        return acc;
      }, {}),
      speed: tariffSpeed || '',
      icon: tariffIcon || null,
      price: tariffPrice || '',
      description: language.reduce((acc, lang) => {
        acc[lang] = TariffData ? TariffData[lang]?.data?.description || '' : '';
        return acc;
      }, {}),
      service_id: tariffService_id || '',
      active: TariffActive ? 1 : 0,
      channel: tariffChannel ? 1 : 0,
      most_wanted: tariffMostWanted ? 1 : 0,
      type: tariffType || null,
    },
    validationSchema: schema,
    // validate: (values) => {
    //   const errors = {};

    //   language.forEach((lang) => {
    //     const nameKey = `name.${lang}`;
    //     const descriptionKey = `description.${lang}`;

    //     if (values[descriptionKey] && !values[nameKey]) {
    //       errors[nameKey] = `Answer for ${lang} is Required`;
    //     }
    //   });

    //   return errors;
    // },

    onSubmit: (values) => {
      alert(JSON.stringify(values));
      const updatedLanguages = language.filter((lang) => values.name[lang]);
      console.log(updatedLanguages);
      if (getTariffId !== undefined) {
        updatedLanguages.forEach((lang) => {
          const data = {
            id: getTariffId,
            tariffData: {
              name: values.name[lang],
              description: values.description[lang],
              speed: values.speed,
              price: values.price,
              service_id: values.service_id,
              most_wanted: values.most_wanted === 1 ? 1 : 0,
              active: values.active === 1 ? 1 : 0,
              channel: values.channel === 1 ? 1 : 0,
              type: values.type === 1 ? 1 : 2,
            },
            selectedLanguage: lang,
          };
          dispatch(updateAtariff(data));
        });
      } else {
        if (updatedLanguages.length > 0) {
          const firstLang = updatedLanguages[0];
          const createData = {
            values: {
              name: values.name[firstLang],
              description: values.description[firstLang],
              speed: values.speed,
              price: values.price,
              icon: values.icon,
              service_id: values.service_id,
              most_wanted: values.most_wanted === 1 ? 1 : 0,
              active: values.active === 1 ? 1 : 0,
              channel: values.channel === 1 ? 1 : 0,
              type: values.type === 1 ? 1 : 2,
            },
            selectedLanguage: firstLang,
          };
          dispatch(createAtariff(createData))
            .then((createdTariff) => {
              console.log(createdTariff);

              updatedLanguages.slice(1).forEach((lang) => {
                const updateData = {
                  id: createdTariff.payload.id,
                  tariffData: {
                    name: values.name[lang],
                    description: values.description[lang],
                    speed: values.speed,
                    price: values.price,
                    icon: values.icon,
                    service_id: values.service_id,
                    most_wanted: values.most_wanted === 1 ? 1 : 0,
                    active: values.active === 1 ? 1 : 0,
                    channel: values.channel === 1 ? 1 : 0,
                    type: values.type === 1 ? 1 : 2,
                  },
                  selectedLanguage: lang,
                };

                dispatch(updateAtariff(updateData));
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
    language.forEach((selectedLanguage) => {
      dispatch(getservices(selectedLanguage));
    });
  }, []);

  useEffect(() => {
    if (getTariffId === undefined) {
      formik.setFieldValue('active', 1);
      formik.setFieldValue('most_wanted', 1);
      formik.setFieldValue('channel', 1);
    } else {
      formik.setFieldValue('active', newTariff.TariffActive ? 1 : 0);
      formik.setFieldValue('most_wanted', newTariff.tariffMostWanted ? 1 : 0);
      formik.setFieldValue('channel', newTariff.tariffChannel ? 1 : 0);
    }
  }, [getTariffId]);

  const [isFileDetected, setIsFileDetected] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      formik.setFieldValue('icon', acceptedFiles);
      dispatch(uploadImg(acceptedFiles));
      setIsFileDetected(true);
    },
    // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
    []
  );
  const imageState = useSelector((state) => state.upload.images.url);

  const handleLanguageClickAn = (language) => {
    setSelectedLanguageAn(language);
  };

  const handleLanguageClickQu = (language) => {
    setSelectedLanguageQu(language);
  };
  return (
    <div>
      <h3 className="mb-4 title">
        {getTariffId !== undefined ? 'Edit' : 'Add'} Tariff
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = [
              'name',
              'description',
              'service_id',
              'speed',
              'type',
              'icon',
            ];
            const errors = {};
            requiredFields.forEach((fieldName) => {
              if (formik.touched[fieldName] && !formik.values[fieldName]) {
                errors[fieldName] = 'This field is Required';
              }
            });

            language.forEach((lang) => {
              const nameFieldName = `name.${lang}`;
              const descriptionFieldName = `description.${lang}`;

              if (formik.touched.name && !formik.values.name[lang]) {
                errors[nameFieldName] = `Name for ${lang} is Required`;
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
              toast.error('Please fill in the required fields.');
              return;
            }
            console.log(formik.errors.answer);
            formik.handleSubmit(e);
          }}
        >
          {' '}
          <label htmlFor="" className="mt-2">
            Status
          </label>
          <div className="my-4">
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
                <span className="ml-2">Active</span>
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
                <span className="ml-2">Not Active</span>
              </label>
            </div>
          </div>
          <div className="error">
            {formik.touched.active && formik.errors.active}
          </div>
          <label htmlFor="" className="mt-2">
            Service Id
          </label>
          <select
            className="text-[#637381] mt-2 bg-inherit w text-[15px] font-medium rounded-lg block w-1/8 p-2.5 focus:ring-0 hom"
            id="service_id"
            name="service_id"
            onChange={formik.handleChange('service_id')}
            onBlur={formik.handleBlur('service_id')}
            value={formik.values.service_id}
          >
            <option value="">Select Service</option>
            {serviceState?.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.service_id && formik.errors.service_id}
          </div>
          <label htmlFor="" className="mt-2">
            Type
          </label>
          <div className="my-2">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="type"
                  onChange={() => formik.setFieldValue('type', 1)}
                  onBlur={formik.handleBlur}
                  value={1}
                  checked={formik.values.type === 1}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">Fərdi</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="type"
                  onChange={() => formik.setFieldValue('type', 2)}
                  onBlur={formik.handleBlur}
                  value={2}
                  checked={formik.values.type === 2}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">Biznes</span>
              </label>
            </div>
          </div>
          <div className="error">
            {formik.touched.type && formik.errors.type}
          </div>
          <label htmlFor="" className="mt-2">
            Most wanted
          </label>
          <div className="my-2">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="most_wanted"
                  onChange={() => formik.setFieldValue('most_wanted', 1)}
                  onBlur={formik.handleBlur}
                  value={1}
                  checked={
                    newTariff.tariffMostWanted
                      ? 1
                      : 0 || formik.values.most_wanted === 1
                  }
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">Most Wanted</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="most_wanted"
                  onChange={() => formik.setFieldValue('most_wanted', 0)}
                  onBlur={formik.handleBlur}
                  value={0}
                  checked={formik.values.most_wanted === 0}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">Not Most Wanted</span>
              </label>
            </div>
          </div>
          <div className="error">
            {formik.touched.most_wanted && formik.errors.most_wanted}
          </div>
          <label htmlFor="" className="mt-2">
            Channel
          </label>
          <div className="my-2">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="channel"
                  onChange={() => formik.setFieldValue('channel', 1)}
                  onBlur={formik.handleBlur}
                  value={1}
                  checked={
                    newTariff.tariffChannel
                      ? 1
                      : 0 || formik.values.channel === 1
                  }
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="channel"
                  onChange={() => formik.setFieldValue('channel', 0)}
                  onBlur={formik.handleBlur}
                  value={0}
                  checked={formik.values.channel === 0}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
          <div className="error">
            {formik.touched.channel && formik.errors.channel}
          </div>
          <label htmlFor="" className="mt-2">
            Name
          </label>
          <div className="flex">
            {language.map((lang, index) => (
              <label
                key={lang}
                className={`cursor-pointer capitalize border-[1px] border-[#5e3989]  rounded-t-lg px-5 ${
                  lang === selectedLanguageAn ? 'font-bold' : ''
                }`}
                onClick={() => handleLanguageClickAn(lang)}
              >
                {lang}
              </label>
            ))}
          </div>
          {language.map((lang, index) => {
            return (
              <div
                key={lang}
                className={lang === selectedLanguageAn ? '' : 'hidden'}
              >
                {' '}
                <CustomInput
                  type="text"
                  name={`name.${lang}`}
                  onCh={formik.handleChange}
                  onBl={formik.handleBlur}
                  val={formik.values.name[lang]}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="error" key={`${lang}-error`}>
                    {formik.errors.name[lang]}
                  </div>
                )}
              </div>
            );
          })}
          <label htmlFor="" className="mt-2">
            Description
          </label>
          <div className="flex">
            {language.map((lang, index) => (
              <label
                key={lang}
                className={`cursor-pointer capitalize border-[1px] border-[#5e3989]  rounded-t-lg px-5 ${
                  lang === selectedLanguageQu ? 'font-bold' : ''
                }`}
                onClick={() => handleLanguageClickQu(lang)}
              >
                {lang}
              </label>
            ))}
          </div>
          {language.map((lang) => {
            return (
              <div
                key={lang}
                className={lang === selectedLanguageQu ? '' : 'hidden'}
              >
                <CustomInput
                  type="text"
                  name={`description.${lang}`}
                  onCh={formik.handleChange}
                  onBl={formik.handleBlur}
                  val={formik.values.description[lang]}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="error" key={lang}>
                    {formik.errors.description[lang]}
                  </div>
                )}
              </div>
            );
          })}
          <label htmlFor="" className="mt-2">
            Speed
          </label>
          <CustomInput
            type="number"
            label="Enter Tariff Speed"
            name="speed"
            onCh={formik.handleChange('speed')}
            onBl={formik.handleBlur('speed')}
            val={formik.values.speed}
          />
          <div className="error">
            {formik.touched.speed && formik.errors.speed}
          </div>
          <label htmlFor="" className="mt-2">
            Price
          </label>
          <CustomInput
            type="number"
            label="Enter Tariff Price"
            name="price"
            onCh={formik.handleChange('price')}
            onBl={formik.handleBlur('price')}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <label htmlFor="" className="mt-2">
            Icon
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
                    {formik.touched.icon && formik.errors.icon}
                  </div>
                </div>
                <div className="mt-[70px] w-[200px]">
                  <img src={imageState ? imageState : ''} alt="" />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getTariffId !== undefined ? 'Edit' : 'Add'} Tariff
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTariff;
