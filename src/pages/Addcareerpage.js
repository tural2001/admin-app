/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { language } from '../Language/languages';
import {
  createAcareerpage,
  getAcareerpage,
  resetState,
  updateAcareerpage,
} from '../features/careerpage/careerpageSlice';
import { useTranslation } from '../components/TranslationContext';

const Addcareerpage = (e) => {
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
    address: yup.object().shape(
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
  });

  const [selectedLanguage1, setSelectedLanguage1] = useState('az');
  const [selectedLanguage2, setSelectedLanguage2] = useState('az');
  const [selectedLanguage3, setSelectedLanguage3] = useState('az');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getcareerpageId = location.pathname.split('/')[3];
  const newcareerpage = useSelector((state) => state.careerpage);
  const {
    isSuccess,
    isError,
    createdcareerpage,
    PageData,
    careerpageActive,
    updatedcareerpage,
  } = newcareerpage;
  console.log(newcareerpage);
  useEffect(() => {
    if (getcareerpageId !== undefined) {
      language.forEach((selectedLanguage) => {
        dispatch(getAcareerpage(getcareerpageId, selectedLanguage));
      });
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getcareerpageId]);

  const prevUpdatedCareerRef = useRef();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const prevUpdatedCareer = prevUpdatedCareerRef.current;
    if (
      isSuccess &&
      updatedcareerpage !== undefined &&
      updatedcareerpage !== prevUpdatedCareer
    ) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        toast.success(`${translate('Updated', Language)}`);
        prevUpdatedCareerRef.current = updatedcareerpage;
        navigate('/admin/career-list');
      }, 1000);
    }

    if (isError) {
      toast.error(`${translate('Wrong', Language)}`);
    }
  }, [isSuccess, isError, updatedcareerpage]);
  useEffect(() => {
    if (
      isSuccess &&
      createdcareerpage !== undefined &&
      updatedcareerpage !== undefined
    ) {
      toast.success(`${translate('Added', Language)}`);
      navigate('/admin/career-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isSuccess && createdcareerpage !== undefined) {
      toast.success(`${translate('Added', Language)}`);
      navigate('/admin/career-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isError) {
      toast.error(`${translate('Wrong', Language)}`);
    }
  }, [isSuccess, isError, createdcareerpage, updatedcareerpage, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: language.reduce((acc, lang) => {
        acc[lang] = PageData ? PageData[lang].data.name || '' : '';
        return acc;
      }, {}),
      address: language.reduce((acc, lang) => {
        acc[lang] = PageData ? PageData[lang]?.data?.address || '' : '';
        return acc;
      }, {}),
      description: language.reduce((acc, lang) => {
        acc[lang] = PageData ? PageData[lang]?.data?.description || '' : '';
        return acc;
      }, {}),
      active: careerpageActive ? 1 : 0,
    },

    validationSchema: schema,
    validate: (values) => {
      const errors = {};

      language.forEach((lang) => {
        const nameKey = `name.${lang}`;
        const addressKey = `address.${lang}`;
        const descriptionKey = `description.${lang}`;

        if (values[descriptionKey] && !values[nameKey] && !values[addressKey]) {
          errors[nameKey] = `Answer for ${lang} is Required`;
        }
      });

      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      const updatedLanguages = language.filter((lang) => values.name[lang]);
      console.log(updatedLanguages);
      if (getcareerpageId !== undefined) {
        updatedLanguages.forEach((lang) => {
          const data = {
            id: getcareerpageId,
            careerpageData: {
              name: values.name[lang],
              address: values.address[lang],
              description: values.description[lang],
              active: values.active === 1 ? 1 : 0,
            },
            selectedLanguage: lang,
          };
          dispatch(updateAcareerpage(data));
        });
      } else {
        if (updatedLanguages.length > 0) {
          const firstLang = updatedLanguages[0];
          const createData = {
            values: {
              name: values.name[firstLang],
              address: values.address[firstLang],
              description: values.description[firstLang],
              active: values.active === 1 ? 1 : 0,
            },
            selectedLanguage: firstLang,
          };
          dispatch(createAcareerpage(createData))
            .then((createdcareer) => {
              updatedLanguages.slice(1).forEach((lang) => {
                const updateData = {
                  id: createdcareer.payload.data.id,
                  careerpageData: {
                    name: values.name[firstLang],
                    address: values.address[firstLang],
                    description: values.description[firstLang],
                  },
                  selectedLanguage: lang,
                };

                dispatch(updateAcareerpage(updateData));
              });

              formik.resetForm();
              setTimeout(() => {
                dispatch(resetState());
              }, 300);
            })
            .catch((error) => {
              console.error('Error creating career:', error);
            });
        }
      }
    },
  });

  useEffect(() => {
    if (getcareerpageId === undefined) {
      formik.setFieldValue('active', 1);
    } else {
      formik.setFieldValue('active', newcareerpage.careerpageActive ? 1 : 0);
    }
  }, [getcareerpageId, newcareerpage.careerpageActive]);

  const handleLanguageClick1 = (language) => {
    setSelectedLanguage1(language);
  };

  const handleLanguageClick2 = (language) => {
    setSelectedLanguage2(language);
  };

  const handleLanguageClick3 = (language) => {
    setSelectedLanguage3(language);
  };

  return (
    <div>
      <h3 className="mb-4 title">
        {getcareerpageId !== undefined
          ? `${translate('Edit_Career', Language)}`
          : `${translate('Add_Career', Language)}`}
      </h3>
      <div className="">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['name', 'description', 'address'];
            const errors = {};
            requiredFields.forEach((fieldName) => {
              if (formik.touched[fieldName] && !formik.values[fieldName]) {
                errors[fieldName] = 'This field is Required';
              }
            });

            const lang = 'az';

            if (lang === 'az') {
              const langFields = ['name', 'description', 'address'];

              langFields.forEach((field) => {
                const langFieldName = `${field}.${lang}`;
                if (
                  formik.touched[langFieldName] &&
                  !formik.values[langFieldName]
                ) {
                  errors[langFieldName] = `Field for ${lang} is Required`;
                }
              });
            } else if (lang === 'en') {
              const langFields = ['name', 'description', 'address'];

              let enFieldFilled = false;
              langFields.forEach((field) => {
                const langFieldName = `${field}.${lang}`;
                if (formik.values[langFieldName]) {
                  enFieldFilled = true;
                }
              });

              if (!enFieldFilled) {
                langFields.forEach((field) => {
                  const langFieldName = `${field}.${lang}`;
                  if (
                    formik.touched[langFieldName] &&
                    !formik.values[langFieldName]
                  ) {
                    errors[langFieldName] = `Field for ${lang} is Required`;
                  }
                });
              }
            }

            if (Object.keys(errors).length > 0) {
              console.log(errors);
              toast.error(`${translate('Fill', Language)}`);
              return;
            }
            formik.handleSubmit(e);
          }}
        >
          <label htmlFor="" className="mt-2">
            <span className=""> {translate('Status', Language)}</span>
          </label>
          <div className="mt-2">
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
                  <span className="ml-2">{translate('No', Language)}</span>
                </label>
              </div>
            </div>
            <div className="error">
              {formik.touched.active && formik.errors.active}
            </div>
            <label htmlFor="" className="mt-2">
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
              {translate('Address', Language)}
            </label>
            <div className="flex">
              {language.map((lang) => (
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
                    name={`address.${lang}`}
                    onCh={formik.handleChange}
                    onBl={formik.handleBlur}
                    val={formik.values.address[lang]}
                  />
                  {formik.touched.address && formik.errors.address && (
                    <div className="error" key={`${lang}-error`}>
                      {formik.errors.address[lang]}
                    </div>
                  )}
                </div>
              );
            })}
            <label htmlFor="" className="my-2">
              {translate('Description', Language)}{' '}
            </label>
            <div className="flex">
              {language.map((lang) => (
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
          </div>
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getAcareerpage !== undefined
              ? `${translate('Add', Language)}`
              : `${translate('Edit', Language)}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcareerpage;
