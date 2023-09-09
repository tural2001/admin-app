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
  reviewer_name: yup.string().required('Name is Required'),
  comment: yup.string().required('Comment is Required'),
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
      active: reviewActive ? 1 : 0,
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = [
              'reviewer_name',
              'comment',
              'show_on_home_page',
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
            Show
          </label>
          <div className="my-2">
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="show_on_home_page"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value="1"
                  checked={
                    newReview.reviewShow_on_home_page
                      ? 1
                      : 0 || formik.values.show_on_home_page === '1'
                  }
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
            {formik.touched.show_on_home_page &&
              formik.errors.show_on_home_page}
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
