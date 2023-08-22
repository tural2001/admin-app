import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  createAfaq,
  getAfaq,
  getfaqs,
  updateAfaq,
} from '../features/faq/faqSlice';

import { resetState } from '../features/faq/faqSlice';
import { useLocation, useNavigate } from 'react-router-dom';

let schema = yup.object({
  question: yup.string().required('Title is Required'),
  answer: yup.string().required('Description is Required'),
  active: yup.string().required('Active'),
});

const Addfaq = (e) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getFaqId = location.pathname.split('/')[3];

  // useEffect(() => {
  //   dispatch(getfaqs());
  // }, [dispatch]);

  const newFaq = useSelector((state) => state.faq);
  const faqstate = useSelector((state) => state.faq.faqs.data);
  console.log(faqstate);
  const {
    isSuccess,
    isError,
    isLoading,
    createdFaq,
    updatedFaq,
    faqQuestion,
    faqAnswer,
    faqActive,
  } = newFaq;
  console.log(newFaq);

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
    }
    if (isSuccess && updatedFaq !== undefined) {
      toast.success('Faq Updated Successfully!');
      navigate('/admin/blog-list');
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdFaq,
    updatedFaq,
    faqQuestion,
    faqActive,
    faqAnswer,
    navigate,
  ]);

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
            <select
              name="active"
              onChange={formik.handleChange('active')}
              onBlur={formik.handleBlur('active')}
              value={formik.values.active}
              className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id=""
            >
              <option value="1">Active</option>
              <option value="0">No Active</option>
            </select>
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
