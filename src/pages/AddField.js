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
  label: yup.string().required('form name is Required'),
  type: yup.string().required('form comment is Required'),
  name: yup.string().required('form comment is Required'),
  rules: yup.string().required('form comment is Required'),
  data: yup.string().required('form comment is Required'),
});

const AddForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getfieldId = location.pathname.split('/')[5];
  const getformdId = location.pathname.split('/')[3];

  const newField = useSelector((state) => state.form);
  const {
    isSuccess,
    isError,
    isLoading,
    createdField,
    fieldLabel,
    fieldName,
    fielddata,
    fieldType,
    fieldRules,
    updatedField,
  } = newField;
  console.log(newField);
  console.log(getfieldId);

  useEffect(() => {
    if (getfieldId !== undefined) {
      dispatch(getAfield({ id: getfieldId, formId: getformdId }));
      dispatch(getfields(getformdId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getfieldId, getformdId]);

  useEffect(() => {
    if (isSuccess && createdField) {
      toast.success('Field added successfully');
      navigate('/admin/field-list');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    if (isSuccess && updatedField !== undefined) {
      toast.success('Field Updated Successfully!');
      navigate(`/admin/form/${getformdId}/field-list`);
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
    fieldRules,
    updatedField,
    getformdId,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      label: fieldLabel || '',
      type: fieldType || '',
      name: fieldName || '',
      rules: fieldRules || '',
      data: fielddata || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getfieldId !== undefined) {
        const data = { id: getfieldId, field: values, formId: getformdId };
        console.log(data);
        dispatch(updateAfield(data));
      } else {
        values.id = getformdId;
        dispatch(createAfield(values));
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
        {getfieldId !== undefined ? 'Edit' : 'Add'} form
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter form Name"
            name="label"
            onCh={formik.handleChange('label')}
            onBl={formik.handleBlur('label')}
            val={formik.values.label}
          />
          <div className="error">
            {formik.touched.label && formik.errors.label}
          </div>
          <CustomInput
            type="text"
            label="Enter form Name"
            name="name"
            onCh={formik.handleChange('name')}
            onBl={formik.handleBlur('name')}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="text"
            label="Enter type"
            name="type"
            onCh={formik.handleChange('type')}
            onBl={formik.handleBlur('type')}
            val={formik.values.type}
          />
          <div className="error">
            {formik.touched.type && formik.errors.type}
          </div>
          <CustomInput
            type="text"
            label="Enter type"
            name="rules"
            onCh={formik.handleChange('rules')}
            onBl={formik.handleBlur('rules')}
            val={formik.values.rules}
          />
          <div className="error">
            {formik.touched.rules && formik.errors.rules}
          </div>
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
