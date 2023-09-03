import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../components/CustomModal';
import { VscEdit } from 'react-icons/vsc';
import { RiDeleteBin5Line } from 'react-icons/ri';
import {
  deleteAreview,
  getreviews,
  resetState,
} from '../features/reviews/reviewsSlice';
import { active, notactive, plus } from '../assets';
import ReactPaginate from 'react-paginate';
import { BsArrowLeft, BsArrowRight, BsArrowRightShort } from 'react-icons/bs';

const ReviewList = () => {
  const [open, setOpen] = useState(false);
  const [reviewId, setreviewId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setreviewId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getreviews());
  }, [dispatch]);

  const reviewstate = useSelector((state) => state.reviews.reviews.data);
  console.log(reviewstate);

  const deleteReview = (e) => {
    setOpen(false);
    dispatch(deleteAreview(e));
    setTimeout(() => {
      dispatch(getreviews());
    }, 100);
  };
  const [currentPage, setCurrentPage] = useState(0); // Sayfa numarasını saklar
  const itemsPerPage = 7; // Her sayfada kaç yapı gösterileceği

  const filteredReview = reviewstate?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(reviewstate?.length / itemsPerPage); // Toplam sayfa sayısını hesaplar

  const handlePageClick = (data) => {
    setCurrentPage(data.selected); // Sayfa numarasını günceller
  };

  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title">Reviews</h3>
        <Link
          to={`/admin/review`}
          className="flex justify-center items-center pr-3 gap-1 rounded-lg add_button_2"
        >
          <span className="mb-1 ml-2 text-[30px] hover:text-white">+</span> Add
          Add Review
        </Link>
      </div>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Status
                    <a href="#/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Reviewer name
                    <a href="#/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    comment
                    <a href="#/">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredReview?.map((review, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {review.id}
                  </th>{' '}
                  <td
                    className={`px-6 py-4 ${
                      review.active === true ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {/* {review.active === true ? (
                      <img src={active} alt="" />
                    ) : (
                      <img src={notactive} alt="" />
                    )} */}
                    {review.active === true ? 'Active' : 'Not Active'}
                  </td>
                  <td className="px-6 py-4">{review.reviewer_name}</td>
                  <td className="px-6 py-4">{review.comment}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link
                      to={`/admin/review/${reviewstate[index]?.id}`}
                      className="text-[25px] text-blue-500 "
                    >
                      <VscEdit />
                    </Link>

                    <button
                      onClick={() => showModal(reviewstate[index]?.id)}
                      className="text-[25px] text-red-500 "
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>{' '}
      </div>
      <ReactPaginate
        previousLabel={<BsArrowLeft />}
        nextLabel={<BsArrowRight />}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteReview(reviewId);
        }}
        title="Are you sure you want to delete this category?"
      />
    </div>
  );
};

export default ReviewList;
