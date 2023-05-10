import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { deleteAProduct, getProducts } from '../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import CustomModal from '../components/CustomModal';

// import { MdEditDocument } from 'react-icons/md';
// import { FcDeleteDatabase } from 'react-icons/fc';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: 'Color',
    dataIndex: 'color',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price.length - b.price.length,
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [prodId, setprodId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setprodId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const productstate = useSelector((state) => state.product.products);
  const data = [];
  for (let i = 0; i < productstate.length; i++) {
    data.push({
      key: i + 1,
      title: productstate[i].title,
      brand: productstate[i].brand,
      category: productstate[i].category,
      color: productstate[i].color,
      price: `${productstate[i].price}`,
      action: (
        <>
          <Link
            to={`/admin/product/${productstate[i]._id}`}
            className="fs-3 text-danger"
          >
            <BiEdit />
          </Link>
          <button
            onClick={() => showModal(productstate[i]._id)}
            className="ms-3 fs-3 text-danger bg-transparent border-0"
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteProduct = (e) => {
    setOpen(false);
    dispatch(deleteAProduct(e));
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(prodId);
        }}
        title="Are you sure you want to delete this brand?"
      />
    </div>
  );
};

export default Productlist;
