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
import { language } from '../Language/languages';
import { base_url } from '../utils/base_url';
import axios from 'axios';
import { config } from '../utils/axiosconfig';

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Stil dosyasını içe aktarın

import ImageUploader from 'quill-image-uploader';
import ImageResize from 'quill-image-resize-module-react';
import BlotFormatter from 'quill-blot-formatter';
import { useTranslation } from '../components/TranslationContext';

Quill.register('modules/imageUploader', ImageUploader);
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/blotFormatter', BlotFormatter);

// let schema = yup.object({
//   title: yup.object().shape(
//     language.reduce(
//       (acc, lang) => ({
//         ...acc,
//         az: yup.string().required(`Name for az is Required`),
//       }),
//       {}
//     )
//   ),
//   description: yup.object().shape(
//     language.reduce(
//       (acc, lang) => ({
//         ...acc,
//         az: yup.string().required(`Description for az is Required`),
//       }),
//       {}
//     )
//   ),
//   slug: yup.object().shape(
//     language.reduce(
//       (acc, lang) => ({
//         ...acc,
//         az: yup.string().required(`Slug for az is Required`),
//       }),
//       {}
//     )
//   ),
//   image: yup.mixed().required('Image is Required'),
//   meta_title: yup.string(),
//   meta_description: yup.string(),
//   published_at: yup.date(),
// });

const AddPost = () => {
  const [selectedLanguage1, setSelectedLanguage1] = useState('az');
  const [selectedLanguage2, setSelectedLanguage2] = useState('az');
  const [selectedLanguage3, setSelectedLanguage3] = useState('az');
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
    postPublished,
    postImage,
    updatedPost,
  } = newPost;

  const onDrop = useCallback((acceptedFiles) => {
    formik.setFieldValue('image', acceptedFiles);
    dispatch(uploadImg(acceptedFiles));
    setIsFileDetected(true);
  }, []);
  const imageState = useSelector((state) => state.upload.images.url);

  useEffect(() => {
    if (getpostId !== undefined) {
      dispatch(getApost(getpostId));
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
      published_at: postPublished || undefined,
    },
    // validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      const formattedPublishedAt = values.published_at
        ? formatDateTimeForServer(values.published_at)
        : [null];
      const updatedLanguages = language.filter((lang) => values.title[lang]);

      if (getpostId !== undefined) {
        updatedLanguages.forEach((lang) => {
          const data = {
            id: getpostId,
            postData: {
              title: values.title[lang],
              description: values.description[lang],
              slug: values.slug[lang],
              meta_title: values.meta_title[lang],
              meta_description: values.meta_description[lang],
              published_at: formattedPublishedAt,
              image: values.image,
            },
            selectedLanguage: lang,
          };
          dispatch(updateApost(data));
        });
      } else {
        if (updatedLanguages.length > 0) {
          const formattedPublishedAt = values.published_at
            ? formatDateTimeForServer(values.published_at)
            : [null];
          const firstLang = updatedLanguages[0];
          const createData = {
            values: {
              title: values.title[firstLang],
              description: values.description[firstLang],
              slug: values.slug[firstLang],
              meta_title: values.meta_title[firstLang],
              meta_description: values.meta_description[firstLang],
              published_at: formattedPublishedAt,
              image: values.image,
            },
            selectedLanguage: firstLang,
          };
          dispatch(createApost(createData))
            .then((createdPost) => {
              const formattedPublishedAt = values.published_at
                ? formatDateTimeForServer(values.published_at)
                : [null];
              updatedLanguages.slice(1).forEach((lang) => {
                const updateData = {
                  id: createdPost.payload.id,
                  postData: {
                    title: values.title[lang],
                    description: values.description[lang],
                    slug: values.slug[lang],
                    meta_title: values.meta_title[lang],
                    meta_description: values.meta_description[lang],
                    published_at: formattedPublishedAt,
                    image: values.image,
                  },
                  selectedLanguage: lang,
                };
                dispatch(updateApost(updateData));
              });
              formik.resetForm();
              setTimeout(() => {
                dispatch(resetState());
              }, 300);
            })
            .catch((error) => {
              console.error('Error creating Post:', error);
            });
        }
      }
    },
  });

  const [selectedLanguage4, setSelectedLanguage4] = useState('az');

  const [editorHtml, setEditorHtml] = useState({});

  useEffect(() => {
    language?.forEach((lang) => {
      const postDataDescription = PostData[lang]?.data?.description;
      if (postDataDescription) {
        setEditorHtml((prevEditorHtml) => ({
          ...prevEditorHtml,
          [lang]: postDataDescription,
        }));
      }
    });
  }, [PostData, language]);

  const updateEditorHtml = (language, html) => {
    setEditorHtml((prevEditorHtml) => ({
      ...prevEditorHtml,
      [language]: html,
    }));
  };

  const handleChange = (html, lang) => {
    updateEditorHtml(lang, html);
    formik.setFieldValue(`description.${lang}`, html);
  };

  const handleDrop = async (acceptedFiles, lang) => {
    try {
      const file = acceptedFiles[0];

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        `${base_url}/api/upload-media`,
        formData,
        {
          headers: config.getHeaders('az'),
        }
      );

      const imageUrl = response.data.url;

      const imageHtml = `<img src="${imageUrl}" alt="Resim" />`;

      const currentEditorContent = editorHtml[lang] || '';

      const newEditorContent = currentEditorContent + imageHtml;

      updateEditorHtml(lang, newEditorContent);

      formik.setFieldValue(`description.${lang}`, newEditorContent);
    } catch (error) {
      console.error('Image upload error:', error);
    }
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

  const { translate, Language } = useTranslation();

  return (
    <div>
      <h3 className="mb-4 title">
        {getpostId !== undefined
          ? `${translate('Edit_Post', Language)}`
          : `${translate('Add_Post', Language)}`}{' '}
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
                errors[titleFieldName] = `title for ${lang} is Required`;
              }
              if (formik.touched.slug && !formik.values.slug[lang]) {
                errors[slugFieldName] = `slug for ${lang} is Required`;
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
                <Dropzone
                  onDrop={(acceptedFiles) => handleDrop(acceptedFiles, lang)}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps()}
                      style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        textAlign: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <input {...getInputProps()} />
                      <p> {translate('Image_Drop', Language)}</p>
                    </div>
                  )}
                </Dropzone>

                <ReactQuill
                  name={`description.${lang}`}
                  onChange={(value) => handleChange(value, lang)}
                  value={editorHtml[lang] || ''}
                  theme="snow"
                  style={{
                    minHeight: '5vh',
                  }}
                  modules={{
                    toolbar: {
                      container: [
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

                        ['clean'],
                      ],
                    },
                    clipboard: {
                      matchVisual: false,
                    },
                    imageResize: {
                      parchment: Quill.import('parchment'),
                      modules: ['Resize', 'DisplaySize'],
                    },
                    blotFormatter: {},
                  }}
                  formats={[
                    'header',
                    'font',
                    'size',
                    'bold',
                    'italic',
                    'underline',
                    'align',
                    'strike',
                    'script',
                    'blockquote',
                    'background',
                    'list',
                    'bullet',
                    'indent',
                    'link',
                    'image',
                    'color',
                    'code-block',
                  ]}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="error" key={`${lang}-error`}>
                    {formik.errors.description[lang]}
                  </div>
                )}
              </div>
            );
          })}
          {/* <Editor onDescriptionChange={handleDescriptionChange} /> */}
          <label htmlFor="" className="mt-2">
            {translate('Title', Language)}{' '}
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
            {translate('Slug', Language)}{' '}
          </label>
          <div className="flex">
            {language.map((lang, index) => (
              <label
                key={lang}
                className={`cursor-pointer capitalize border-[1px] border-[#5e3989]  rounded-t-lg px-5 ${
                  lang === selectedLanguage5 ? 'font-bold' : ''
                }`}
                onClick={() => handleLanguageClick5(lang)}
              >
                {lang}
              </label>
            ))}
          </div>
          {language.map((lang, index) => {
            return (
              <div
                key={lang}
                className={lang === selectedLanguage5 ? '' : 'hidden'}
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
            {translate('Date', Language)}{' '}
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
            {translate('Image', Language)}{' '}
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
            {getpostId !== undefined
              ? `${translate('Edit', Language)}`
              : `${translate('Add', Language)}`}{' '}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
