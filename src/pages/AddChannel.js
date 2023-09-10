/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import {
  createAchannel,
  getAchannel,
  resetState,
  updateAchannel,
} from '../features/channels/channelsSlice';
import { uploadImg } from '../features/upload/uploadSlice';

let schema = yup.object({
  name: yup.string().required('Name is Required'),
  meta_title: yup.string(),
  meta_description: yup.string(),
  country_id: yup.number().required('Country Id is Required'),
  image: yup.mixed().required('Image is Required'),
  active: yup.string,
});

const Addchannel = () => {
  const [isFileDetected, setIsFileDetected] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getchannelId = location.pathname.split('/')[3];
  const newchannel = useSelector((state) => state.channel);

  const {
    isSuccess,
    isError,
    isLoading,
    createdChannel,
    channelName,
    channelMeta_title,
    channelMeta_description,
    channelActive,
    channelCountry_id,
    channelImage,
    updatedChannel,
  } = newchannel;

  const onDrop = useCallback(
    (acceptedFiles) => {
      formik.setFieldValue('image', acceptedFiles);
      dispatch(uploadImg(acceptedFiles));
      setIsFileDetected(true);
    },
    // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
    []
  );
  const imageState = useSelector((state) => state.upload.images.url);

  useEffect(() => {
    if (getchannelId !== undefined) {
      dispatch(getAchannel(getchannelId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getchannelId]);

  useEffect(() => {
    if (isSuccess && createdChannel) {
      toast.success('Channel Added Successfully!');
      navigate('/admin/channel-list');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    if (isSuccess && updatedChannel !== undefined) {
      toast.success('Channel Updated Successfully!');
      navigate('/admin/channel-list');
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdChannel,
    channelName,
    channelMeta_title,
    channelMeta_description,
    channelActive,
    channelCountry_id,
    channelImage,
    updatedChannel,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: channelName || '',
      meta_title: channelMeta_title || '',
      meta_description: channelMeta_description || '',
      active: channelActive ? 1 : 0,
      country_id: channelCountry_id || '',
      image: channelImage || null,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getchannelId !== undefined) {
        const data = { id: getchannelId, channel: values };
        dispatch(updateAchannel(data));
      } else {
        dispatch(createAchannel(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 1000);
      }
    },
  });

  useEffect(() => {
    if (getchannelId === undefined) {
      formik.setFieldValue('active', '1');
    } else {
      formik.setFieldValue('active', newchannel.channelActive ? '1' : '0');
    }
  }, []);
  return (
    <div>
      <h3 className="mb-4 title">
        {getchannelId !== undefined ? 'Edit' : 'Add'} Channel
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['name', 'country_id', 'image', 'active'];
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
          {' '}
          <label htmlFor="" className="mt-2">
            Status
          </label>
          <div className="my-4">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="active"
                  onChange={() => formik.setFieldValue('active', '1')}
                  onBlur={formik.handleBlur}
                  value="1"
                  checked={formik.values.active === '1'}
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
          <label htmlFor="" className="">
            Name
          </label>
          <CustomInput
            type="text"
            label="Enter Channel name"
            name="name"
            onCh={formik.handleChange('name')}
            onBl={formik.handleBlur('name')}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <label htmlFor="" className="mt-2">
            Meta title
          </label>
          <CustomInput
            type="text"
            label="Enter Meta Title"
            name="meta_title"
            onCh={formik.handleChange('meta_title')}
            onBl={formik.handleBlur('meta_title')}
            val={formik.values.meta_title}
          />
          <div className="error">
            {formik.touched.meta_title && formik.errors.meta_title}
          </div>
          <label htmlFor="" className="mt-2">
            Meta description
          </label>
          <CustomInput
            type="text"
            label="Enter Meta Description"
            name="meta_description"
            onCh={formik.handleChange('meta_description')}
            onBl={formik.handleBlur('meta_description')}
            val={formik.values.meta_description}
          />
          <div className="error">
            {formik.touched.meta_description && formik.errors.meta_description}
          </div>
          <label htmlFor="" className="mt-2">
            Country Id
          </label>
          <CustomInput
            type="number"
            label="Enter country_id"
            name="country_id"
            onCh={formik.handleChange('country_id')}
            onBl={formik.handleBlur('country_id')}
            val={formik.values.country_id}
            // readOnly={'readOnly'}
          />
          <div className="error">
            {formik.touched.country_id && formik.errors.country_id}
          </div>
          <label htmlFor="" className="mt-2">
            Image
          </label>
          <div className="">
            <div className="text-center">
              <div className="flex justify-space w-full gap-10">
                <div className="mt-4 text-center">
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
                  <img src={imageState ? imageState : ''} alt="" />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getchannelId !== undefined ? 'Edit' : 'Add'} channel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addchannel;
