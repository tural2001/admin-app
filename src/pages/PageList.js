import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { VscEdit } from 'react-icons/vsc';
import { getpages, resetState } from '../features/pagess/pagesSlice';
import ReactPaginate from 'react-paginate';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

const PageList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getpages());
  }, [dispatch]);

  const pagestate = useSelector((state) => state.page.pages.data) || [];

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;

  const filteredPage = pagestate?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(pagestate?.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title">Pages</h3>
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
                  <div className="flex items-center">Slug</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Title</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Content</div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredPage?.map((page, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {page.id}
                  </th>
                  <td className="px-6 py-4">{page.meta_title}</td>
                  <td className="px-6 py-4">{page.meta_description}</td>
                  <td className="px-6 py-4">{page.slug}</td>
                  <td className="px-6 py-4">{page.title}</td>
                  <td
                    className="px-6 py-4"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                  ></td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link
                      to={`/admin/page/${pagestate[index]?.slug}`}
                      className="text-[25px] text-blue-500 "
                    >
                      <VscEdit />
                    </Link>
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
    </div>
  );
};

export default PageList;
