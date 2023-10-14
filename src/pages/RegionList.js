/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { VscEdit } from 'react-icons/vsc';
import { getregions, resetState } from '../features/regions/regionSlice';
import ReactPaginate from 'react-paginate';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useTranslation } from '../components/TranslationContext';

const RegionList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getregions());
  }, []);

  const regionstate = useSelector((state) => state.region?.regions?.data) || [];
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;

  const filteredRegion = regionstate?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(regionstate?.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data?.selected);
  };

  const { translate, Language } = useTranslation();

  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title"> {translate('Regions', Language)}</h3>
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
                    {translate('Status', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Name', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Description', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Handle', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Color', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredRegion?.map((region, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {region.id}
                  </th>
                  <td
                    className={`px-6 py-4 ${
                      region.active === true ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {region.active === true
                      ? `${translate('Active', Language)}`
                      : `${translate('Not_Active', Language)}`}
                  </td>
                  <td className="px-6 py-4">{region.name}</td>
                  <td className="px-6 py-4">{region.description}</td>
                  <td className="px-6 py-4">{region.handle}</td>
                  <td className="px-6 py-4">{region?.color?.name?.az}</td>
                  <td className="px-6 py-16 flex gap-2">
                    <Link
                      to={`/admin/region/${filteredRegion[index]?.handle}`}
                      className="text-[25px] text-blue-500"
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

export default RegionList;
