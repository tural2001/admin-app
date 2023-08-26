import React, { useEffect } from 'react';
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

let schema = yup.object({
  reviewer_name: yup.string().required('Review name is Required'),
  comment: yup.string().required('Review comment is Required'),
  show_on_home_page: yup.string(),
  active: yup.string(),
});

const Addreview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getReviewId = location.pathname.split('/')[3];
  const newReview = useSelector((state) => state.reviews);
  const {
    isSuccess,
    isError,
    isLoading,
    createdReview,
    reviewActive,
    reviewShow_on_home_page,
    reviewReviewer_name,
    reviewComment,
    updatedReview,
  } = newReview;

  useEffect(() => {
    if (getReviewId !== undefined) {
      dispatch(getAreview(getReviewId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getReviewId]);

  useEffect(() => {
    if (isSuccess && createdReview) {
      toast.success('Review added successfully');
      navigate('/admin/review-list');
      setTimeout(() => {
        window.location.reload();
      }, 10);
    }
    if (isSuccess && updatedReview !== undefined) {
      toast.success('Review Updated Successfully!');
      navigate('/admin/review-list');
      setTimeout(() => {
        window.location.reload();
      }, 10);
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
    reviewShow_on_home_page,
    reviewReviewer_name,
    reviewComment,
    updatedReview,
    navigate,
  ]);

  console.log(newReview);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      reviewer_name: reviewReviewer_name || '',
      comment: reviewComment || '',
      show_on_home_page: reviewShow_on_home_page || 1,
      active: reviewActive || 1,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getReviewId !== undefined) {
        const data = { id: getReviewId, reviewData: values };
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
        <form action="" onSubmit={formik.handleSubmit}>
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
          <CustomInput
            type="text"
            label="Enter Comment"
            name="comment"
            onCh={formik.handleChange('comment')}
            onBl={formik.handleBlur('comment')}
            val={formik.values.comment}
            id="reviews"
          />
          <div className="error">
            {formik.touched.comment && formik.errors.comment}
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
                  checked={formik.values.active === '1'}
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
          <div className="my-4">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="show_on_home_page"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value="1"
                  checked={formik.values.show_on_home_page === '1'}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">Show</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="show_on_home_page"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value="0"
                  checked={formik.values.show_on_home_page === '0'}
                  className="text-blue-500 form-radio h-4 w-4"
                />
                <span className="ml-2">Hidden</span>
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
            {getReviewId !== undefined ? 'Edit' : 'Add'} Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addreview;
