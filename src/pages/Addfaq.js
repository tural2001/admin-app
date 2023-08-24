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
  question: yup.string().required('Title is Required'),
  answer: yup.string().required('Description is Required'),
  active: yup.string().required('Required'),
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
    if (isSuccess && createdFaq) {
      toast.success('Faq Added Successfully!');
      navigate('/admin/faq-list');
      window.location.reload();
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

  console.log(newFaq);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      question: faqQuestion || '',
      answer: faqAnswer || '',
      active: faqActive || '',
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

  return (
    <div>
      <h3 className="mb-4 title">
        {getFaqId !== undefined ? 'Edit' : 'Add'} Faq
      </h3>
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-4">
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
            <div className="my-4">
              <div className="mt-1">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="active"
                    onChange={formik.handleChange}
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
                    onChange={formik.handleChange}
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
          </div>
          <button className="bg-blue-300 p-3  rounded-xl my-5" type="submit">
            {getFaqId !== undefined ? 'Edit' : 'Add'} Faq
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addfaq;
