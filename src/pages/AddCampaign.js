import React, { useCallback, useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import {
  createAcampaign,
  getAcampaign,
  resetState,
  updateAcampaign,
} from '../features/campaigns/campaignsSlice';

let schema = yup.object({
  name: yup.string().required('Name s is Required'),
  description: yup.string().required('Description is Required'),
  image: yup.mixed().required('Icon is Required'),
  active: yup.string().required('Active status is Required'),
});

const AddCampaign = () => {
  const [isFileDetected, setIsFileDetected] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCampaignId = location.pathname.split('/')[3];
  const newCampaign = useSelector((state) => state.campaign);

  const {
    isSuccess,
    isError,
    isLoading,
    createdCampaign,
    campaignName,
    campaignActive,
    campaignDescription,
    campaignImage,
    updatedCampaign,
  } = newCampaign;

  const onDrop = useCallback(
    (acceptedFiles) => {
      formik.setFieldValue('image', acceptedFiles);
      setIsFileDetected(true);
    }, // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (getCampaignId !== undefined) {
      dispatch(getAcampaign(getCampaignId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getCampaignId]);

  useEffect(() => {
    if (isSuccess && createdCampaign) {
      toast.success('campaign Added Successfully!');
      navigate('/admin/campaign-list');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    if (isSuccess && updatedCampaign !== undefined) {
      toast.success('campaign Updated Successfully!');
      navigate('/admin/campaign-list');
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdCampaign,
    campaignName,
    campaignActive,
    campaignDescription,
    campaignImage,
    updatedCampaign,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: campaignName || '',
      active: campaignActive ? 1 : 0,
      description: campaignDescription || '',
      image: campaignImage || null,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCampaignId !== undefined) {
        const data = { id: getCampaignId, campaign: values };
        dispatch(updateAcampaign(data));
      } else {
        dispatch(createAcampaign(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 1000);
      }
    },
  });

  console.log(newCampaign);

  return (
    <div>
      <h3 className="mb-4 title">
        {getCampaignId !== undefined ? 'Edit' : 'Add'} campaign
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
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
                    newCampaign.campaignActive
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
            label="Enter description"
            name="description"
            onCh={formik.handleChange('description')}
            onBl={formik.handleBlur('description')}
            val={formik.values.description}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <div className="">
            <div className="mt-10 text-center">
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
            </div>
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getCampaignId !== undefined ? 'Edit' : 'Add'} campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCampaign;
