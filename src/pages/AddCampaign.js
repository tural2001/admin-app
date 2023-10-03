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
  createAcampaign,
  getAcampaign,
  resetState,
  updateAcampaign,
} from '../features/campaigns/campaignsSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadImg } from '../features/upload/uploadSlice';
import { language } from '../Language/languages';

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
  image: yup.mixed().required('Image is Required'),
  active: yup.string(),
});

const AddCampaign = () => {
  const [selectedLanguage1, setSelectedLanguage1] = useState('az');
  const [selectedLanguage2, setSelectedLanguage2] = useState('az');

  const [isFileDetected, setIsFileDetected] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCampaignId = location.pathname.split('/')[3];
  const newCampaign = useSelector((state) => state.campaign);

  const {
    isSuccess,
    isError,
    createdCampaign,
    CampaignData,
    campaignActive,
    campaignImage,
    updatedCampaign,
  } = newCampaign;

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
    if (getCampaignId !== undefined) {
      language.forEach((selectedLanguage) => {
        dispatch(getAcampaign(getCampaignId, selectedLanguage));
      });
    } else {
      dispatch(resetState());
    }
  }, [getCampaignId]);

  const prevUpdatedCampaignRef = useRef();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const prevUpdatedCampaign = prevUpdatedCampaignRef.current;
    if (
      isSuccess &&
      updatedCampaign !== undefined &&
      updatedCampaign !== prevUpdatedCampaign
    ) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        toast.success('Campaign Updated Successfully!');
        prevUpdatedCampaignRef.current = updatedCampaign;
        navigate('/admin/campaign-list');
      }, 1000);
    }
    if (
      isSuccess &&
      createdCampaign !== undefined &&
      updatedCampaign !== undefined
    ) {
      toast.success('Campaign Added Successfully!');
      navigate('/admin/campaign-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [isSuccess, isError, createdCampaign, updatedCampaign, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: language.reduce((acc, lang) => {
        acc[lang] = CampaignData ? CampaignData[lang]?.data?.name || '' : '';
        return acc;
      }, {}),
      active: campaignActive ? 1 : 0,
      description: language.reduce((acc, lang) => {
        acc[lang] = CampaignData
          ? CampaignData[lang]?.data?.description || ''
          : '';
        return acc;
      }, {}),
      image: campaignImage || null,
    },
    validationSchema: schema,
    validate: (values) => {
      const errors = {};

      language.forEach((lang) => {
        const nameKey = `name.${lang}`;
        const descriptionKey = `description.${lang}`;

        if (values[nameKey] && !values[descriptionKey]) {
          errors[descriptionKey] = ` for ${lang} is Required`;
        }
      });

      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      const updatedLanguages = language.filter((lang) => values.name[lang]);
      console.log(updatedLanguages);
      if (getCampaignId !== undefined) {
        updatedLanguages.forEach((lang) => {
          const data = {
            id: getCampaignId,
            campaignData: {
              name: values.name[lang],
              description: values.description[lang],
              image: values.image,
              active: values.active === 1 ? 1 : 0,
            },
            selectedLanguage: lang,
          };
          dispatch(updateAcampaign(data));
        });
      } else {
        if (updatedLanguages.length > 0) {
          const firstLang = updatedLanguages[0];
          const createData = {
            values: {
              name: values.name[firstLang],
              description: values.description[firstLang],
              image: values.image,
              active: values.active === 1 ? 1 : 0,
            },
            selectedLanguage: firstLang,
          };
          dispatch(createAcampaign(createData))
            .then((createdCampaign) => {
              console.log(createdCampaign);

              updatedLanguages.slice(1).forEach((lang) => {
                const updateData = {
                  id: createdCampaign.payload.id,
                  campaignData: {
                    name: values.name[lang],
                    description: values.description[lang],
                    image: values.image,
                    active: values.active === 1 ? 1 : 0,
                  },
                  selectedLanguage: lang,
                };
                console.log(updateData);
                dispatch(updateAcampaign(updateData));
              });

              formik.resetForm();
              setTimeout(() => {
                dispatch(resetState());
              }, 300);
            })
            .catch((error) => {
              console.error('Error creating Campaign:', error);
            });
        }
      }
    },
  });
  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    [{ list: 'check' }],
    ['clean'],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  useEffect(() => {
    if (getCampaignId === undefined) {
      formik.setFieldValue('active', 1);
    } else {
      formik.setFieldValue('active', newCampaign.campaignActive ? 1 : 0);
    }
  }, [getCampaignId, newCampaign.campaignActive]);

  const handleLanguageClick1 = (language) => {
    setSelectedLanguage1(language);
  };

  const handleLanguageClick2 = (language) => {
    setSelectedLanguage2(language);
  };
  console.log(CampaignData);
  return (
    <div>
      <h3 className="mb-4 title">
        {getCampaignId !== undefined ? 'Edit' : 'Add'} Campaign
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['name', 'description', 'image'];
            const errors = {};
            requiredFields.forEach((fieldName) => {
              if (formik.touched[fieldName] && !formik.values[fieldName]) {
                errors[fieldName] = 'This field is Required';
              }
            });

            language.forEach((lang) => {
              const nameFieldName = `name.${lang}`;
              const descriptionFieldName = `description.${lang}`;

              if (
                formik.touched.description &&
                !formik.values.description[lang]
              ) {
                errors[
                  descriptionFieldName
                ] = `Description for ${lang} is Required`;
              }

              if (formik.touched.name && !formik.values.name[lang]) {
                errors[nameFieldName] = `Name for ${lang} is Required`;
              }
            });

            if (Object.keys(errors).length > 0) {
              toast.error('Please fill in the required fields.');
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
          <label htmlFor="" className="mt-2">
            Name
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
          <label htmlFor="" className="my-2">
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
          {language.map((lang) => {
            return (
              <div
                key={lang}
                className={lang === selectedLanguage2 ? '' : 'hidden'}
              >
                <ReactQuill
                  theme="snow"
                  name={`description.${lang}`}
                  onChange={formik.handleChange(`description.${lang}`)}
                  value={formik.values.description[lang]}
                  modules={module}
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
            {getCampaignId !== undefined ? 'Edit' : 'Add'} campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCampaign;
