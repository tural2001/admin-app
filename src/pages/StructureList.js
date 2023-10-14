/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';
import { VscEdit } from 'react-icons/vsc';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import {
  deleteAstructure,
  getstructures,
  resetState,
} from '../features/structures/structuresSlice';
import Popup from 'reactjs-popup';
import ReactPaginate from 'react-paginate';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useTranslation } from '../components/TranslationContext';

const StructureList = () => {
  const [open, setOpen] = useState(false);
  const [structureId, setStructureId] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;

  const showModal = (e) => {
    setOpen(true);
    setStructureId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getstructures());
  }, []);

  const structurestate =
    useSelector((state) => state.structure.structures.data) || [];

  const deleteStructure = (e) => {
    setOpen(false);
    dispatch(deleteAstructure(e));
    toast.success('Structure Deleted Successfully!');

    setTimeout(() => {
      dispatch(getstructures());
    }, 1000);
  };

  const filteredStructures = structurestate?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(structurestate?.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const { translate, Language } = useTranslation();

  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title">{translate('Structures', Language)}</h3>
        <Link
          to={`/admin/structure`}
          className="flex justify-center items-center pr-3 gap-1 rounded-lg add_button_2"
        >
          <span className="mb-1 ml-2 text-[30px] hover:text-white">+</span>
          {translate('Add_Structure', Language)}{' '}
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
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Profession', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Image', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredStructures?.map((structure, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {structure.id}
                  </th>
                  <td
                    className={`px-6 py-4 ${
                      structure.active === true
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {structure.active === true
                      ? `${translate('Active', Language)}`
                      : `${translate('Not_Active', Language)}`}
                  </td>
                  <td className="px-6 py-4">{structure.name}</td>
                  <td className="px-6 py-4">{structure.profession}</td>
                  <td className="px-6 py-4">
                    <Popup
                      trigger={
                        <div className="w-[150px] h-[50px] flex justify-center items-center">
                          <img
                            src={structure.image}
                            alt=""
                            className="object-cover"
                          />
                        </div>
                      }
                      modal
                      nested
                      contentStyle={{
                        padding: '0px',
                        borderRadius: '50px',
                        borderColor: 'white',
                        overflow: 'hidden',
                      }}
                    >
                      <div className="flex justify-center items-center">
                        <img
                          src={structure.image}
                          alt=""
                          className="object-cover"
                        />
                      </div>
                    </Popup>
                  </td>
                  <td className="px-6 py-16 flex  gap-2">
                    <Link
                      to={`/admin/structure/${structure.id}`}
                      className="text-[25px] text-blue-500 "
                    >
                      <VscEdit />
                    </Link>

                    <button
                      onClick={() => showModal(structure.id)}
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
          deleteStructure(structureId);
        }}
        title={translate('Structure_Modal', Language)}
      />
    </div>
  );
};

export default StructureList;
