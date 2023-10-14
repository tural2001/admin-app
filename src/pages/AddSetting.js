/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  createAsetting,
  getAsetting,
  resetState,
  updateAsetting,
} from '../features/settings/settingSlice';
import { useTranslation } from '../components/TranslationContext';

const Addsetting = (e) => {
  const { translate, Language } = useTranslation();

  let schema = yup.object({
    key: yup.string().required(`${translate('Required_Fill', Language)}`),
    value: yup.string().required(`${translate('Required_Fill', Language)}`),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getsettingId = location.pathname.split('/')[3];
  const newsetting = useSelector((state) => state.setting);
  const {
    isSuccess,
    isError,
    createdSetting,
    settingKey,
    settingValue,
    updatedSetting,
  } = newsetting;

  useEffect(() => {
    if (getsettingId !== undefined) {
      dispatch(getAsetting(getsettingId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getsettingId]);

  const prevUpdatedSettingRef = useRef();
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    const prevUpdatedSetting = prevUpdatedSettingRef.current;
    if (
      isSuccess &&
      updatedSetting !== undefined &&
      updatedSetting !== prevUpdatedSetting
    ) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        toast.success(`${translate('Updated', Language)}`);
        prevUpdatedSettingRef.current = updatedSetting;
        navigate('/admin/setting-list');
      }, 1000);
    }

    if (isError) {
      toast.error(`${translate('Wrong', Language)}`);
    }
  }, [isSuccess, isError, updatedSetting, navigate]);
  useEffect(() => {
    if (
      isSuccess &&
      createdSetting !== undefined &&
      updatedSetting !== undefined
    ) {
      toast.success(`${translate('Added', Language)}`);
      navigate('/admin/setting-list');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (isError) {
      toast.error(`${translate('Wrong', Language)}`);
    }
  }, [isSuccess, isError, createdSetting, updatedSetting, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      key: settingKey || '',
      value: settingValue || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getsettingId !== undefined) {
        const data = { id: getsettingId, settingData: values };
        dispatch(updateAsetting(data));
      } else {
        dispatch(createAsetting(values));
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
        {getsettingId !== undefined
          ? `${translate('Edit_Setting', Language)}`
          : `${translate('Add_Setting', Language)}`}{' '}
      </h3>
      <div className="">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['question', 'answer'];
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
          <div className="mt-4">
            <label htmlFor="" className="mt-2">
              {translate('Key', Language)}
            </label>
            <CustomInput
              type="text"
              label="Enter Setting Key"
              name="key"
              onCh={formik.handleChange('key')}
              onBl={formik.handleBlur('key')}
              val={formik.values.key}
              readOnly="readOnly"
            />
            <div className="error">
              {formik.touched.key && formik.errors.key}
            </div>
            <label htmlFor="" className="mt-2">
              {translate('Value', Language)}{' '}
            </label>
            <CustomInput
              type="text"
              label="Enter Setting Value"
              name="value"
              onCh={formik.handleChange('value')}
              onBl={formik.handleBlur('value')}
              val={formik.values.value}
            />
            <div className="error">
              {formik.touched.value && formik.errors.value}
            </div>
          </div>
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getsettingId !== undefined
              ? `${translate('Edit', Language)}`
              : `${translate('Add', Language)}`}{' '}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addsetting;
