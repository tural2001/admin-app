import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';
import { VscEdit } from 'react-icons/vsc';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { deleteAslide, resetState } from '../features/slides/slidesSlice';
import { getslides } from '../features/slides/slidesSlice';
import Popup from 'reactjs-popup';
import ReactPaginate from 'react-paginate';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

const SlideList = () => {
  const [open, setOpen] = useState(false);
  const [slideId, setslideId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setslideId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getslides());
  }, [dispatch]);

  const slidestate = useSelector((state) => state.slide.slides.data) || [];

  const deleteSlide = (e) => {
    setOpen(false);
    dispatch(deleteAslide(e));
    toast.success('Slide Deleted Successfully!');
    setTimeout(() => {
      dispatch(getslides());
    }, 1000);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;
  const filteredSlide = slidestate?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(slidestate?.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title">Slide</h3>
        <Link
          to={`/admin/slide`}
          className="flex justify-center items-center pr-3 gap-1 rounded-lg add_button_2"
        >
          <span className="mb-1 ml-2 text-[30px] hover:text-white">+</span>
          Add slide
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
                  <div className="flex items-center">Status</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Order</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Title</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Description</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Show button</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Button text</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Button link</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Image</div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredSlide?.map((slide, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {slide.id}
                  </th>
                  <td
                    className={`px-6 py-4 ${
                      slide.active === true ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {slide.active === true ? 'Active' : 'Not Active'}
                  </td>
                  <td className="px-6 py-4">{slide.order}</td>
                  <td className="px-6 py-4">{slide.title}</td>
                  <td className="px-6 py-4">{slide.description}</td>
                  <td className="px-6 py-4">
                    {' '}
                    {slide.show_button === true ? 'Show' : 'Hidden'}
                  </td>
                  <td className="px-6 py-4">{slide.button_text}</td>
                  <td className="px-6 py-4">{slide.button_link}</td>
                  {/* <td className="px-6 py-4">
                    <a
                      href={slide.image}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {slide.image}
                    </a>
                  </td> */}
                  <td className="px-6 py-4">
                    <Popup
                      trigger={
                        <button>
                          {' '}
                          <img
                            src="https://azeronline.netlify.app/static/media/blog2.891d84e7b5ab348201fd.png"
                            alt=""
                            width={150}
                            height={50}
                          />{' '}
                        </button>
                      }
                      modal
                      nested
                      contentStyle={{
                        padding: '0px',
                        borderRadius: '50px',
                        borderColor: 'white',
                        width: '1110px',
                        height: '575px',
                        overflow: 'hidden',
                      }}
                    >
                      <div>
                        <img
                          src="https://azeronline.netlify.app/static/media/blog2.891d84e7b5ab348201fd.png"
                          alt=""
                          width={1110}
                          height={50}
                        />{' '}
                      </div>
                    </Popup>
                  </td>
                  <td className="px-6 py-16 flex gap-2">
                    <Link
                      to={`/admin/slide/${filteredSlide[index]?.id}`}
                      className="text-[25px] text-blue-500 "
                    >
                      <VscEdit />
                    </Link>

                    <button
                      onClick={() => showModal(filteredSlide[index]?.id)}
                      className="text-[25px] text-red-500 "
                    >
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
          deleteSlide(slideId);
        }}
        title={`Are you sure you want to delete  this slide?`}
      />
    </div>
  );
};

export default SlideList;
