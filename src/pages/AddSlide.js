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
  createAslide,
  getAslide,
  updateAslide,
} from '../features/slides/slidesSlice';
import { resetState } from '../features/users/usersSlice';
import { uploadImg } from '../features/upload/uploadSlice';
import { language } from '../Language/languages';

let schema = yup.object({
  title: yup.object().shape(
    language.reduce(
      (acc, lang) => ({
        ...acc,
        az: yup.string().required(`Title for az is Required`),
      }),
      {}
    )
  ),
  order: yup.number(),
  show_button: yup.string(),
  button_text: yup.object().shape(
    language.reduce(
      (acc, lang) => ({
        ...acc,
        az: yup.string().required(`button text for az is Required`),
      }),
      {}
    )
  ),
  button_link: yup.object().shape(
    language.reduce(
      (acc, lang) => ({
        ...acc,
        az: yup.string().required(`button link for az is Required`),
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
  image: yup.mixed().required('Image is Required'),
  active: yup.string(),
});

const AddSlide = () => {
  const [selectedLanguage1, setSelectedLanguage1] = useState('az');
  const [selectedLanguage2, setSelectedLanguage2] = useState('az');
  const [selectedLanguage3, setSelectedLanguage3] = useState('az');
  const [selectedLanguage4, setSelectedLanguage4] = useState('az');
  const [isFileDetected, setIsFileDetected] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getslideId = location.pathname.split('/')[3];
  const newslide = useSelector((state) => state.slide);

  const {
    isSuccess,
    isError,
    isLoading,
    createdSlide,
    slideOrder,
    slideData,
    slideShow_button,
    slideActive,
    updatedSlide,
    slideImage,
  } = newslide;

  const onDrop = useCallback(
    (acceptedFiles) => {
      formik.setFieldValue('image', acceptedFiles);
      dispatch(uploadImg(acceptedFiles));
      setIsFileDetected(true);
    },
    // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
    []
  );
  const imageState = useSelector((state) => state.upload.images.url);

  useEffect(() => {
    if (getslideId !== undefined) {
      language.forEach((selectedLanguage) => {
        dispatch(getAslide(getslideId, selectedLanguage));
      });
    } else {
      dispatch(resetState());
    }
  }, [getslideId]);

  const prevUpdatedSlideRef = useRef();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const prevUpdatedSlide = prevUpdatedSlideRef.current;
    if (
      isSuccess &&
      updatedSlide !== undefined &&
      updatedSlide !== prevUpdatedSlide
    ) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        toast.success('Slide Updated Successfully!');
        prevUpdatedSlideRef.current = updatedSlide;
        navigate('/admin/slide-list');
      }, 1000);
    }
    if (isSuccess && createdSlide !== undefined && updatedSlide !== undefined) {
      toast.success('Slide Added Successfully!');
      navigate('/admin/slide-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [isSuccess, isError, createdSlide, updatedSlide, navigate]);
  console.log(slideData);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: language.reduce((acc, lang) => {
        acc[lang] = slideData ? slideData[lang]?.data?.title || '' : '';
        return acc;
      }, {}),
      active: slideActive ? 1 : 0,
      order: slideOrder ? 1 : 0,
      show_button: slideShow_button ? 1 : 0,
      button_text: language.reduce((acc, lang) => {
        acc[lang] = slideData ? slideData[lang]?.data?.button_text || '' : '';
        return acc;
      }, {}),
      button_link: language.reduce((acc, lang) => {
        acc[lang] = slideData ? slideData[lang]?.data?.button_link || '' : '';
        return acc;
      }, {}),
      description: language.reduce((acc, lang) => {
        acc[lang] = slideData ? slideData[lang]?.data?.description || '' : '';
        return acc;
      }, {}),
      image: slideImage || null,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      const updatedLanguages = language.filter((lang) => values.title[lang]);
      console.log(updatedLanguages);
      if (getslideId !== undefined) {
        updatedLanguages.forEach((lang) => {
          const data = {
            id: getslideId,
            slideData: {
              title: values.title[lang],
              description: values.description[lang],
              button_link: values.button_link[lang],
              button_text: values.button_text[lang],
              show_button: values.show_button,
              active: values.active === 1 ? 1 : 0,
              order: values.order === 1 ? 1 : 0,
              image: values.image,
            },
            selectedLanguage: lang,
          };
          dispatch(updateAslide(data));
        });
      } else {
        if (updatedLanguages.length > 0) {
          const firstLang = updatedLanguages[0];
          const createData = {
            values: {
              title: values.title[firstLang],
              description: values.description[firstLang],
              button_link: values.button_link[firstLang],
              button_text: values.button_text[firstLang],
              show_button: values.show_button,
              order: values.order === 1 ? 1 : 0,
              active: values.active === 1 ? 1 : 0,
              image: values.image,
            },
            selectedLanguage: firstLang,
          };
          dispatch(createAslide(createData))
            .then((createdSlide) => {
              console.log(createdSlide);

              updatedLanguages.slice(1).forEach((lang) => {
                const updateData = {
                  id: createdSlide.payload.id,
                  slideData: {
                    title: values.title[lang],
                    description: values.description[lang],
                    button_link: values.button_link[lang],
                    button_text: values.button_text[lang],
                    show_button: values.show_button,
                    order: values.order === 1 ? 1 : 0,
                    active: values.active === 1 ? 1 : 0,
                    image: values.image,
                  },
                  selectedLanguage: lang,
                };
                console.log(updateData);
                dispatch(updateAslide(updateData));
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
    if (getslideId === undefined) {
      formik.setFieldValue('active', 1);
      formik.setFieldValue('order', 0);
    } else {
      formik.setFieldValue('active', newslide.slideActive ? 1 : 0);
      formik.setFieldValue('order', newslide.slideOrder ? 1 : 0);
    }
  }, [getslideId, newslide.slideActive]);

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
        {getslideId !== undefined ? 'Edit' : 'Add'} slide
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = [
              'title',
              'description',
              'icon',
              'parent_id',
            ];
            const errors = {};
            requiredFields.forEach((fieldName) => {
              if (formik.touched[fieldName] && !formik.values[fieldName]) {
                errors[fieldName] = 'This field is Required';
              }
            });

            language.forEach((lang) => {
              const titleFieldName = `title.${lang}`;
              const button_textFieldName = `button_link.${lang}`;
              const button_linkFieldName = `button_text.${lang}`;
              const descriptionFieldName = `description.${lang}`;

              if (formik.touched.title && !formik.values.title[lang]) {
                errors[titleFieldName] = `Name for ${lang} is Required`;
              }

              if (
                formik.touched.button_link &&
                !formik.values.button_link[lang]
              ) {
                errors[button_textFieldName] = `Name for ${lang} is Required`;
              }
              if (
                formik.touched.button_text &&
                !formik.values.button_text[lang]
              ) {
                errors[button_linkFieldName] = `Name for ${lang} is Required`;
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
            Order
          </label>
          <div className="my-2">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="order"
                  onChange={() => formik.setFieldValue('order', 1)}
                  onBlur={formik.handleBlur}
                  value={1}
                  checked={formik.values.order === 1}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">Order</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="order"
                  onChange={() => formik.setFieldValue('order', 0)}
                  onBlur={formik.handleBlur}
                  value={0}
                  checked={formik.values.order === 0}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">not ordered</span>
              </label>
            </div>
          </div>
          <label htmlFor="" className="mt-2">
            Title
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
            Description
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
            Show button
          </label>
          <div className="my-2">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="show_button"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value="1"
                  checked={
                    newslide.slideShow_button
                      ? 1
                      : 0 || formik.values.show_button === '1'
                  }
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">Show</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="show_button"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value="0"
                  checked={formik.values.show_button === '0'}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">Hidden</span>
              </label>
            </div>
            <div className="error">
              {formik.touched.show_button && formik.errors.show_button}
            </div>
          </div>
          <label htmlFor="" className="mt-2">
            Button Text
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
                {' '}
                <CustomInput
                  type="text"
                  name={`button_text.${lang}`}
                  onCh={formik.handleChange}
                  onBl={formik.handleBlur}
                  val={formik.values.button_text[lang]}
                />
                {formik.touched.button_text && formik.errors.button_text && (
                  <div className="error" key={`${lang}-error`}>
                    {formik.errors.button_text[lang]}
                  </div>
                )}
              </div>
            );
          })}
          <label htmlFor="" className="mt-2">
            Button Link
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
                  name={`button_link.${lang}`}
                  onCh={formik.handleChange}
                  onBl={formik.handleBlur}
                  val={formik.values.button_link[lang]}
                />
                {formik.touched.button_link && formik.errors.button_link && (
                  <div className="error" key={`${lang}-error`}>
                    {formik.errors.button_link[lang]}
                  </div>
                )}
              </div>
            );
          })}
          <label htmlFor="" className="mt-2">
            Image
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
                    {formik.touched.image && formik.errors.image}
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
            {getslideId !== undefined ? 'Edit' : 'Add'} slide
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSlide;
