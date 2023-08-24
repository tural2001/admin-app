import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { vector1, vector2, vector3, vector4, vector5 } from '../assets';

let schema = Yup.object({
  email: Yup.string()
    .email('Email Should be valid')
    .required('Email is Required'),
  password: Yup.string().required('Password is Required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const authState = useSelector((state) => state);

  const { user, isError, isSuccess, isLoading, message } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      navigate('/admin');
      window.location.reload();
    } else {
      navigate('');
    }
  }, [user, isError, isSuccess, isLoading, message, navigate]);

  return (
    <section className="bg-hero-pattern">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center ">
          <div className="flex items-end mt-7 mb-3 ">
            {' '}
            <img src={vector1} className="absolute ml-2 mt-1 " alt="" />{' '}
            <img src={vector2} className="absolute ml-3" alt="" />{' '}
            <img src={vector3} className="absolute ml-4  " alt="" />{' '}
            <img src={vector4} className="absolute ml-7 " alt="" />{' '}
            <img src={vector5} className="absolute ml-7 " alt="" />{' '}
          </div>
          <div className="">
            {' '}
            <h1 className="text-white ml-12 text-[27px] font-medium tracking-wide mb-3">
              Azeronline
            </h1>
          </div>
        </div>{' '}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          {' '}
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            {isError && (
              <div className="text-red-600 dark:text-red-400">
                {message || 'Something went wrong!'}
              </div>
            )}
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <CustomInput
                  type="text"
                  name="email"
                  label="Email Address"
                  id="email"
                  val={formik.values.email}
                  onCh={formik.handleChange('email')}
                  placeholder="azeronline@example.com"
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <CustomInput
                  type="password"
                  name="password"
                  label="Password"
                  id="pass"
                  val={formik.values.password}
                  onCh={formik.handleChange('password')}
                  placeholder="••••••••"
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}{' '}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#/"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full hover:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
