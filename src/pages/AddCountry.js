/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { useLocation, useNavigate } from 'react-router-dom';
import {
  createAcountry,
  getAcountry,
  updateAcountry,
  resetState,
} from '../features/countries/countriesSlice';
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
  active: yup.string(),
});

const AddCountry = (e) => {
  const [selectedLanguage1, setSelectedLanguage1] = useState('az');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getcountryId = location.pathname.split('/')[3];
  const newCountry = useSelector((state) => state.country);
  const {
    isSuccess,
    isError,
    isLoading,
    createdCountry,
    CountryData,
    countryActive,
    updatedCountry,
  } = newCountry;

  useEffect(() => {
    if (getcountryId !== undefined) {
      language.forEach((selectedLanguage) => {
        dispatch(getAcountry(getcountryId, selectedLanguage));
      });
    } else {
      dispatch(resetState());
    }
  }, [getcountryId]);

  const prevUpdatedCountyRef = useRef();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const prevUpdatedCountry = prevUpdatedCountyRef.current;
    if (
      isSuccess &&
      updatedCountry !== undefined &&
      updatedCountry !== prevUpdatedCountry
    ) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        toast.success('Country Updated Successfully!');
        prevUpdatedCountyRef.current = updatedCountry;
        navigate('/admin/country-list');
      }, 1000);
    }
    if (
      isSuccess &&
      createdCountry !== undefined &&
      updatedCountry !== undefined
    ) {
      toast.success('Country Added Successfully!');
      navigate('/admin/country-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [isSuccess, isError, createdCountry, updatedCountry, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: language.reduce((acc, lang) => {
        acc[lang] = CountryData ? CountryData[lang]?.data?.name || '' : '';
        return acc;
      }, {}),
      active: countryActive ? 1 : 0,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      const updatedLanguages = language.filter((lang) => values.name[lang]);
      console.log(updatedLanguages);
      if (getcountryId !== undefined) {
        updatedLanguages.forEach((lang) => {
          const data = {
            id: getcountryId,
            countryData: {
              name: values.name[lang],
              active: values.active === 1 ? 1 : 0,
            },
            selectedLanguage: lang,
          };
          dispatch(updateAcountry(data));
        });
      } else {
        if (updatedLanguages.length > 0) {
          const firstLang = updatedLanguages[0];
          const createData = {
            values: {
              name: values.name[firstLang],
              active: values.active === 1 ? 1 : 0,
            },
            selectedLanguage: firstLang,
          };
          dispatch(createAcountry(createData))
            .then((createdCountry) => {
              console.log(createdCountry);

              updatedLanguages.slice(1).forEach((lang) => {
                const updateData = {
                  id: createdCountry.payload.id,
                  countryData: {
                    name: values.name[lang],
                    active: values.active === 1 ? 1 : 0,
                  },
                  selectedLanguage: lang,
                };

                dispatch(updateAcountry(updateData));
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
    if (getcountryId === undefined) {
      formik.setFieldValue('active', 1);
    } else {
      formik.setFieldValue('active', newCountry.countryActive ? 1 : 0);
    }
  }, [getcountryId, newCountry.countryActive]);

  const handleLanguageClick1 = (language) => {
    setSelectedLanguage1(language);
  };

  return (
    <div>
      <h3 className="mb-4 title">
        {getcountryId !== undefined ? 'Edit' : 'Add'} Country
      </h3>
      <div className="">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['name'];
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
          <div className="mt-4">
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
              Name
            </label>{' '}
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
          </div>
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getcountryId !== undefined ? 'Edit' : 'Add'} country
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCountry;
