import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import {
  deleteAEnquiry,
  getEnquiries,
  resetState,
  updateAEnquiry,
} from '../features/enquiry/enquirySlice';
import { useDispatch, useSelector } from 'react-redux';
import CustomModal from '../components/CustomModal';
const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enqId, setenqId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, [dispatch]);
  const enquiryState = useSelector((state) => state.enquiry.enquiries);
  const data = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      comment: enquiryState[i].comment,
      status: (
        <>
          <select
            name=""
            className="form-control form-select"
            defaultValue={
              enquiryState[i].status ? enquiryState[i].status : 'Submitted'
            }
            id=""
            onChange={(e) =>
              setEnquiryStatus(e.target.value, enquiryState[i]._id)
            }
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved </option>
          </select>
        </>
      ),
      action: (
        <>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(enquiryState[i]._id)}
          >
            <AiFillDelete />
          </button>

          <Link
            to={`/admin/enquiries/${enquiryState[i]._id}`}
            className="fs-3 text-danger"
          >
            <AiOutlineEye />
          </Link>
        </>
      ),
    });
  }

  const setEnquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
  };
  const deleteEnq = (e) => {
    setOpen(false);
    dispatch(deleteAEnquiry(e));
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteEnq(enqId);
        }}
        title="Are you sure you want to delete this enquiry?"
      />
    </div>
  );
};

export default Enquiries;
