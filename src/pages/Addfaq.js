import React, { useEffect, useState } from 'react';
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
        az: yup.string().required(`Question for ${lang} is Required`),
      }),
      {}
    )
  ),

  answer: yup.object().shape(
    language.reduce(
      (acc, lang) => ({
        ...acc,
        az: yup.string().required(`Question for ${lang} is Required`),
      }),
      {}
    )
  ),
  active: yup.string(),
});

const Addfaq = (e) => {
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
    faqQuestion,
    faqAnswer,
    faqActive,
    updatedFaq,
  } = newFaq;

  useEffect(() => {
    if (getFaqId !== undefined) {
      dispatch(getAfaq(getFaqId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getFaqId]);

  useEffect(() => {
    if (isSuccess && createdFaq !== undefined && updatedFaq !== undefined) {
      toast.success('Faq Added Successfully!');
      // navigate('/admin/faq-list');
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    }
    if (isSuccess && createdFaq !== undefined && updatedFaq === undefined) {
      toast.success('Faq Added Successfully!');
      // navigate('/admin/faq-list');
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    }
    if (isSuccess && updatedFaq !== undefined && createdFaq === undefined) {
      toast.success('Faq Updated Successfully!');
      // navigate('/admin/faq-list');
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdFaq,
    faqQuestion,
    faqActive,
    faqAnswer,
    updatedFaq,
    navigate,
  ]);
  console.log(newFaq);
  const language = ['az', 'en'];

  // const [selectedLanguage, setSelectedLanguage] = useState(language[0]);
  // const selectedlanguage = 'az';
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      question: language.reduce((acc, lang) => {
        acc[lang] = faqQuestion ? faqQuestion[lang] || '' : '';
        return acc;
      }, {}),
      answer: language.reduce((acc, lang) => {
        acc[lang] = faqAnswer ? faqAnswer[lang] || '' : '';
        return acc;
      }, {}),
      active: faqActive ? '1' : '0',
    },

    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
      const updatedLanguages = language.filter((lang) => values.question[lang]);
      console.log(updatedLanguages);
      if (getFaqId !== undefined) {
        // Update existing FAQ for each language
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
        // Create a new FAQ for the first language and update for the rest
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

              // Diğer diller için update işlemi yap
              updatedLanguages.slice(1).forEach((lang) => {
                const updateData = {
                  id: createdFaq.payload.data.id,
                  faqData: {
                    question: values.question[lang],
                    answer: values.answer[lang],
                    active: values.active === '1' ? true : false,
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
      formik.setFieldValue('active', newFaq.faqActive ? '1' : '0');
    }
  }, [getFaqId, newFaq.faqActive]);

  return (
    <div>
      <h3 className="mb-4 title">
        {getFaqId !== undefined ? 'Edit' : 'Add'} Faq
      </h3>
      <div className="">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['answer', 'active'];
            const errors = {};
            requiredFields.forEach((fieldName) => {
              if (formik.touched[fieldName] && !formik.values[fieldName]) {
                errors[fieldName] = 'This field is Required';
              }
            });

            language.forEach((lang) => {
              if (formik.touched.question && !formik.values.question.az) {
                errors[`question.${lang}`] = `Question for ${lang} is Required`;
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

            {language.map((lang) => (
              <div key={lang}>
                <label>{`Enter Faq answer for ${lang}:`}</label>
                <CustomInput
                  type="text"
                  name={`answer.${lang}`}
                  onCh={formik.handleChange}
                  onBl={formik.handleBlur}
                  val={formik.values.answer[lang]}
                />
                <div className="error">
                  {formik.touched[`answer.${lang}`] &&
                    formik.errors[`answer.${lang}`]}
                </div>
              </div>
            ))}

            {language.map((lang) => (
              <div key={lang}>
                <label>{`Enter Faq question for ${lang}:`}</label>
                <CustomInput
                  type="text"
                  name={`question.${lang}`}
                  onCh={formik.handleChange}
                  onBl={formik.handleBlur}
                  val={formik.values.question[lang]}
                />
                <div className="error">
                  {formik.touched[`question.${lang}`] &&
                    formik.errors[`question.${lang}`]}
                </div>
              </div>
            ))}
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
