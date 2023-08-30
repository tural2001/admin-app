import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createAform,
  getAform,
  resetState,
  updateAform,
} from '../features/form/formSlice';

let schema = yup.object({
  name: yup.string().required('form name is Required'),
  handle: yup.string().required('form comment is Required'),
  active: yup.string(),
});

const AddForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getformId = location.pathname.split('/')[3];
  const newForm = useSelector((state) => state.form);
  const {
    isSuccess,
    isError,
    isLoading,
    createdForm,
    formActive,
    formName,
    formHandle,
    updatedForm,
  } = newForm;

  useEffect(() => {
    if (getformId !== undefined) {
      dispatch(getAform(getformId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getformId]);

  useEffect(() => {
    if (isSuccess && createdForm) {
      toast.success('form added successfully');
      navigate('/admin/form-list');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    if (isSuccess && updatedForm !== undefined) {
      toast.success('form Updated Successfully!');
      navigate('/admin/form-list');
    }
    if (isError) {
      toast.error('Something went wrong');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdForm,
    formActive,
    formName,
    formHandle,
    updatedForm,
    navigate,
  ]);

  console.log(newForm);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: formName || '',
      handle: formHandle || '',
      active: formActive ? 1 : 0,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getformId !== undefined) {
        const data = { id: getformId, formData: values };
        dispatch(updateAform(data));
      } else {
        dispatch(createAform(values));
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
        {getformId !== undefined ? 'Edit' : 'Add'} form
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="my-4">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="active"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value="1"
                  checked={
                    newForm.formActive ? 1 : 0 || formik.values.active === '1'
                  }
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

          <CustomInput
            type="text"
            label="Enter form Name"
            name="name"
            onCh={formik.handleChange('name')}
            onBl={formik.handleBlur('name')}
            val={formik.values.name}
            id="forms"
          />
          <div className="error">
            {formik.touched.former_name && formik.errors.former_name}
          </div>
          <CustomInput
            type="text"
            label="Enter Handle"
            name="handle"
            onCh={formik.handleChange('handle')}
            onBl={formik.handleBlur('handle')}
            val={formik.values.handle}
            id="forms"
          />
          <div className="error">
            {formik.touched.handle && formik.errors.handle}
          </div>
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getformId !== undefined ? 'Edit' : 'Add'} form
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddForm;
