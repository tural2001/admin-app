/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';

import { RiDeleteBin5Line } from 'react-icons/ri';
import { VscEdit } from 'react-icons/vsc';
import { toast } from 'react-toastify';
import { resetState } from '../features/countries/countriesSlice';
import {
  deleteAcountry,
  getcountries,
} from '../features/countries/countriesSlice';
import ReactPaginate from 'react-paginate';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useTranslation } from '../components/TranslationContext';

const CountryList = () => {
  const [open, setOpen] = useState(false);
  const [countryId, setcountryId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setcountryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getcountries());
  }, []);

  const countrystate =
    useSelector((state) => state.country.countries.data) || [];
  console.log(countrystate);

  const deleteCountry = (e) => {
    setOpen(false);
    dispatch(deleteAcountry(e));
    toast.success('Country deleted successfully');
    setTimeout(() => {
      dispatch(getcountries());
    }, 100);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;

  const filteredCountry = countrystate?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(countrystate?.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const { translate, Language } = useTranslation();

  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title"> {translate('Countries', Language)}</h3>{' '}
        <Link
          to="/admin/country"
          className="flex justify-center items-center pr-3 gap-1 rounded-lg add_button_2"
        >
          {' '}
          <span className="mb-1 ml-2 text-[30px] hover:text-white">+</span>
          {translate('Add_Country', Language)}
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
                    {translate('Status', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Name', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredCountry?.map((country, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {country.id}
                  </th>
                  <td
                    className={`px-6 py-4 ${
                      country.active === true
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {country.active === true
                      ? `${translate('Active', Language)}`
                      : `${translate('Not_Active', Language)}`}
                  </td>
                  <td className="px-6 py-4">{country.name}</td>
                  <td className="px-6 py-16 flex gap-2">
                    <Link
                      to={`/admin/country/${filteredCountry[index]?.id}`}
                      className="text-[25px] text-blue-500 "
                    >
                      <VscEdit />
                    </Link>

                    <button
                      onClick={() => showModal(countrystate[index]?.id)}
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
      </div>{' '}
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
          deleteCountry(countryId);
        }}
        title={translate('Country_Modal', Language)}
      />
    </div>
  );
};

export default CountryList;
