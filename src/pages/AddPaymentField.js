/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { language } from '../Language/languages';
import { useTranslation } from '../components/TranslationContext';
import {
  createApaymentfield,
  getApaymentfield,
  getpaymentfields,
  updateApaymentfield,
} from '../features/paymentform/paymentformSlice';
import { resetState } from '../features/formData/formDataSlice';

const AddPaymentField = () => {
  const { translate, Language } = useTranslation();

  let schema = yup.object({
    label: yup.object().shape(
      language.reduce(
        (acc, lang) => ({
          ...acc,
          az: yup.string().required(`${translate('Required_Fill', Language)}`),
        }),
        {}
      )
    ),
    type: yup.string().required(`${translate('Required_Fill', Language)}`),
    name: yup.string().required(`${translate('Required_Fill', Language)}`),
    required: yup.string(),
    data: yup.object().shape(
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getfieldId = location.pathname.split('/')[3];
  const newpaymentField = useSelector((state) => state.paymentfield);
  console.log(newpaymentField);
  const {
    isSuccess,
    isError,
    isLoading,
    createdpaymentfield,
    fieldpaymentData,
    fieldpaymentRequired,
    fieldpaymentName,
    fieldpaymentType,
    updatedpaymentfield,
  } = newpaymentField;

  useEffect(() => {
    if (getfieldId !== undefined) {
      language.forEach((selectedLanguage) => {
        dispatch(getApaymentfield(getfieldId, selectedLanguage));
        dispatch(getpaymentfields(selectedLanguage));
      });
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getfieldId]);

  const prevUpdatedFieldRef = useRef();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const prevUpdatedField = prevUpdatedFieldRef.current;
    if (
      isSuccess &&
      updatedpaymentfield !== undefined &&
      updatedpaymentfield !== prevUpdatedField
    ) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        toast.success(`${translate('Updated', Language)}`);
        prevUpdatedFieldRef.current = updatedpaymentfield;
        navigate('/admin/payment-field-list');
      }, 1000);
    }

    if (isError) {
      toast.error(`${translate('Wrong', Language)}`);
    }
  }, [isSuccess, isError, updatedpaymentfield]);
  useEffect(() => {
    if (
      isSuccess &&
      createdpaymentfield !== undefined &&
      updatedpaymentfield !== undefined
    ) {
      toast.success(`${translate('Added', Language)}`);
      navigate('/admin/payment-field-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isError) {
      toast.error(`${translate('Wrong', Language)}`);
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdpaymentfield,
    fieldpaymentData,
    updatedpaymentfield,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      label: language.reduce((acc, lang) => {
        acc[lang] = fieldpaymentData ? fieldpaymentData[lang]?.label || '' : '';
        return acc;
      }, {}),
      type: fieldpaymentType || '',
      name: fieldpaymentName || '',
      required: fieldpaymentRequired ? 1 : 0,
      data: language.reduce((acc, lang) => {
        acc[lang] = fieldpaymentData ? fieldpaymentData[lang]?.data || '' : '';
        return acc;
      }, {}),
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      const updatedLanguages = language.filter((lang) => values.label[lang]);
      console.log(updatedLanguages);
      if (getfieldId !== undefined) {
        updatedLanguages.forEach((lang) => {
          const data = {
            id: getfieldId,
            paymentfieldData: {
              label: values.label[lang],
              data: values.data[lang],
              type: values.type,
              name: values.name,
              required: values.required,
            },
            selectedLanguage: lang,
          };
          dispatch(updateApaymentfield(data));
        });
      } else {
        if (updatedLanguages.length > 0) {
          const firstLang = updatedLanguages[0];
          const createData = {
            values: {
              label: values.label[firstLang],
              data: values.data[firstLang],
              type: values.type,
              name: values.name,
              required: values.required,
            },
            selectedLanguage: firstLang,
          };
          console.log(createData);
          dispatch(createApaymentfield(createData))
            .then((createdfield) => {
              console.log(createdfield);

              updatedLanguages.slice(1).forEach((lang) => {
                const updateData = {
                  id: createdfield.payload.id,
                  paymentfieldData: {
                    label: values.label[lang],
                    data: values.data[lang],
                    type: values.type,
                    name: values.name,
                    required: values.required,
                  },
                  selectedLanguage: lang,
                };

                dispatch(updateApaymentfield(updateData));
              });

              formik.resetForm();
              setTimeout(() => {
                dispatch(resetState());
              }, 300);
            })
            .catch((error) => {
              console.error('Error creating Field:', error);
            });
        }
      }
    },
  });

  useEffect(() => {
    if (getfieldId === undefined) {
      formik.setFieldValue('required', 1);
    } else {
      formik.setFieldValue(
        'required',
        newpaymentField.fieldpaymentRequired ? 1 : 0
      );
    }
  }, [getfieldId, newpaymentField.fieldpaymentRequired]);

  // useEffect(() => {
  //   if (
  //     formik.values.type === '3' ||
  //     formik.values.type === '4' ||
  //     formik.values.type === '6'
  //   ) {
  //     formik.setFieldTouched('required', true);
  //     formik.setFieldTouched('data', true);
  //   } else {
  //     formik.setFieldValue('required', '');
  //     formik.setFieldValue('data', '');
  //     formik.setFieldTouched('required', false);
  //     formik.setFieldTouched('data', false);
  //   }
  // }, [formik.values.type]);
  const handleLanguageClick1 = (language) => {
    setSelectedLanguage1(language);
  };

  const handleLanguageClick2 = (language) => {
    setSelectedLanguage2(language);
  };

  return (
    <div>
      <h3 className="mb-4 title">
        {getfieldId !== undefined
          ? `${translate('Edit_Payment_Field', Language)}`
          : `${translate('Add_Payment_Field', Language)}`}
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['label', 'type'];
            const errors = {};
            requiredFields.forEach((fieldName) => {
              if (formik.touched[fieldName] && !formik.values[fieldName]) {
                errors[fieldName] = 'This field is Required';
              }
            });
            language.forEach((lang) => {
              const labelFieldName = `label.${lang}`;

              if (formik.touched.label && !formik.values.label[lang]) {
                errors[labelFieldName] = `Question for ${lang} is Required`;
              }
            });
            if (Object.keys(errors).length > 0) {
              toast.error(`${translate('Fill', Language)}`);
              return;
            }
            formik.handleSubmit(e);
          }}
        >
          <label htmlFor="" className="mt-2">
            {translate('Label', Language)}
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
                  name={`label.${lang}`}
                  onCh={formik.handleChange}
                  onBl={formik.handleBlur}
                  val={formik.values.label[lang]}
                />
                {formik.touched.label && formik.errors.label && (
                  <div className="error">{formik.errors.label[lang]}</div>
                )}
              </div>
            );
          })}
          <label htmlFor="" className="mt-2">
            {translate('Type', Language)}
          </label>
          <select
            className="text-[#637381] mt-2 bg-inherit w text-[15px] font-medium rounded-lg block w-1/8 p-2.5 focus:ring-0 hom"
            name="type"
            onChange={formik.handleChange('type')}
            onBlur={formik.handleBlur('type')}
            value={formik.values.type}
          >
            <option value="">Select Type</option>
            <option value={1}>text</option>
            <option value={2}>tel</option>
            <option value={3}>radio</option>
            <option value={4}>checkbox</option>
            <option value={5}>file</option> <option value={6}>select</option>
            <option value={7}>textarea</option>
          </select>
          <div className="error">
            {formik.touched.type && formik.errors.type}
          </div>
          <label htmlFor="" className="mt-2">
            {translate('Name', Language)}
          </label>
          <CustomInput
            type="text"
            label="Enter Name"
            name="name"
            onCh={formik.handleChange('name')}
            onBl={formik.handleBlur('name')}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <label htmlFor="" className="mt-2">
            {translate('Required', Language)}
          </label>
          <div className="my-2">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="required"
                  onChange={() => formik.setFieldValue('required', 1)}
                  onBlur={formik.handleBlur}
                  value={1}
                  checked={formik.values.required === 1}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2"> {translate('Required', Language)}</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="required"
                  onChange={() => formik.setFieldValue('required', 0)}
                  onBlur={formik.handleBlur}
                  value={0}
                  checked={formik.values.required === 0}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">
                  {translate('Not_Required', Language)}
                </span>
              </label>
            </div>
          </div>
          <div className="error">
            {formik.touched.required && formik.errors.required}
          </div>{' '}
          {formik.values.type === '3' ||
          formik.values.type === '4' ||
          formik.values.type === '6' ? (
            <>
              <label htmlFor="" className="mt-2">
                {translate('Data', Language)}
              </label>
              <div className="flex">
                {language.map((lang, index) => (
                  <label
                    key={lang}
                    className={`cursor-pointer capitalize border-[1px] border-[#5e3989]  rounded-t-lg px-5 ${
                      lang === selectedLanguage2
                        ? 'font-bold text-[#5e3989]'
                        : ''
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
                      name={`data.${lang}`}
                      onCh={formik.handleChange}
                      onBl={formik.handleBlur}
                      val={formik.values.data[lang]}
                    />
                    {formik.touched.data && formik.errors.data && (
                      <div className="error">{formik.errors.data[lang]}</div>
                    )}
                  </div>
                );
              })}
            </>
          ) : null}
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getfieldId !== undefined
              ? `${translate('Edit', Language)}`
              : `${translate('Add', Language)}`}{' '}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentField;
