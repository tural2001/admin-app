/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createAfield,
  getAfield,
  getfields,
  resetState,
  updateAfield,
} from '../features/form/formSlice';

let schema = yup.object({
  label: yup.string().required('Label is Required'),
  type: yup.string().required('Type is Required'),
  name: yup.string().required('Name is Required'),
  required: yup.string(),
  data: yup.string(),
});

const AddForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getfieldId = location.pathname.split('/')[3];
  const newField = useSelector((state) => state.field);
  console.log(newField);
  const {
    isSuccess,
    isError,
    isLoading,
    createdField,
    fieldLabel,
    fieldName,
    fielddata,
    fieldType,
    fieldRequired,
    updatedField,
  } = newField;
  console.log(newField);

  useEffect(() => {
    if (getfieldId !== undefined) {
      dispatch(getAfield(getfieldId));
      dispatch(getfields());
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getfieldId]);

  useEffect(() => {
    if (isSuccess && createdField === '') {
      toast.success('Field Added Successfully');
      navigate('/admin/field-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isSuccess && updatedField !== undefined) {
      toast.success('Field Updated Successfully!');
      navigate(`/admin/field-list`);
    }
    if (isError) {
      toast.error('Something went wrong');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdField,
    fieldLabel,
    fieldName,
    fielddata,
    fieldType,
    fieldRequired,
    updatedField,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      label: fieldLabel || '',
      type: fieldType || '',
      name: fieldName || '',
      required: fieldRequired ? 1 : 0,
      data: fielddata || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getfieldId !== undefined) {
        const data = { id: getfieldId, field: values };
        console.log(data);
        dispatch(updateAfield(data));
      } else {
        dispatch(createAfield(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  useEffect(() => {
    if (getfieldId === undefined) {
      formik.setFieldValue('required', '1');
    } else {
      formik.setFieldValue('required', newField.fieldRequired ? '1' : '0');
    }
  }, [getfieldId, newField.fieldRequired]);

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

  return (
    <div>
      <h3 className="mb-4 title">
        {getfieldId !== undefined ? 'Edit' : 'Add'} Form
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
            if (Object.keys(errors).length > 0) {
              toast.error('Please fill in the required fields.');
              return;
            }
            formik.handleSubmit(e);
          }}
        >
          <label htmlFor="" className="mt-2">
            Label
          </label>
          <CustomInput
            type="text"
            label="Enter Label"
            name="label"
            onCh={formik.handleChange('label')}
            onBl={formik.handleBlur('label')}
            val={formik.values.label}
          />
          <div className="error">
            {formik.touched.label && formik.errors.label}
          </div>
          <label htmlFor="" className="mt-2">
            Type
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
            Name
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
            Required
          </label>
          <div className="my-2">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="required"
                  onChange={() => formik.setFieldValue('required', '1')}
                  onBlur={formik.handleBlur}
                  value="1"
                  checked={formik.values.required === '1'}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">Required</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="required"
                  onChange={() => formik.setFieldValue('required', '0')}
                  onBlur={formik.handleBlur}
                  value="0"
                  checked={formik.values.required === '0'}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">Not required</span>
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
                Data
              </label>
              <CustomInput
                type="text"
                label="Enter data"
                name="data"
                onCh={formik.handleChange('data')}
                onBl={formik.handleBlur('data')}
                val={formik.values.data}
              />
              <div className="error">
                {formik.touched.data && formik.errors.data}
              </div>
            </>
          ) : null}
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getfieldId !== undefined ? 'Edit' : 'Add'} field
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
