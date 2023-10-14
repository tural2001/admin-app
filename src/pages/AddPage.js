/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getApage,
  resetState,
  updateApage,
} from '../features/pagess/pagesSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { language } from '../Language/languages';
import { useTranslation } from '../components/TranslationContext';
import { debounce } from 'lodash';

const AddPage = () => {
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
    slug: yup.object().shape(
      language.reduce(
        (acc, lang) => ({
          ...acc,
          az: yup.string(),
        }),
        {}
      )
    ),
    content: yup.object().shape(
      language.reduce(
        (acc, lang) => ({
          ...acc,
          az: yup.string().required(`${translate('Required_Fill', Language)}`),
        }),
        {}
      )
    ),
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
  const [selectedLanguage5, setSelectedLanguage5] = useState('az');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getpageId = location.pathname.split('/')[3];
  const newPage = useSelector((state) => state.page);

  const { isSuccess, isError, createdPage, PagessData, updatedPage } = newPage;

  const debouncedApiCalls = useCallback(
    debounce(() => {
      if (getpageId !== undefined) {
        language.forEach((selectedLanguage) => {
          dispatch(getApage(getpageId, selectedLanguage));
        });
      } else {
        dispatch(resetState());
      }
    }, 500),
    [getpageId, language, dispatch]
  );

  useEffect(() => {
    debouncedApiCalls();
  }, [debouncedApiCalls]);

  const prevUpdatedPageRef = useRef();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const prevUpdatedPage = prevUpdatedPageRef.current;
    if (
      isSuccess &&
      updatedPage !== undefined &&
      updatedPage !== prevUpdatedPage
    ) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        toast.success(`${translate('Updated', Language)}`);
        prevUpdatedPageRef.current = updatedPage;
        navigate('/admin/page-list');
      }, 1000);
    }
    if (isSuccess && createdPage !== undefined && updatedPage !== undefined) {
      toast.success(`${translate('Added', Language)}`);
      navigate('/admin/page-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isError) {
      toast.error(`${translate('Wrong', Language)}`);
    }
  }, [isSuccess, isError, createdPage, updatedPage, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: language.reduce((acc, lang) => {
        acc[lang] = PagessData ? PagessData[lang]?.data?.title || '' : '';
        return acc;
      }, {}),
      slug: language.reduce((acc, lang) => {
        acc[lang] = PagessData ? PagessData[lang]?.data?.slug || '' : '';
        return acc;
      }, {}),
      content: language.reduce((acc, lang) => {
        acc[lang] = PagessData ? PagessData[lang]?.data?.content || '' : '';
        return acc;
      }, {}),
      meta_title: language.reduce((acc, lang) => {
        acc[lang] = PagessData ? PagessData[lang]?.data?.meta_title || '' : '';
        return acc;
      }, {}),
      meta_description: language.reduce((acc, lang) => {
        acc[lang] = PagessData
          ? PagessData[lang]?.data?.meta_description || ''
          : '';
        return acc;
      }, {}),
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      const updatedLanguages = language.filter((lang) => values.title[lang]);
      console.log(updatedLanguages);
      if (getpageId !== undefined) {
        updatedLanguages.forEach((lang) => {
          const data = {
            id: getpageId,
            pageData: {
              title: values.title[lang],
              content: values.content[lang],
              slug: values.slug[lang],
              meta_title: values.meta_title[lang],
              meta_description: values.meta_description[lang],
            },
            selectedLanguage: lang,
          };
          dispatch(updateApage(data));
        });
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
        {getpageId !== undefined
          ? `${translate('Edit_Page', Language)}`
          : `${translate('Add_Page', Language)}`}{' '}
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['name', 'content'];
            const errors = {};
            requiredFields.forEach((fieldName) => {
              if (formik.touched[fieldName] && !formik.values[fieldName]) {
                errors[fieldName] = 'This field is Required';
              }
            });

            language.forEach((lang) => {
              const titleFieldName = `title.${lang}`;
              const contentFieldName = `content.${lang}`;

              if (formik.touched.title && !formik.values.title[lang]) {
                errors[titleFieldName] = `Name for ${lang} is Required`;
              }

              if (formik.touched.content && !formik.values.content[lang]) {
                errors[contentFieldName] = `Content for ${lang} is Required`;
              }
            });

            if (Object.keys(errors).length > 0) {
              toast.error(`${translate('Fill', Language)}`);
              return;
            }
            console.log(formik.errors.answer);
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
              </div>
            );
          })}

          <label htmlFor="" className="mt-2">
            {translate('Slug', Language)}
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
                  name={`slug.${lang}`}
                  onCh={formik.handleChange}
                  onBl={formik.handleBlur}
                  val={formik.values.slug[lang]}
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
            {translate('Content', Language)}
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
                <ReactQuill
                  theme="snow"
                  name={`content.${lang}`}
                  onChange={formik.handleChange(`content.${lang}`)}
                  value={formik.values.content[lang]}
                  modules={module}
                />

                {formik.touched.content && formik.errors.content && (
                  <div className="error" key={`${lang}-error`}>
                    {formik.errors.content[lang]}
                  </div>
                )}
              </div>
            );
          })}
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getpageId !== undefined
              ? `${translate('Edit_Page', Language)}`
              : `${translate('Add_Page', Language)}`}{' '}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPage;
