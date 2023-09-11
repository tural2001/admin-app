/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { createAfaq, getAfaq, updateAfaq } from '../features/faq/faqSlice';

import { resetState } from '../features/faq/faqSlice';
import { useLocation, useNavigate } from 'react-router-dom';

let schema = yup.object({
  question: yup.string().required('Question is Required'),
  answer: yup.string().required('Answer is Required'),
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
    if (isSuccess && createdFaq !== undefined) {
      toast.success('Faq Added Successfully!');
      navigate('/admin/faq-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isSuccess && updatedFaq !== undefined) {
      toast.success('Faq Updated Successfully!');
      navigate('/admin/faq-list');
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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      question: faqQuestion || '',
      answer: faqAnswer || '',
      active: faqActive ? 1 : 0,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      if (getFaqId !== undefined) {
        const data = { id: getFaqId, faqData: values };
        dispatch(updateAfaq(data));
      } else {
        dispatch(createAfaq(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
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
            const requiredFields = ['question', 'answer', 'active'];
            const errors = {};
            requiredFields.forEach((fieldName) => {
              if (formik.touched[fieldName] && !formik.values[fieldName]) {
                errors[fieldName] = 'This field is Required';
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
            <label htmlFor="" className="mt-2">
              Question
            </label>
            <CustomInput
              type="text"
              label="Enter Faq Question"
              name="question"
              onCh={formik.handleChange('question')}
              onBl={formik.handleBlur('question')}
              val={formik.values.question}
            />
            <div className="error">
              {formik.touched.question && formik.errors.question}
            </div>
            <label htmlFor="" className="mt-2">
              Answer
            </label>
            <CustomInput
              type="text"
              label="Enter Faq Answer"
              name="answer"
              onCh={formik.handleChange('answer')}
              onBl={formik.handleBlur('answer')}
              val={formik.values.answer}
            />
            <div className="error">
              {formik.touched.answer && formik.errors.answer}
            </div>
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
