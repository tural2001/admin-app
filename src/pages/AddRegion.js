/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useLocation, useNavigate } from 'react-router-dom';
import {
  getAregion,
  resetState,
  updateAregion,
} from '../features/regions/regionSlice';
import { getcolors } from '../features/color/colorSlice';
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
  description: yup.object().shape(
    language.reduce(
      (acc, lang) => ({
        ...acc,
        az: yup.string().required(`Description for az is Required`),
      }),
      {}
    )
  ),
  active: yup.string(),
  color_id: yup.string().required('Color is Required'),
  handle: yup.string(),
});
const AddRegion = () => {
  const [selectedLanguage1, setSelectedLanguage1] = useState('az');
  const [selectedLanguage2, setSelectedLanguage2] = useState('az');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getregionId = location.pathname.split('/')[3];
  const newRegion = useSelector((state) => state.region);

  console.log(newRegion);
  const {
    isSuccess,
    isError,
    RegionData,
    regionHandle,
    regionActive,
    regionColor,
    updatedRegion,
  } = newRegion;

  useEffect(() => {
    if (getregionId !== undefined) {
      language.forEach((selectedLanguage) => {
        dispatch(getAregion(getregionId, selectedLanguage));
      });
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getregionId]);

  const prevUpdatedRegionRef = useRef();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const prevUpdatedRegion = prevUpdatedRegionRef.current;
    if (
      isSuccess &&
      updatedRegion !== undefined &&
      updatedRegion !== prevUpdatedRegion
    ) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        toast.success('Region Updated Successfully!');
        prevUpdatedRegionRef.current = updatedRegion;
        navigate('/admin/region-list');
      }, 1000);
    }

    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [isSuccess, isError, updatedRegion]);
  useEffect(() => {
    dispatch(getcolors());
  }, []);
  const colorState = useSelector((state) => state.color.colors.data);
  console.log(colorState);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: language.reduce((acc, lang) => {
        acc[lang] = RegionData ? RegionData[lang]?.data?.name || '' : '';
        return acc;
      }, {}),
      description: language.reduce((acc, lang) => {
        acc[lang] = RegionData ? RegionData[lang]?.data?.description || '' : '';
        return acc;
      }, {}),
      active: regionActive ? 1 : 0,
      color_id: regionColor || '',
      handle: regionHandle || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      const updatedLanguages = language.filter((lang) => values.name[lang]);
      console.log(updatedLanguages);
      if (getregionId !== undefined) {
        updatedLanguages.forEach((lang) => {
          const data = {
            id: getregionId,
            regionData: {
              name: values.name[lang],
              description: values.description[lang],
              handle: values.handle,
              color_id: values.color_id,
              active: values.active === 1 ? 1 : 0,
            },
            selectedLanguage: lang,
          };
          dispatch(updateAregion(data));
        });
      }
    },
  });

  useEffect(() => {
    if (getregionId === undefined) {
      formik.setFieldValue('active', 1);
    } else {
      formik.setFieldValue('active', newRegion.regionActive ? 1 : 0);
    }
  }, [getregionId, newRegion.regionActive]);

  const handleLanguageClick1 = (language) => {
    setSelectedLanguage1(language);
  };
  const handleLanguageClick2 = (language) => {
    setSelectedLanguage2(language);
  };

  const { translate, Language } = useTranslation();

  return (
    <div>
      <h3 className="mb-4 title">
        {getregionId !== undefined
          ? `${translate('Edit_Region', Language)}`
          : `${translate('Add_Regipn', Language)}`}{' '}
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['name', 'description', 'color_id'];
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
                ] = `description for ${lang} is Required`;
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
          <label htmlFor="" className="mt-2">
            {translate('Color', Language)}
          </label>
          <select
            className="text-[#637381] mt-2 bg-inherit w text-[15px] font-medium rounded-lg block w-1/8 p-2.5 focus:ring-0 hom"
            id="color"
            name="color_id"
            onChange={formik.handleChange('color_id')}
            onBlur={formik.handleBlur('color_id')}
            value={formik.values.color_id}
          >
            <option value="">{translate('Select_Color', Language)}</option>
            {colorState?.map((color) => (
              <option key={color.id} value={color.id}>
                {color.name}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.color_id && formik.errors.color_id}
          </div>
          <label htmlFor="" className="mt-2">
            {translate('Name', Language)}
          </label>
          <div className="flex">
            {language.map((lang, index) => (
              <label
                key={lang}
                className={`cursor-pointer capitalize border-[1px] border-[#5e3989]  rounded-t-lg px-5 ${
                  lang === selectedLanguage1 ? 'font-bold text-[#5e3989]' : ''
                }`}
                onClick={() => handleLanguageClick1(lang)}
              >
                {lang}
              </label>
            ))}
          </div>
          {language.map((lang) => {
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
                  <div className="error">{formik.errors.name[lang]}</div>
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
                  lang === selectedLanguage2 ? 'font-bold text-[#5e3989]' : ''
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
                <CustomInput
                  type="text"
                  name={`description.${lang}`}
                  onCh={formik.handleChange}
                  onBl={formik.handleBlur}
                  val={formik.values.description[lang]}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="error">{formik.errors.description[lang]}</div>
                )}
              </div>
            );
          })}
          <label htmlFor="" className="mt-2">
            {translate('Handle', Language)}
          </label>
          <CustomInput
            type="text"
            label="Enter Region Handle"
            name="handle"
            onCh={formik.handleChange('handle')}
            onBl={formik.handleBlur('handle')}
            val={formik.values.handle}
            readOnly={'readOnly'}
          />
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getregionId !== undefined
              ? `${translate('Edit', Language)}`
              : `${translate('Add', Language)}`}{' '}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRegion;
