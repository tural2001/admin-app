import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { useLocation, useNavigate } from 'react-router-dom';
import {
  createAuser,
  getAuser,
  resetState,
  updateAuser,
} from '../features/users/usersSlice';

let schema = yup.object({
  name: yup.string().required('Name is Required'),
  email: yup.string().required('Email is Required'),
  password: yup.string().required('Password is Required'),
});

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getuserId = location.pathname.split('/')[3];
  const newUser = useSelector((state) => state.user);
  const {
    isSuccess,
    isError,
    isLoading,
    createdUser,
    userName,
    userEmail,
    userPassword,
    updatedUser,
  } = newUser;

  useEffect(() => {
    if (getuserId !== undefined) {
      dispatch(getAuser(getuserId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getuserId]);

  useEffect(() => {
    if (isSuccess && createdUser) {
      toast.success('User Added Successfully!');
      navigate('/admin/user-list');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    if (isSuccess && updatedUser !== undefined) {
      toast.success('User Updated Successfully!');
      navigate('/admin/user-list');
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdUser,
    userName,
    userEmail,
    userPassword,
    updatedUser,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userName || '',
      email: userEmail || '',
      password: userPassword || '',
    },
    validationSchema: schema,

    onSubmit: (values) => {
      if (getuserId !== undefined) {
        const data = { id: getuserId, userData: values };
        dispatch(updateAuser(data));
      } else {
        dispatch(createAuser(values));
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
        {getuserId !== undefined ? 'Edit' : 'Add'} User
      </h3>
      <div className="">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const isNameTouched = formik.touched.name;
            const isEmailTouched = formik.touched.email;
            const isPasswordTouched = formik.touched.password;
            const nameValue = formik.values.name;
            const emailValue = formik.values.email;
            const passwordValue = formik.values.password;
            const errors = {};
            if (isNameTouched && !nameValue) {
              errors.name = 'Name is Required';
            }
            if (isPasswordTouched && !passwordValue) {
              errors.password = 'Passwords are Required';
            }
            if (isEmailTouched && !emailValue) {
              errors.email = 'Email is Required';
            }
            if (Object.keys(errors).length > 0) {
              toast.error('Please fill in the required fields.');
              return;
            }
            formik.handleSubmit(e);
          }}
        >
          <div className="mt-4">
            <CustomInput
              type="text"
              label="Enter user Name"
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
              label="Enter user Email"
              name="email"
              onCh={formik.handleChange('email')}
              onBl={formik.handleBlur('email')}
              val={formik.values.email}
            />
            <div className="error">
              {formik.touched.email && formik.errors.email}
            </div>
            <CustomInput
              type="password"
              label="Enter user Password"
              name="password"
              onCh={formik.handleChange('password')}
              onBl={formik.handleBlur('password')}
              val={formik.values.password}
            />
            <div className="error">
              {formik.touched.password && formik.errors.password}
            </div>
          </div>
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getuserId !== undefined ? 'Edit' : 'Add'} user
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
