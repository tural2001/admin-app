/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
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
import { useTranslation } from '../components/TranslationContext';

const AddUser = () => {
  const { translate, Language } = useTranslation();

  let schema = yup.object({
    name: yup.string().required(`${translate('Required_Fill', Language)}`),
    email: yup.string().required(`${translate('Required_Fill', Language)}`),
    password: yup
      .string()
      .required(`${translate('Required_Fill', Language)}`)
      .test(
        'min-length',
        `${translate('Password_v_1', Language)}`,
        (value) => (value || '').length >= 8
      )
      .test(
        'contains-uppercase-lowercase',
        `${translate('Password_v_2', Language)}`,
        (value) => /^(?=.*[a-z])(?=.*[A-Z])/.test(value)
      ),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getuserId = location.pathname.split('/')[3];
  const newUser = useSelector((state) => state.user);
  const {
    isSuccess,
    isError,
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

  const prevUpdatedUserRef = useRef();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const prevUpdatedUser = prevUpdatedUserRef.current;
    if (
      isSuccess &&
      updatedUser !== undefined &&
      updatedUser !== prevUpdatedUser
    ) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        toast.success(`${translate('Updated', Language)}`);
        prevUpdatedUserRef.current = updatedUser;
        navigate('/admin/user-list');
      }, 1000);
    }

    if (isError) {
      toast.error(`${translate('Wrong', Language)}`);
    }
  }, [isSuccess, isError, updatedUser, navigate]);
  useEffect(() => {
    if (isSuccess && createdUser !== undefined && updatedUser !== undefined) {
      toast.success(`${translate('Added', Language)}`);
      navigate('/admin/user-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isSuccess && createdUser !== undefined) {
      toast.success(`${translate('Added', Language)}`);
      navigate('/admin/user-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isError) {
      toast.error(`${translate('Wrong', Language)}`);
    }
  }, [isSuccess, isError, createdUser, updatedUser, navigate]);

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
        {getuserId !== undefined
          ? `${translate('Edit_User', Language)}`
          : `${translate('Add_User', Language)}`}{' '}
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
              toast.error(`${translate('Fill', Language)}`);
              return;
            }
            formik.handleSubmit(e);
          }}
        >
          <div className="mt-4">
            <label htmlFor="" className="mt-2">
              {translate('Name', Language)}
            </label>
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
            <label htmlFor="" className="mt-2">
              {translate('Email', Language)}
            </label>
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
            <label htmlFor="" className="mt-2">
              {translate('Password', Language)}
            </label>
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
            {getuserId !== undefined
              ? `${translate('Edit', Language)}`
              : `${translate('Add', Language)}`}{' '}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
