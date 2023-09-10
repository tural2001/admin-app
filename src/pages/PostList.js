import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';
import { VscEdit } from 'react-icons/vsc';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { deleteApost, getposts, resetState } from '../features/posts/postSlice';
import Popup from 'reactjs-popup';
import ReactPaginate from 'react-paginate';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

const PostList = () => {
  const [open, setOpen] = useState(false);
  const [postId, setpostId] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;

  const showModal = (e) => {
    setOpen(true);
    setpostId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getposts());
  }, [dispatch]);

  const poststate = useSelector((state) => state.post.posts.data) || [];

  const deletePost = (e) => {
    setOpen(false);
    dispatch(deleteApost(e));
    toast.success('Post Deleted Successfully!');
    setTimeout(() => {
      dispatch(getposts());
    }, 1000);
  };

  const filteredPost = poststate?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(poststate?.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title">Posts</h3>
        <Link
          to={`/admin/post`}
          className="flex justify-center items-center pr-3 gap-1 rounded-lg add_button_2"
        >
          <span className="mb-1 ml-2 text-[30px] hover:text-white">+</span>
          Add Post
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
                  <div className="flex items-center">Meta title</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Meta description</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Title</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Description</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Slug</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Published</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Image</div>
                </th>

                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredPost?.map((post, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {post.id}
                  </th>
                  <td className="px-6 py-4">{post.meta_title}</td>
                  <td className="px-6 py-4">{post.meta_description}</td>
                  <td className="px-6 py-4">{post.title}</td>
                  <td
                    className="px-6 py-4"
                    dangerouslySetInnerHTML={{ __html: post.description }}
                  ></td>
                  <td className="px-6 py-4">{post.slug}</td>
                  <td className="px-6 py-4">{post.published_at}</td>
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
                      to={`/admin/post/${poststate[index]?.slug}`}
                      className="text-[25px] text-blue-500 "
                    >
                      <VscEdit />
                    </Link>
                    <button
                      onClick={() => showModal(poststate[index]?.slug)}
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
          deletePost(postId);
        }}
        title={`Are you sure you want to delete  this Post ?`}
      />
    </div>
  );
};

export default PostList;
