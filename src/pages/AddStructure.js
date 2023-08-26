import React, { useCallback, useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import {
  createAstructure,
  getAstructure,
  resetState,
  updateAstructure,
} from '../features/structures/structuresSlice';

let schema = yup.object({
  name: yup.string().required('Name is Required'),
  profession: yup.string().required('Profession namse is Required'),
  image: yup.mixed().required('Image is Required'),
  active: yup.string().required('Active status is Required'),
});

const AddStructure = () => {
  const [isFileDetected, setIsFileDetected] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getStructureId = location.pathname.split('/')[3];
  const newStructure = useSelector((state) => state.structure);

  const {
    isSuccess,
    isError,
    isLoading,
    createdStructure,
    structureName,
    structureActive,
    structureProfession,
    structureImage,
    updatedStructure,
  } = newStructure;

  const onDrop = useCallback((acceptedFiles) => {
    formik.setFieldValue('image', acceptedFiles);
    setIsFileDetected(true);
  }, []);

  useEffect(() => {
    if (getStructureId !== undefined) {
      dispatch(getAstructure(getStructureId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getStructureId]);

  useEffect(() => {
    if (isSuccess && createdStructure) {
      navigate('/admin/structure-list');
      setTimeout(() => {
        window.location.reload();
      }, 500);
      toast.success('Structure Added Successfully!');
    }
    if (isSuccess && updatedStructure !== undefined) {
      toast.success('Structure Updated Successfully!');
      navigate('/admin/structure-list');
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdStructure,
    structureName,
    structureActive,
    structureProfession,
    structureImage,
    updatedStructure,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: structureName || '',
      active: structureActive ? 1 : 0,
      profession: structureProfession || '',
      image: typeof structureImage === 'string' ? structureImage : null,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getStructureId !== undefined) {
        const data = { id: getStructureId, structure: values };
        dispatch(updateAstructure(data));
      } else {
        dispatch(createAstructure(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 1000);
      }
    },
  });

  console.log(newStructure.structureImage);

  return (
    <div>
      <h3 className="mb-4 title">
        {getStructureId !== undefined ? 'Edit' : 'Add'} Structure
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter name"
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
            label="Enter profession"
            name="profession"
            onCh={formik.handleChange('profession')}
            onBl={formik.handleBlur('profession')}
            val={formik.values.profession}
          />
          <div className="error">
            {formik.touched.profession && formik.errors.profession}
          </div>

          <div className="flex justify-space w-full gap-10">
            <div className="mt-10 text-center">
              <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />

                      <div
                        className={`flex items-center justify-center w-[800px]
                        `}
                      >
                        <label
                          htmlFor="dropzone-file"
                          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ${
                            isFileDetected
                              ? 'bg-green-200'
                              : 'dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100'
                          } dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {isFileDetected ? (
                              <p className="mb-2 text-sm text-yellow-600 dark:text-yellow-400">
                                File detected
                              </p>
                            ) : (
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{' '}
                                or drag and drop
                              </p>
                            )}

                            <svg
                              aria-hidden="true"
                              className="w-10 h-10 mb-3 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{' '}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>
              <div className="error">
                {formik.touched.image && formik.errors.image}
              </div>
            </div>
            <div className="mt-[70px] w-[200px]">
              <img
                src="https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg?w=2000"
                alt=""
              />
            </div>
          </div>

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
                    newStructure.structureActive
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

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getStructureId !== undefined ? 'Edit' : 'Add'} Structure
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStructure;
