/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import {
  createAcolor,
  getAcolor,
  resetState,
  updateAcolor,
} from '../features/color/colorSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { language } from '../Language/languages';
import { useTranslation } from '../components/TranslationContext';

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
  code: yup.string().required('Code is Required'),
  active: yup.string(),
});

const AddColor = (e) => {
  const [selectedLanguage1, setSelectedLanguage1] = useState('az');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getcolorId = location.pathname.split('/')[3];
  const newcolor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    createdcolor,
    ColorData,
    colorActive,
    colorCode,
    updatedcolor,
  } = newcolor;

  useEffect(() => {
    if (getcolorId !== undefined) {
      language.forEach((selectedLanguage) => {
        dispatch(getAcolor(getcolorId, selectedLanguage));
      });
    } else {
      dispatch(resetState());
    }
  }, [getcolorId]);

  const prevUpdatedColorRef = useRef();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const prevUpdatedColor = prevUpdatedColorRef.current;
    if (
      isSuccess &&
      updatedcolor !== undefined &&
      updatedcolor !== prevUpdatedColor
    ) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        toast.success('Color Updated Successfully!');
        prevUpdatedColorRef.current = updatedcolor;
        navigate('/admin/color-list');
      }, 1000);
    }
    if (isSuccess && createdcolor !== undefined && updatedcolor !== undefined) {
      toast.success('Color Added Successfully!');
      navigate('/admin/color-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [isSuccess, isError, createdcolor, updatedcolor, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: language.reduce((acc, lang) => {
        acc[lang] = ColorData ? ColorData[lang]?.data?.name || '' : '';
        return acc;
      }, {}),
      code: colorCode || '',
      active: colorActive ? 1 : 0,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      const updatedLanguages = language.filter((lang) => values.name[lang]);
      console.log(updatedLanguages);
      if (getcolorId !== undefined) {
        updatedLanguages.forEach((lang) => {
          const data = {
            id: getcolorId,
            colorData: {
              name: values.name[lang],
              active: values.active === 1 ? 1 : 0,
              code: values.code,
            },
            selectedLanguage: lang,
          };
          dispatch(updateAcolor(data));
        });
      } else {
        if (updatedLanguages.length > 0) {
          const firstLang = updatedLanguages[0];
          const createData = {
            values: {
              name: values.name[firstLang],
              active: values.active === 1 ? 1 : 0,
              code: values.code,
            },
            selectedLanguage: firstLang,
          };
          dispatch(createAcolor(createData))
            .then((createdColor) => {
              console.log(createdColor);

              updatedLanguages.slice(1).forEach((lang) => {
                const updateData = {
                  id: createdColor.payload.id,
                  colorData: {
                    name: values.name[lang],
                    active: values.active === 1 ? 1 : 0,
                    code: values.code,
                  },
                  selectedLanguage: lang,
                };

                dispatch(updateAcolor(updateData));
              });

              formik.resetForm();
              setTimeout(() => {
                dispatch(resetState());
              }, 300);
            })
            .catch((error) => {
              console.error('Error creating Advantage:', error);
            });
        }
      }
    },
  });

  useEffect(() => {
    if (getcolorId === undefined) {
      formik.setFieldValue('active', 1);
    } else {
      formik.setFieldValue('active', newcolor.colorActive ? 1 : 0);
    }
  }, [getcolorId, newcolor.colorActive]);

  const handleLanguageClick1 = (language) => {
    setSelectedLanguage1(language);
  };
  const { translate, Language } = useTranslation();

  return (
    <div>
      <h3 className="mb-4 title">
        {getcolorId !== undefined
          ? `${translate('Edit_Color', Language)}`
          : `${translate('Add_Color', Language)}`}
      </h3>
      <div className="">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['name', 'code'];
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
              toast.error('Please fill in the required fields.');
              return;
            }

            formik.handleSubmit(e);
          }}
        >
          {' '}
          <label htmlFor="" className="mt-2">
            {translate('Status', Language)}{' '}
          </label>
          <div className="mt-2">
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
              {translate('Code', Language)}
            </label>
            <CustomInput
              type="color"
              label="Enter color Code"
              name="code"
              onCh={formik.handleChange('code')}
              onBl={formik.handleBlur('code')}
              val={formik.values.code}
            />
            <div className="error">
              {formik.touched.code && formik.errors.code}
            </div>
          </div>
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getcolorId !== undefined
              ? `${translate('Edit', Language)}`
              : `${translate('Add', Language)}`}{' '}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
