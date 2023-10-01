/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createAfaq, getAfaq, updateAfaq } from '../features/faq/faqSlice';

import { resetState } from '../features/faq/faqSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { language } from '../Language/languages';

let schema = yup.object({
  question: yup.object().shape(
    language.reduce(
      (acc, lang) => ({
        ...acc,
        az: yup.string().required(`Question for az is Required`),
      }),
      {}
    )
  ),

  answer: yup.object().shape(
    language.reduce(
      (acc, lang) => ({
        ...acc,
        az: yup.string().required(`Answer for az is Required`),
      }),
      {}
    )
  ),
  active: yup.string(),
});

const Addfaq = (e) => {
  const [selectedLanguage1, setSelectedLanguage1] = useState('az');
  const [selectedLanguage2, setSelectedLanguage2] = useState('az');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getFaqId = location.pathname.split('/')[3];
  const newFaq = useSelector((state) => state.faq);
  const {
    isSuccess,
    isError,
    isLoading,
    createdFaq,
    FaqData,
    updatedFaq,
    FaqActive,
  } = newFaq;
  console.log(newFaq);
  useEffect(() => {
    if (getFaqId !== undefined) {
      language.forEach((selectedLanguage) => {
        dispatch(getAfaq(getFaqId, selectedLanguage));
      });
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getFaqId]);

  const prevUpdatedFaqRef = useRef();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const prevUpdatedFaq = prevUpdatedFaqRef.current;
    if (
      isSuccess &&
      updatedFaq !== undefined &&
      updatedFaq !== prevUpdatedFaq
    ) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        toast.success('Faq Updated Successfully!');
        prevUpdatedFaqRef.current = updatedFaq;
        navigate('/admin/faq-list');
      }, 1000);
    }

    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [isSuccess, isError, updatedFaq]);
  useEffect(() => {
    if (isSuccess && createdFaq !== undefined && updatedFaq !== undefined) {
      toast.success('Faq Added Successfully!');
      navigate('/admin/faq-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdFaq,
    FaqData,
    FaqActive,
    updatedFaq,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      question: language.reduce((acc, lang) => {
        acc[lang] = FaqData ? FaqData[lang]?.data?.question || '' : '';
        return acc;
      }, {}),
      answer: language.reduce((acc, lang) => {
        acc[lang] = FaqData ? FaqData[lang]?.data?.answer || '' : '';
        return acc;
      }, {}),
      active: FaqActive ? 1 : 0,
    },

    validationSchema: schema,
    validate: (values) => {
      const errors = {};

      language.forEach((lang) => {
        const questionKey = `question.${lang}`;
        const answerKey = `answer.${lang}`;

        if (values[questionKey] && !values[answerKey]) {
          errors[answerKey] = `Answer for ${lang} is Required`;
        }
      });

      return errors;
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      const updatedLanguages = language.filter((lang) => values.question[lang]);
      console.log(updatedLanguages);
      if (getFaqId !== undefined) {
        updatedLanguages.forEach((lang) => {
          const data = {
            id: getFaqId,
            faqData: {
              question: values.question[lang],
              answer: values.answer[lang],
              active: values.active === '1' ? true : false,
            },
            selectedLanguage: lang,
          };
          dispatch(updateAfaq(data));
        });
      } else {
        if (updatedLanguages.length > 0) {
          const firstLang = updatedLanguages[0];
          const createData = {
            values: {
              question: values.question[firstLang],
              answer: values.answer[firstLang],
              active: values.active === '1' ? true : false,
            },
            selectedLanguage: firstLang,
          };
          dispatch(createAfaq(createData))
            .then((createdFaq) => {
              console.log(createdFaq);

              updatedLanguages.slice(1).forEach((lang) => {
                const updateData = {
                  id: createdFaq.payload.data.id,
                  faqData: {
                    question: values.question[lang],
                    answer: values.answer[lang],
                  },
                  selectedLanguage: lang,
                };

                dispatch(updateAfaq(updateData));
              });

              formik.resetForm();
              setTimeout(() => {
                dispatch(resetState());
              }, 300);
            })
            .catch((error) => {
              console.error('Error creating FAQ:', error);
            });
        }
      }
    },
  });

  useEffect(() => {
    if (getFaqId === undefined) {
      formik.setFieldValue('active', '1');
    } else {
      formik.setFieldValue('active', newFaq.FaqActive ? '1' : '0');
    }
  }, [getFaqId, newFaq.FaqActive]);

  const handleLanguageClick1 = (language) => {
    setSelectedLanguage1(language);
  };

  const handleLanguageClick2 = (language) => {
    setSelectedLanguage2(language);
  };
  return (
    <div>
      <h3 className="mb-4 title">
        {getFaqId !== undefined ? 'Edit' : 'Add'} Faq
      </h3>
      <div className="">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['answer', 'question'];
            const errors = {};
            requiredFields.forEach((fieldName) => {
              if (formik.touched[fieldName] && !formik.values[fieldName]) {
                errors[fieldName] = 'This field is Required';
              }
            });

            language.forEach((lang) => {
              const questionFieldName = `question.${lang}`;
              const answerFieldName = `answer.${lang}`;

              if (formik.touched.question && !formik.values.question[lang]) {
                errors[questionFieldName] = `Question for ${lang} is Required`;
              }

              if (formik.touched.answer && !formik.values.answer[lang]) {
                errors[answerFieldName] = `Answer for ${lang} is Required`;
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
          <label htmlFor="" className="mt-2">
            Status
          </label>
          <div className="mt-2">
            <div className="my-4">
              <div className="mt-1">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="active"
                    onChange={() => formik.setFieldValue('active', '1')}
                    onBlur={formik.handleBlur}
                    value="1"
                    checked={formik.values.active === '1'}
                    className="text-blue-500 form-radio h-4 w-4"
                  />
                  <span className="ml-2">Active</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    name="active"
                    onChange={() => formik.setFieldValue('active', '0')}
                    onBlur={formik.handleBlur}
                    value="0"
                    checked={formik.values.active === '0'}
                    className="text-blue-500 form-radio h-4 w-4"
                  />
                  <span className="ml-2">Not Active</span>
                </label>
              </div>
            </div>
            <div className="error">
              {formik.touched.active && formik.errors.active}
            </div>
            <label htmlFor="" className="my-2">
              Question
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
                    name={`question.${lang}`}
                    onCh={formik.handleChange}
                    onBl={formik.handleBlur}
                    val={formik.values.question[lang]}
                  />
                  {formik.touched.question && formik.errors.question && (
                    <div className="error">{formik.errors.question[lang]}</div>
                  )}
                </div>
              );
            })}
            <label htmlFor="" className="my-2">
              Answer
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
            {language.map((lang) => {
              return (
                <div
                  key={lang}
                  className={lang === selectedLanguage1 ? '' : 'hidden'}
                >
                  <CustomInput
                    type="text"
                    name={`answer.${lang}`}
                    onCh={formik.handleChange}
                    onBl={formik.handleBlur}
                    val={formik.values.answer[lang]}
                  />
                  {formik.touched.answer && formik.errors.answer && (
                    <div className="error">{formik.errors.answer[lang]}</div>
                  )}
                </div>
              );
            })}{' '}
          </div>
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getFaqId !== undefined ? 'Edit' : 'Add'} Faq
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addfaq;
