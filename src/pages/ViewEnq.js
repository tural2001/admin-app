import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import enquirySlice, {
  getAEnquiry,
  resetState,
  updateAEnquiry,
} from '../features/enquiry/enquirySlice';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowBack } from 'react-icons/io';
const ViewEnq = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEnqId = location.pathname.split('/')[3];
  const enqState = useSelector((state) => state.enquiry);
  const {
    enquiryName,
    enquiryMobile,
    enquiryEmail,
    enquiryStatus,
    enquiryComment,
  } = enqState;
  useEffect(() => {
    dispatch(getAEnquiry(getEnqId));
  }, [dispatch, getEnqId]);

  const goBack = () => {
    navigate(-1);
  };
  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getAEnquiry(getEnqId));
    }, 100);
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Enquiry</h3>
        <button
          className="bg-transparent border-0 mb-0 align-items-center fs-6 gap-1"
          onClick={goBack}
        >
          <IoMdArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 d-flex flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name :</h6>
          <p className="mb-0">{enquiryName}</p>
        </div>
        <div className="d-flex align-items-center gap-3 mt-2">
          <h6 className="mb-0">Email :</h6>
          <p className="mb-0">
            <a
              href={`tel:+994${enquiryEmail}`}
              className="text-decoration-none"
            >
              {enquiryEmail}
            </a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3 mt-2">
          <h6 className="mb-0">Mobile :</h6>
          <p className="mb-0">
            <a
              href={`mailto:+994${enquiryMobile}`}
              className="text-decoration-none"
            >
              {enquiryMobile}
            </a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3 mt-2">
          <h6 className="mb-0">Comment :</h6>
          <p className="mb-0">{enquiryComment}</p>
        </div>
        <div className="d-flex align-items-center gap-3 mt-2">
          <h6 className="mb-0">Status :</h6>
          <p className="mb-0">{enquiryStatus}</p>
        </div>
        <div className="d-flex align-items-center gap-3 mt-2">
          <h6 className="mb-0">Change Status :</h6>
          <select
            name=""
            defaultValue={enquiryStatus ? enquiryStatus : ''}
            className="form-control form-select"
            style={{ width: '200px', height: '30px' }}
            onChange={(e) => setEnquiryStatus(e.target.value, getEnqId)}
            id=""
          >
            <option value="">Select</option>
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ViewEnq;
