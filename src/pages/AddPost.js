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
  createApost,
  getApost,
  resetState,
  updateApost,
} from '../features/posts/postSlice';
import 'react-quill/dist/quill.snow.css';
import { uploadImg } from '../features/upload/uploadSlice';
import 'react-quill/dist/quill.snow.css';
import Editor from '../components/Editor';
import { language } from '../Language/languages';

let schema = yup.object({
  title: yup.object().shape(
    language.reduce(
      (acc, lang) => ({
        ...acc,
        az: yup.string().required(`title for az is Required`),
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
  slug: yup.object().shape(
    language.reduce(
      (acc, lang) => ({
        ...acc,
        az: yup.string().required(`Slug for az is Required`),
      }),
      {}
    )
  ),
  image: yup.mixed().required('Image is Required'),
  meta_title: yup.string(),
  meta_description: yup.string(),
  published_at: yup.date(),
});

const AddPost = () => {
  const [selectedLanguage1, setSelectedLanguage1] = useState('az');
  const [selectedLanguage2, setSelectedLanguage2] = useState('az');
  const [selectedLanguage3, setSelectedLanguage3] = useState('az');
  const [selectedLanguage4, setSelectedLanguage4] = useState('az');
  const [selectedLanguage5, setSelectedLanguage5] = useState('az');
  const [isFileDetected, setIsFileDetected] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getpostId = location.pathname.split('/')[3];
  const newPost = useSelector((state) => state.post);

  const {
    isSuccess,
    isError,
    createdPost,
    PostData,
    postImage,
    updatedPost,
    postPublished,
  } = newPost;

  const onDrop = useCallback((acceptedFiles) => {
    formik.setFieldValue('image', acceptedFiles);
    dispatch(uploadImg(acceptedFiles));
    setIsFileDetected(true);
  }, []);
  const imageState = useSelector((state) => state.upload.images.url);

  useEffect(() => {
    if (getpostId !== undefined) {
      language.forEach((selectedLanguage) => {
        dispatch(getApost(getpostId, selectedLanguage));
      });
    } else {
      dispatch(resetState());
    }
  }, [getpostId]);

  const prevUpdatedPostRef = useRef();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const prevUpdatedPost = prevUpdatedPostRef.current;
    if (
      isSuccess &&
      updatedPost !== undefined &&
      updatedPost !== prevUpdatedPost
    ) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        toast.success('Post Updated Successfully!');
        prevUpdatedPostRef.current = updatedPost;
        navigate('/admin/post-list');
      }, 1000);
    }
    if (isSuccess && createdPost !== undefined && updatedPost !== undefined) {
      toast.success('Post Added Successfully!');
      navigate('/admin/post-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [isSuccess, isError, createdPost, updatedPost, navigate]);

  const formatDateTimeForServer = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(
      date.getMonth() + 1
    ).padStart(2, '0')}.${date.getFullYear()} ${String(
      date.getHours()
    ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

    return formattedDate;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: language.reduce((acc, lang) => {
        acc[lang] = PostData ? PostData[lang]?.data?.title || '' : '';
        return acc;
      }, {}),
      description: language.reduce((acc, lang) => {
        acc[lang] = PostData ? PostData[lang]?.data?.description || '' : '';
        return acc;
      }, {}),
      image: postImage || null,
      meta_title: language.reduce((acc, lang) => {
        acc[lang] = PostData ? PostData[lang]?.data?.meta_title || '' : '';
        return acc;
      }, {}),
      meta_description: language.reduce((acc, lang) => {
        acc[lang] = PostData
          ? PostData[lang]?.data?.meta_description || ''
          : '';
        return acc;
      }, {}),
      slug: language.reduce((acc, lang) => {
        acc[lang] = PostData ? PostData[lang]?.data?.slug || '' : '';
        return acc;
      }, {}),
      published_at: postPublished || '',
    },
    validationSchema: schema,
    // onSubmit: (values) => {
    //   alert(JSON.stringify(values));
    //   const formattedPublishedAt = formatDateTimeForServer(values.published_at);

    //   const updatedValues = {
    //     ...values,
    //     published_at: formattedPublishedAt,
    //   };
    //   // alert(JSON.stringify(updatedValues));
    //   if (getpostId !== undefined) {
    //     const data = { id: getpostId, post: updatedValues };
    //     dispatch(updateApost(data));
    //   } else {
    //     dispatch(createApost(updatedValues));
    //     formik.resetForm();
    //     setTimeout(() => {
    //       dispatch(resetState());
    //     }, 1000);
    //   }
    // },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      const updatedLanguages = language.filter((lang) => values.title[lang]);
      console.log(updatedLanguages);
      if (getpostId !== undefined) {
        updatedLanguages.forEach((lang) => {
          const data = {
            id: getpostId,
            campaignData: {
              name: values.name[lang],
              description: values.description[lang],
              image: values.image,
              active: values.active === 1 ? 1 : 0,
            },
            selectedLanguage: lang,
          };
          dispatch(updateApost(data));
        });
      } else {
        if (updatedLanguages.length > 0) {
          const firstLang = updatedLanguages[0];
          const createData = {
            values: {
              title: values.title[firstLang],
              description: values.description[firstLang],
              meta_title: values.meta_title[firstLang],
              meta_description: values.meta_description[firstLang],
              slug: values.slug[firstLang],
              image: values.image,
              published_at: values.published_at,
            },
            selectedLanguage: firstLang,
          };
          dispatch(createApost(createData))
            .then((createdCampaign) => {
              console.log(createdCampaign);

              updatedLanguages.slice(1).forEach((lang) => {
                const updateData = {
                  id: createdCampaign.payload.id,
                  postData: {
                    title: values.title[lang],
                    description: values.description[lang],
                    meta_title: values.meta_title[lang],
                    meta_description: values.meta_description[lang],
                    slug: values.slug[lang],
                    image: values.image,
                    published_at: values.published_at,
                  },
                  selectedLanguage: lang,
                };
                console.log(updateData);
                dispatch(updateApost(updateData));
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

  const handleDescriptionChange = (newContent) => {
    formik.setFieldValue('description', newContent);
  };

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
  const handleLanguageClick5 = (language) => {
    setSelectedLanguage5(language);
  };
  return (
    <div>
      <h3 className="mb-4 title">
        {getpostId !== undefined ? 'Edit' : 'Add'} Post
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['title', 'description', 'slug', 'image'];
            const errors = {};
            requiredFields.forEach((fieldName) => {
              if (formik.touched[fieldName] && !formik.values[fieldName]) {
                errors[fieldName] = 'This field is Required';
              }
            });

            language.forEach((lang) => {
              const titleFieldName = `title.${lang}`;
              const descriptionFieldName = `description.${lang}`;
              const slugFieldName = `slug.${lang}`;

              if (
                formik.touched.description &&
                !formik.values.description[lang]
              ) {
                errors[
                  descriptionFieldName
                ] = `Description for ${lang} is Required`;
              }

              if (formik.touched.title && !formik.values.title[lang]) {
                errors[titleFieldName] = `Title for ${lang} is Required`;
              }
              if (formik.touched.slug && !formik.values.slug[lang]) {
                errors[slugFieldName] = `Slug for ${lang} is Required`;
              }
            });

            if (Object.keys(errors).length > 0) {
              toast.error('Please fill in the required fields.');
              return;
            }

            formik.handleSubmit(e);
          }}
        >
          <label htmlFor="" className="mt-2">
            Meta title
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
                {formik.touched.meta_title && formik.errors.meta_title && (
                  <div className="error" key={`${lang}-error`}>
                    {formik.errors.meta_title[lang]}
                  </div>
                )}
              </div>
            );
          })}
          <label htmlFor="" className="mt-2">
            Meta description
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
                  name={`meta_description.${lang}`}
                  onCh={formik.handleChange}
                  onBl={formik.handleBlur}
                  val={formik.values.meta_description[lang]}
                />
                {formik.touched.meta_description &&
                  formik.errors.meta_description && (
                    <div className="error" key={`${lang}-error`}>
                      {formik.errors.meta_description[lang]}
                    </div>
                  )}
              </div>
            );
          })}
          <label htmlFor="" className="mt-2">
            Description
          </label>
          <Editor onDescriptionChange={handleDescriptionChange} />
          <label htmlFor="" className="mt-2">
            Title
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
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <label htmlFor="" className="mt-2">
            Slug
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
                <CustomInput
                  type="text"
                  name={`slug.${lang}`}
                  onCh={formik.handleChange}
                  onBl={formik.handleBlur}
                  val={formik.values.slug[lang]}
                />
                {formik.touched.slug && formik.errors.slug && (
                  <div className="error" key={`${lang}-error`}>
                    {formik.errors.slug[lang]}
                  </div>
                )}
              </div>
            );
          })}
          <label htmlFor="" className="mt-2">
            Date
          </label>
          <CustomInput
            type="datetime-local"
            id="datetime"
            name="published_at"
            val={formik.values.published_at || ''}
            onCh={formik.handleChange('published_at')}
            onBl={formik.handleBlur('published_at')}
          />
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
            {getpostId !== undefined ? 'Edit' : 'Add'} post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
