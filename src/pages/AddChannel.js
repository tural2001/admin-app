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
  createAchannel,
  getAchannel,
  resetState,
  updateAchannel,
} from '../features/channels/channelsSlice';
import { getcountries } from '../features/countries/countriesSlice';
import { gettariffs } from '../features/tariffs/tariffSlice';
import { uploadImg } from '../features/upload/uploadSlice';
import { language } from '../Language/languages';
import { useTranslation } from '../components/TranslationContext';

const Addchannel = () => {
  const { translate, Language } = useTranslation();

  let schema = yup.object({
    name: yup.object().shape(
      language.reduce(
        (acc, lang) => ({
          ...acc,
          az: yup.string().required(`${translate('Required_Fill', Language)}`),
        }),
        {}
      )
    ),
    country_id: yup
      .number()
      .required(`${translate('Required_Fill', Language)}`),
    tariff_id: yup.number().required(`${translate('Required_Fill', Language)}`),
    image: yup.mixed().required(`${translate('Required_Fill', Language)}`),
    active: yup.boolean(),
  });
  const [selectedLanguage1, setSelectedLanguage1] = useState('az');
  const [isFileDetected, setIsFileDetected] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getchannelId = location.pathname.split('/')[3];
  const newchannel = useSelector((state) => state.channel);

  const {
    isSuccess,
    isError,
    channelTariff_id,
    createdChannel,
    ChannelData,
    channelActive,
    channelCountry_id,
    channelImage,
    updatedChannel,
  } = newchannel;

  const onDrop = useCallback((acceptedFiles) => {
    formik.setFieldValue('image', acceptedFiles);
    dispatch(uploadImg(acceptedFiles));
    setIsFileDetected(true);
  }, []);
  const imageState = useSelector((state) => state.upload.images.url);

  useEffect(() => {
    language.forEach((selectedLanguage) => {
      dispatch(getcountries(selectedLanguage));
      dispatch(gettariffs(selectedLanguage));
    });
  }, []);

  const countryState = useSelector((state) => state.country.countries.data);
  const tariffState = useSelector((state) => state.tariff.tariffs.data);

  useEffect(() => {
    if (getchannelId !== undefined) {
      language.forEach((selectedLanguage) => {
        dispatch(getAchannel(getchannelId, selectedLanguage));
      });
    } else {
      dispatch(resetState());
    }
  }, [getchannelId]);

  const prevUpdatedChannelRef = useRef();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const prevUpdatedChannel = prevUpdatedChannelRef.current;
    if (
      isSuccess &&
      updatedChannel !== undefined &&
      updatedChannel !== prevUpdatedChannel
    ) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        toast.success(`${translate('Updated', Language)}`);
        prevUpdatedChannelRef.current = updatedChannel;
        navigate('/admin/channel-list');
      }, 1000);
    }
    if (
      isSuccess &&
      createdChannel !== undefined &&
      updatedChannel !== undefined
    ) {
      toast.success(`${translate('Added', Language)}`);
      navigate('/admin/channel-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isError) {
      toast.success(`${translate('Wrong', Language)}`);
    }
  }, [isSuccess, isError, createdChannel, updatedChannel, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: language.reduce((acc, lang) => {
        acc[lang] = ChannelData ? ChannelData[lang]?.data?.name || '' : '';
        return acc;
      }, {}),
      active: channelActive ? 1 : 0,
      country_id: channelCountry_id || '',
      tariff_id: channelTariff_id || '',
      image: channelImage || null,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      const updatedLanguages = language.filter((lang) => values.name[lang]);
      console.log(updatedLanguages);
      if (getchannelId !== undefined) {
        updatedLanguages.forEach((lang) => {
          const data = {
            id: getchannelId,
            channelData: {
              name: values.name[lang],
              active: values.active === 1 ? 1 : 0,
              country_id: values.country_id,
              tariff_id: values.tariff_id,
              image: values.image,
            },
            selectedLanguage: lang,
          };
          dispatch(updateAchannel(data));
        });
      } else {
        if (updatedLanguages.length > 0) {
          const firstLang = updatedLanguages[0];
          const createData = {
            values: {
              name: values.name[firstLang],
              active: values.active === 1 ? 1 : 0,
              country_id: values.country_id,
              tariff_id: values.tariff_id,
              image: values.image,
            },
            selectedLanguage: firstLang,
          };
          dispatch(createAchannel(createData))
            .then((createdChannel) => {
              console.log(createdChannel);

              updatedLanguages.slice(1).forEach((lang) => {
                const updateData = {
                  id: createdChannel.payload.id,
                  channelData: {
                    name: values.name[lang],
                    active: values.active === 1 ? 1 : 0,
                    country_id: values.country_id,
                    tariff_id: values.tariff_id,
                    image: values.image,
                  },
                  selectedLanguage: lang,
                };

                dispatch(updateAchannel(updateData));
              });

              formik.resetForm();
              setTimeout(() => {
                dispatch(resetState());
              }, 300);
            })
            .catch((error) => {
              console.error('Error creating Channel:', error);
            });
        }
      }
    },
  });

  useEffect(() => {
    if (getchannelId === undefined) {
      formik.setFieldValue('active', 1);
    } else {
      formik.setFieldValue('active', newchannel.channelActive ? 1 : 0);
    }
  }, [getchannelId, newchannel.channelActive]);

  const handleLanguageClick1 = (language) => {
    setSelectedLanguage1(language);
  };

  return (
    <div>
      <h3 className="mb-4 title">
        {getchannelId !== undefined
          ? `${translate('Edit_Channel', Language)}`
          : `${translate('Add_Channel', Language)}`}
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['name', 'country_id', 'image', 'tariff_id'];
            const errors = {};
            requiredFields.forEach((fieldName) => {
              if (formik.touched[fieldName] && !formik.values[fieldName]) {
                errors[fieldName] = 'This field is Required';
              }
            });

            language.forEach((lang) => {
              const nameFieldName = `name.${lang}`;

              if (formik.touched.name && !formik.values.name[lang]) {
                errors[nameFieldName] = `Name for ${lang} is Required`;
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
          <label htmlFor="" className="">
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
            {translate('Country', Language)}
          </label>
          <select
            className="text-[#637381] mt-2 bg-inherit w text-[15px] font-medium rounded-lg block w-1/8 p-2.5 focus:ring-0 hom"
            id="country_id"
            name="country_id"
            onChange={formik.handleChange('country_id')}
            onBlur={formik.handleBlur('country_id')}
            value={formik.values.country_id}
          >
            <option value=""> {translate('Select_Country', Language)}</option>
            {countryState?.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.country_id && formik.errors.country_id}
          </div>
          <label htmlFor="" className="mt-2">
            {translate('Tariff', Language)}{' '}
          </label>
          <select
            className="text-[#637381] mt-2 bg-inherit w text-[15px] font-medium rounded-lg block w-1/8 p-2.5 focus:ring-0 hom"
            id="tariff_id"
            name="tariff_id"
            onChange={formik.handleChange('tariff_id')}
            onBlur={formik.handleBlur('tariff_id')}
            value={formik.values.tariff_id}
          >
            <option value=""> {translate('Select_Tariff', Language)}</option>
            {tariffState?.map((tariff) => (
              <option key={tariff.id} value={tariff.id}>
                {tariff.name}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.tariff_id && formik.errors.tariff_id}
          </div>
          <label htmlFor="" className="mt-2">
            {translate('Image', Language)}
          </label>
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
                    src={
                      imageState
                        ? imageState
                        : '' || channelImage
                        ? channelImage
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
            {getchannelId !== undefined
              ? `${translate('Edit', Language)}`
              : `${translate('Add', Language)}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addchannel;
