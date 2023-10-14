import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomModal';
import { VscEdit } from 'react-icons/vsc';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import {
  deleteAchannel,
  getchannels,
  resetState,
} from '../features/channels/channelsSlice';
import Popup from 'reactjs-popup';
import ReactPaginate from 'react-paginate';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useTranslation } from '../components/TranslationContext';

const ChannelList = () => {
  const [open, setOpen] = useState(false);
  const [channelId, setchannelId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setchannelId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getchannels());
  }, [dispatch]);

  const channelstate =
    useSelector((state) => state.channel.channels.data) || [];
  console.log(channelstate);

  const deleteChannel = (e) => {
    setOpen(false);
    dispatch(deleteAchannel(e));
    toast.success('Channel Deleted Successfully!');
    setTimeout(() => {
      dispatch(getchannels());
    }, 1000);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 7;

  const filteredChannel = channelstate?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const pageCount = Math.ceil(channelstate?.length / itemsPerPage);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };
  const { translate, Language } = useTranslation();

  return (
    <div>
      <div className="flex justify-between gap-3 mb-4">
        <h3 className="title"> {translate('Channel', Language)}</h3>{' '}
        <Link
          to="/admin/channel"
          className="flex justify-center items-center pr-3 gap-1 rounded-lg add_button_2"
        >
          {' '}
          <span className="mb-1 ml-2 text-[30px] hover:text-white">+</span>
          {translate('Add_Channel', Language)}
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
                    {translate('Country', Language)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    {translate('Name', Language)}
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
              {filteredChannel?.map((channel, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {channel.id}
                  </th>
                  <td
                    className={`px-6 py-4 ${
                      channel.active === true
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {channel.active === true
                      ? `${translate('Active', Language)}`
                      : `${translate('Not_Active', Language)}`}
                  </td>
                  <td className="px-6 py-4">{channel.country_id}</td>
                  <td className="px-6 py-4">{channel.name}</td>

                  <td className="px-6 py-4">
                    <Popup
                      trigger={
                        <div className="w-[150px] h-[50px] flex justify-center items-center">
                          <img
                            src={channel.image}
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
                        width: '1110px',
                        height: '575px',
                        overflow: 'hidden',
                      }}
                    >
                      <div className="flex justify-center items-center">
                        <img
                          src={channel.image}
                          alt=""
                          className="object-cover"
                        />{' '}
                      </div>
                    </Popup>
                  </td>
                  <td className="px-6 py-16 flex gap-2">
                    <Link
                      to={`/admin/channel/${channelstate[index]?.id}`}
                      className="text-[25px] text-blue-500 "
                    >
                      <VscEdit />
                    </Link>

                    <button
                      onClick={() => showModal(channelstate[index]?.id)}
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
          deleteChannel(channelId);
        }}
        title={translate('Channel_Modal', Language)}
      />
    </div>
  );
};

export default ChannelList;
