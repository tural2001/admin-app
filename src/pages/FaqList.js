import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteABlog, getBlogs, resetState } from '../features/blogs/blogSlice';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import CustomModal from '../components/CustomModal';
import { deleteAfaq, getfaqs } from '../features/faq/faqSlice';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { VscEdit } from 'react-icons/vsc';
const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Question',
    dataIndex: 'question',
  },
  {
    title: 'Answer',
    dataIndex: 'answer',
  },

  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const FaqList = () => {
  const [open, setOpen] = useState(false);
  const [faqId, setFaqId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setFaqId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(resetState());
    dispacth(getfaqs());
  }, [dispacth]);

  const faqstate = useSelector((state) => state.faq.faqs.data);
  console.log(faqstate);

  const data = [];
  for (let i = 0; i < faqstate?.length; i++) {
    data.push({
      key: i,
      question: faqstate[i].question,
      answer: faqstate[i].answer,
      // action: (
      //   <>
      //     <Link
      //       to={`/admin/blog/${faqstate[i]._id}`}
      //       className="fs-3 text-danger"
      //     >
      //       <BiEdit />
      //     </Link>
      //     <button
      //       className="ms-3 fs-3 text-danger bg-transparent border-0"
      //       onClick={() => showModal(faqstate[i]._id)}
      //     >
      //       <AiFillDelete />
      //     </button>
      //   </>
      // ),
    });
  }

  const deleteFaq = (e) => {
    setOpen(false);
    dispacth(deleteAfaq(e));
    setTimeout(() => {
      dispacth(getfaqs());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <Link to="/admin/faq">Add Faq</Link>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No
                </th>

                <th scope="col" className="px-6 py-3">
                  <div class="flex items-center">
                    Question
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div class="flex items-center">
                    Answer
                    <a href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-3 h-3 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 320 512"
                      >
                        <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {faqstate?.map((faq, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {faq.id}
                  </th>
                  <td className="px-6 py-4">{faq.question}</td>
                  <td className="px-6 py-4">{faq.answer}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link
                      to={`/admin/faq/${faqstate[index]?.id}`}
                      className="text-lg text-black dark:text-blue-500 hover:underline"
                    >
                      <VscEdit />
                    </Link>

                    <button
                      onClick={() => showModal(faqstate[index]?.id)}
                      className="text-lg text-black dark:text-blue-500 hover:text-red-500"
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
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteFaq(faqId);
        }}
        title={`Are you sure you want to delete  this faq ?`}
      />
    </div>
  );
};

export default FaqList;
