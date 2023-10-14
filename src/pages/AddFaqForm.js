/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef } from 'react';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  createAfaqform,
  getAfaqform,
  resetState,
  updateAfaqform,
} from '../features/faqform/faqformSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../components/TranslationContext';
import { debounce } from 'lodash';

const AddFaqForm = (e) => {
  const { translate, Language } = useTranslation();

  let schema = yup.object({
    name: yup.string().required(`${translate('Required_Fill', Language)}`),
    phone: yup.string().required(`${translate('Required_Fill', Language)}`),
    question: yup.string().required(`${translate('Required_Fill', Language)}`),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getfaqformId = location.pathname.split('/')[3];
  const newfaqform = useSelector((state) => state.faqform);
  const {
    isSuccess,
    isError,
    createdfaqform,
    faqformName,
    faqformPhone,
    faqformQuestion,
    updatedfaqform,
  } = newfaqform;

  const debouncedApiCalls = useCallback(
    debounce(() => {
      if (getfaqformId !== undefined) {
        dispatch(getAfaqform(getfaqformId));
      } else {
        dispatch(resetState());
      }
    }, 500),
    [getfaqformId, dispatch]
  );

  useEffect(() => {
    debouncedApiCalls();
  }, [debouncedApiCalls]);

  const prevUpdatedFormRef = useRef();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const prevUpdatedForm = prevUpdatedFormRef.current;
    if (
      isSuccess &&
      updatedfaqform !== undefined &&
      updatedfaqform !== prevUpdatedForm
    ) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        toast.success(`${translate('Updated', Language)}`);
        prevUpdatedFormRef.current = updatedfaqform;
        navigate('/admin/faq-form-list');
      }, 1000);
    }
    if (
      isSuccess &&
      createdfaqform !== undefined &&
      updatedfaqform !== undefined
    ) {
      toast.success(`${translate('Added', Language)}`);
      navigate('/admin/faq-form-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isError) {
      toast.error(`${translate('Wrong', Language)}`);
    }
  }, [isSuccess, isError, createdfaqform, updatedfaqform, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      question: faqformQuestion || '',
      name: faqformName || '',
      phone: faqformPhone || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getfaqformId !== undefined) {
        const data = { id: getfaqformId, faqformData: values };
        dispatch(updateAfaqform(data));
      } else {
        dispatch(createAfaqform(values));
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
        {getfaqformId !== undefined
          ? `${translate('Edit_Faq_Form', Language)}`
          : `${translate('Add_Faq_Form', Language)}`}{' '}
      </h3>
      <div className="">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['name', 'phone', 'question'];
            const errors = {};
            requiredFields.forEach((fieldName) => {
              if (formik.touched[fieldName] && !formik.values[fieldName]) {
                errors[fieldName] = 'This field is Required';
              }
            });
            if (Object.keys(errors).length > 0) {
              toast.error(`${translate('Fill', Language)}`);
              return;
            }
            formik.handleSubmit(e);
          }}
        >
          <div className="mt-2">
            <label htmlFor="" className="mt-2">
              {translate('Name', Language)}
            </label>
            <CustomInput
              type="text"
              label="Enter Faq Form name"
              name="name"
              onCh={formik.handleChange('name')}
              onBl={formik.handleBlur('name')}
              val={formik.values.name}
            />
            <div className="error">
              {formik.touched.name && formik.errors.name}
            </div>
            <label htmlFor="" className="mt-2">
              {translate('Phone', Language)}
            </label>
            <CustomInput
              type="text"
              label="Enter Faq Form phone"
              name="phone"
              onCh={formik.handleChange('phone')}
              onBl={formik.handleBlur('phone')}
              val={formik.values.phone}
            />
            <div className="error">
              {formik.touched.phone && formik.errors.phone}
            </div>
            <label htmlFor="" className="mt-2">
              {translate('Question', Language)}
            </label>
            <CustomInput
              type="text"
              label="Enter Faq Form Question"
              name="question"
              onCh={formik.handleChange('question')}
              onBl={formik.handleBlur('question')}
              val={formik.values.question}
            />
            <div className="error">
              {formik.touched.question && formik.errors.question}
            </div>
          </div>
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getfaqformId !== undefined
              ? `${translate('Edit', Language)}`
              : `${translate('Add', Language)}`}{' '}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFaqForm;
