import React, { useCallback, useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetState } from '../features/reviews/reviewsSlice';
import {
  createAreview,
  getAreview,
  updateAreview,
} from '../features/reviews/reviewsSlice';
import Dropzone from 'react-dropzone';
import { uploadImg } from '../features/upload/uploadSlice';

let schema = yup.object({
  reviewer_name: yup.string().required('Name is Required'),
  comment: yup.string().required('Comment is Required'),
  reviewer_image: yup.mixed().required('Image is Required'),
  active: yup.string(),
});

const Addreview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isFileDetected, setIsFileDetected] = useState(false);
  const getReviewId = location.pathname.split('/')[3];
  const newReview = useSelector((state) => state.reviews);
  const {
    isSuccess,
    isError,
    isLoading,
    createdReview,
    reviewActive,
    reviewReviewer_name,
    reviewReviewer_image,
    reviewComment,
    updatedReview,
  } = newReview;

  const onDrop = useCallback(
    (acceptedFiles) => {
      formik.setFieldValue('reviewer_image', acceptedFiles);
      dispatch(uploadImg(acceptedFiles));
      setIsFileDetected(true);
    },
    // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
    []
  );
  const imageState = useSelector((state) => state.upload.images.url);

  useEffect(() => {
    if (getReviewId !== undefined) {
      dispatch(getAreview(getReviewId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getReviewId]);

  useEffect(() => {
    if (isSuccess && createdReview) {
      toast.success('Review Added Successfully');
      navigate('/admin/review-list');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    if (isSuccess && updatedReview !== undefined) {
      toast.success('Review Updated Successfully!');
      navigate('/admin/review-list');
    }
    if (isError) {
      toast.error('Something went wrong');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdReview,
    reviewActive,
    reviewReviewer_image,
    reviewReviewer_name,
    reviewComment,
    updatedReview,
    navigate,
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      reviewer_name: reviewReviewer_name || '',
      comment: reviewComment || '',
      reviewer_image: reviewReviewer_image || null,
      active: reviewActive ? 1 : 0,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getReviewId !== undefined) {
        const data = { id: getReviewId, review: values };
        console.log(data);
        dispatch(updateAreview(data));
      } else {
        dispatch(createAreview(values));
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
        {getReviewId !== undefined ? 'Edit' : 'Add'} Review
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = [
              'reviewer_name',
              'comment',
              'reviewer_image',
              'active',
            ];
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
          <label htmlFor="" className="mt-2">
            Status
          </label>
          <div className="my-2">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="active"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value="1"
                  checked={
                    newReview.reviewActive
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
          <label htmlFor="" className="mt-2">
            Name
          </label>
          <CustomInput
            type="text"
            label="Enter Review Name"
            name="reviewer_name"
            onCh={formik.handleChange('reviewer_name')}
            onBl={formik.handleBlur('reviewer_name')}
            val={formik.values.reviewer_name}
            id="reviews"
          />
          <div className="error">
            {formik.touched.reviewer_name && formik.errors.reviewer_name}
          </div>
          <label htmlFor="" className="mt-2">
            Comment
          </label>
          <CustomInput
            type="text"
            label="Enter Review Comment"
            name="comment"
            onCh={formik.handleChange('comment')}
            onBl={formik.handleBlur('comment')}
            val={formik.values.comment}
            id="reviews"
          />
          <div className="error">
            {formik.touched.comment && formik.errors.comment}
          </div>
          <label htmlFor="" className="mt-2">
            Image
          </label>
          <div className="">
            <div className="text-center">
              <div className="flex justify-space w-full gap-10">
                <div className="mt-2 text-center">
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
                    {formik.touched.reviewer_image &&
                      formik.errors.reviewer_image}
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
            {getReviewId !== undefined ? 'Edit' : 'Add'} review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addreview;
