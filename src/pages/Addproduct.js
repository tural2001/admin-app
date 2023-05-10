import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { getpcategories } from '../features/pcategory/pcategorySlice';
import { getColors } from '../features/color/colorSlice';
// import 'react-widgets/styles.css';
import Dropzone from 'react-dropzone';
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import {
  createProducts,
  getAProduct,
  updateAProduct,
} from '../features/product/productSlice';
// import { Multiselect } from 'react-widgets';
import { Select } from 'antd';
import { toast } from 'react-toastify';
import { resetState } from '../features/product/productSlice';
import { useLocation, useNavigate } from 'react-router-dom';

let schema = yup.object({
  title: yup.string().required('Title is Required'),
  description: yup.string().required('Description is Required'),
  price: yup.number().required('Price is Required'),
  brand: yup.string().required('Brand is Required'),
  category: yup.string().required('Category is Required'),
  tags: yup.string().required('Tag is Required'),
  color: yup.array().required('Color is Required'),
  quantity: yup.number().required('Quantity is Required'),
  images: yup.array().required('Images is Required'),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const [color, setColor] = useState([]);
  const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getpcategories());
    dispatch(getColors());
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);
  const pcategorystate = useSelector((state) => state.pcategory.pcategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  // const getProductId = location.pathname.split('/')[3];

  const { isSuccess, isError, isLoading, createdProduct } = newProduct;

  // useEffect(() => {
  //   if (getProductId !== undefined) {
  //     dispatch(getAProduct(getProductId));
  //   } else {
  //     dispatch(resetState());
  //   }
  // }, [dispatch, getProductId]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success('Product Added Successfully!');
    }
    // if (isSuccess && updatedProduct !== undefined) {
    //   toast.success('Brand Updated Successfully!');
    //   navigate('/admin/product-list');
    // }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [isSuccess, isError, isLoading, createdProduct, navigate]);

  const coloropt = [];
  colorState.forEach((i) => {
    coloropt.push({
      label: i.name,
      value: i._id,
    });
  });

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.color = color;
    formik.values.images = img;
  }, [color, img]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      brand: '',
      category: '',
      tags: '',
      color: '',
      quantity: '',
      images: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // if (getProductId !== undefined) {
      //   const data = { id: getProductId, productData: values };
      //   dispatch(updateAProduct(data));
      // } else {
      dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState());
      }, 300);
    },
  });
  const handleColors = (e) => {
    setColor(e);
  };
  // const handleImg = (e) => {
  //   setImage(e);
  // };
  return (
    <div>
      <h3 className="mb-4 title">
        {/* {getProductId !== undefined ? 'Edit' : 'Add'} */}
        Product
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex m-3 gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onCh={formik.handleChange('title')}
            onBl={formik.handleBlur('title')}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange('description')}
              val={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onCh={formik.handleChange('price')}
            onBl={formik.handleBlur('price')}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange('brand')}
            onBlur={formik.handleBlur('brand')}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Brand</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            onChange={formik.handleChange('category')}
            onBlur={formik.handleBlur('category')}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Category</option>
            {pcategorystate.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>
          <select
            name="tags"
            onChange={formik.handleChange('tags')}
            onBlur={formik.handleBlur('tags')}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            onCh={formik.handleChange('quantity')}
            onBl={formik.handleBlur('quantity')}
            val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    onClick={() => dispatch(deleteImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: '10px', right: '10px' }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {/* {getProductId !== undefined ? 'Edit' : 'Add'}  */}
            Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
