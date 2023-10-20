import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { logo } from '../assets';
import { useTranslation } from '../components/TranslationContext';

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
  console.log(authState);
  const { user, isError, isSuccess, isLoading, message } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      navigate('/admin');
      window.location.reload();
    } else {
      navigate('');
    }
  }, [user, isError, isSuccess, isLoading, message, navigate]);

  const { translate, Language } = useTranslation();

  return (
    <section className="bg-hero-pattern">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center ">
          <div className="flex items-end mt-7 mb-7 ">
            <img src={logo} width={300} alt="" />
          </div>
        </div>{' '}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {translate('Sign_to', Language)}{' '}
            </h1>
            {isError && (
              <div className="text-red-600 dark:text-red-400">
                {message || `${translate('Wrong', Language)}`}
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
                  {translate('Email', Language)}{' '}
                </label>
                <CustomInput
                  type="text"
                  name="email"
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
                  {translate('Password', Language)}{' '}
                </label>
                <CustomInput
                  type="password"
                  name="password"
                  id="pass"
                  val={formik.values.password}
                  onCh={formik.handleChange('password')}
                  placeholder="••••••••"
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </div>
              </div>
              <button
                type="submit"
                className="w-full hover:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {translate('SignIn', Language)}{' '}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
