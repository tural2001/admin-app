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
  }, [dispatch]);

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

  // Sayfa numarasına göre yapıları filtrele
  const filteredStructures = structurestate?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(structurestate?.length / itemsPerPage); // Toplam sayfa sayısını hesaplar

  const handlePageClick = (data) => {
    setCurrentPage(data.selected); // Sayfa numarasını günceller
  };

  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title">Structures</h3>
        <Link
          to={`/admin/structure`}
          className="flex justify-center items-center pr-3 gap-1 rounded-lg add_button_2"
        >
          <span className="mb-1 ml-2 text-[30px] hover:text-white">+</span> Add
          Add Structure
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
                  <div className="flex items-center">Name</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Profession</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Image</div>
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
                    {structure.active === true ? 'Active' : 'Not Active'}
                  </td>
                  <td className="px-6 py-4">{structure.name}</td>
                  <td className="px-6 py-4">{structure.profession}</td>
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
        title={`Are you sure you want to delete this structure?`}
      />
    </div>
  );
};

export default StructureList;
