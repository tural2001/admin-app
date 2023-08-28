import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  createAvacancy,
  getAvacancy,
  updateAvacancy,
} from '../features/vacancies/vacaciesSlice';
import { resetState } from '../features/structures/structuresSlice';

let schema = yup.object({
  title: yup.string().required('Title is Required'),
  description: yup.string().required('Description is Required'),
  active: yup.string().required('Required'),
});

const AddVacancy = (e) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getVacancyId = location.pathname.split('/')[3];
  const newVacancy = useSelector((state) => state.vacancy);
  console.log(newVacancy);
  const {
    isSuccess,
    isError,
    isLoading,
    createdVacancy,
    vacancyTitle,
    vacancyActive,
    vacancyDescription,
    updatedVacancy,
  } = newVacancy;

  useEffect(() => {
    if (getVacancyId !== undefined) {
      dispatch(getAvacancy(getVacancyId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getVacancyId]);

  useEffect(() => {
    if (isSuccess && createdVacancy) {
      toast.success('Faq Added Successfully!');
      navigate('/admin/vacancy-list');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    if (isSuccess && updatedVacancy !== undefined) {
      toast.success('Faq Updated Successfully!');
      navigate('/admin/vacancy-list');
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdVacancy,
    vacancyTitle,
    vacancyActive,
    vacancyDescription,
    updatedVacancy,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: vacancyTitle || '',
      description: vacancyDescription || '',
      active: vacancyActive ? 1 : 0,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      if (getVacancyId !== undefined) {
        const data = { id: getVacancyId, vacancyData: values };
        dispatch(updateAvacancy(data));
      } else {
        dispatch(createAvacancy(values));
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
        {getVacancyId !== undefined ? 'Edit' : 'Add'} Vacancy
      </h3>
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div className="my-4">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="active"
                  onChange={() => formik.setFieldValue('active', '1')}
                  onBlur={formik.handleBlur}
                  value="1"
                  checked={
                    newVacancy.vacancyActive
                      ? 1
                      : 0 || formik.values.active === '1'
                  }
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">Active</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="active"
                  onChange={() => formik.setFieldValue('active', '0')}
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
          <div className="mt-4">
            <CustomInput
              type="text"
              label="Enter Title"
              name="title"
              onCh={formik.handleChange('title')}
              onBl={formik.handleBlur('title')}
              val={formik.values.title}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
            <CustomInput
              type="text"
              label="Enter Description"
              name="description"
              onCh={formik.handleChange('description')}
              onBl={formik.handleBlur('description')}
              val={formik.values.description}
            />
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>
          </div>
          <button className="bg-blue-300 p-3  rounded-xl my-5" type="submit">
            {getVacancyId !== undefined ? 'Edit' : 'Add'} Vacancy
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVacancy;