import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { VscEdit } from 'react-icons/vsc';
import { toast } from 'react-toastify';
import {
  deleteAvacancy,
  getvacancies,
  resetState,
} from '../features/vacancies/vacaciesSlice';
import ReactPaginate from 'react-paginate';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

const VacancyList = () => {
  const [open, setOpen] = useState(false);
  const [vacancyId, setvacancyId] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;

  const showModal = (e) => {
    setOpen(true);
    setvacancyId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getvacancies());
  }, [dispatch]);

  const vacancystate =
    useSelector((state) => state.vacancy.vacancies.data) || [];

  const deleteVacancy = (e) => {
    setOpen(false);
    dispatch(deleteAvacancy(e));
    toast.success('Vacancy deleted successfully');
    setTimeout(() => {
      dispatch(getvacancies());
    }, 100);
  };

  const filteredVacancy = vacancystate?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(vacancystate?.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title">Vacancies</h3>
        <Link
          to={`/admin/vacancy`}
          className="flex justify-center items-center pr-3 gap-1 rounded-lg add_button_2"
        >
          <span className="mb-1 ml-2 text-[30px] hover:text-white">+</span>
          Add Vacancy
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
                  <div className="flex items-center">title</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Description</div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredVacancy?.map((vacancy, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {vacancy.id}
                  </th>
                  <td
                    className={`px-6 py-4 ${
                      vacancy.active === true
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {/* {vacancy.active === true ? (
                      <img src={active} alt="" />
                    ) : (
                      <img src={notactive} alt="" />
                    )} */}
                    {vacancy.active === true ? 'Active' : 'Not Active'}
                  </td>
                  <td className="px-6 py-4">{vacancy.title}</td>
                  <td className="px-6 py-4">{vacancy.description}</td>
                  <td className="px-6 py-16 flex gap-2">
                    <Link
                      to={`/admin/vacancy/${vacancystate[index]?.id}`}
                      className="text-[25px] text-blue-500 "
                    >
                      <VscEdit />
                    </Link>

                    <button
                      onClick={() => showModal(vacancystate[index]?.id)}
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
          deleteVacancy(vacancyId);
        }}
        title={`Are you sure you want to delete  this vacancy?`}
      />
    </div>
  );
};

export default VacancyList;
