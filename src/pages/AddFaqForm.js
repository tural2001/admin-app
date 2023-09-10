import React, { useEffect } from 'react';
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

let schema = yup.object({
  name: yup.string().required('Name is Required'),
  phone: yup.string().required('Phone is Required'),
  question: yup.string().required('Question is Required'),
});

const AddFaqForm = (e) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getfaqformId = location.pathname.split('/')[3];
  const newfaqform = useSelector((state) => state.faqform);
  const {
    isSuccess,
    isError,
    isLoading,
    createdfaqform,
    faqformName,
    faqformPhone,
    faqformQuestion,
    updatedfaqform,
  } = newfaqform;

  useEffect(() => {
    if (getfaqformId !== undefined) {
      dispatch(getAfaqform(getfaqformId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getfaqformId]);

  useEffect(() => {
    if (isSuccess && createdfaqform !== undefined) {
      toast.success('faqform Added Successfully!');
      navigate('/admin/faq-form-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isSuccess && updatedfaqform !== undefined) {
      toast.success('faqform Updated Successfully!');
      navigate('/admin/faq-form-list');
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdfaqform,
    faqformName,
    faqformPhone,
    faqformQuestion,
    updatedfaqform,
    navigate,
  ]);

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
        {getfaqformId !== undefined ? 'Edit' : 'Add'} Faq Form
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
              toast.error('Please fill in the required fields.');
              return;
            }
            formik.handleSubmit(e);
          }}
        >
          <div className="mt-2">
            <label htmlFor="" className="mt-2">
              Name
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
              Phone
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
              Question
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
            {getfaqformId !== undefined ? 'Edit' : 'Add'} Faq Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFaqForm;
