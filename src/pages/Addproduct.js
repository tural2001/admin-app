// import React, { useEffect, useState } from 'react';
// import CustomInput from '../components/CustomInput';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { getBrands } from '../features/brand/brandSlice';
// // import { getpcategories } from '../features/pcategory/pcategorySlice';
// import { getColors } from '../features/color/colorSlice';
// import Dropzone from 'react-dropzone';
// import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
// import { createProducts } from '../features/product/productSlice';
// import { Select } from 'antd';
// import { toast } from 'react-toastify';
// import { resetState } from '../features/product/productSlice';
// import { useLocation, useNavigate } from 'react-router-dom';

// let schema = yup.object({
//   title: yup.string().required('Title is Required'),
//   description: yup.string().required('Description is Required'),
//   price: yup.number().required('Price is Required'),
//   brand: yup.string().required('Brand is Required'),
//   category: yup.string().required('Category is Required'),
//   tags: yup.string().required('Tag is Required'),
//   color: yup.array().required('Color is Required'),
//   quantity: yup.number().required('Quantity is Required'),
//   images: yup.array().required('Images is Required'),
// });

// const Addproduct = () => {
//   const dispatch = useDispatch();
//   const [color, setColor] = useState([]);
//   const navigate = useNavigate();
//   // const location = useLocation();

//   useEffect(() => {
//     dispatch(getBrands());
//     dispatch(getpcategories());
//     dispatch(getColors());
//   }, [dispatch]);

//   const brandState = useSelector((state) => state.brand.brands);
//   const pcategorystate = useSelector((state) => state.pcategory.pcategories);
//   const colorState = useSelector((state) => state.color.colors);
//   const imgState = useSelector((state) => state.upload.images);
//   const newProduct = useSelector((state) => state.product);

//   const { isSuccess, isError, isLoading, createdProduct } = newProduct;

//   useEffect(() => {
//     if (isSuccess && createdProduct) {
//       toast.success('Product Added Successfully!');
//     }
//     if (isError) {
//       toast.error('Something Went Wrong!');
//     }
//   }, [isSuccess, isError, isLoading, createdProduct, navigate]);

//   // const coloropt = [];
//   // colorState.forEach((i) => {
//   //   coloropt.push({
//   //     label: i.name,
//   //     value: i._id,
//   //   });
//   // });

//   const img = [];
//   imgState.forEach((i) => {
//     img.push({
//       public_id: i.public_id,
//       url: i.url,
//     });
//   });

//   useEffect(() => {
//     formik.values.images = img;
//   }, [img]);

//   const formik = useFormik({
//     initialValues: {
//       title: '',
//       description: '',
//       price: '',
//       brand: '',
//       category: '',
//       quantity: '',
//       images: '',
//     },
//     validationSchema: schema,
//     onSubmit: (values) => {
//       alert(JSON.stringify(values));
//       // dispatch(createProducts(values));
//       // formik.resetForm();
//       // setColor(null);
//       // setTimeout(() => {
//       //   dispatch(resetState());
//       // }, 1000);
//     },
//   });

//   return (
//     <div>
//       <h3 className="mb-4 title">Add Product</h3>
//       <div>
//         <form
//           onSubmit={formik.handleSubmit}
//           className="d-flex m-3 gap-3 flex-column"
//         >
//           <div className="grid grid-cols-3 gap-2">
//             <div className="col-span-2">
//               <div className="">
//                 <label
//                   htmlFor="first_name"
//                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                 >
//                   First name
//                 </label>
//                 <CustomInput
//                   type="text"
//                   label="Enter Product Title"
//                   name="title"
//                   onCh={formik.handleChange('title')}
//                   onBl={formik.handleBlur('title')}
//                   val={formik.values.title}
//                 />
//                 <div className="error">
//                   {formik.touched.title && formik.errors.title}
//                 </div>
//               </div>

//               <div className="">
//                 <ReactQuill
//                   theme="snow"
//                   name="description"
//                   onChange={formik.handleChange('description')}
//                   val={formik.values.description}
//                   className="rounded-xl border-none"
//                 />
//               </div>
//               <div className="error">
//                 {formik.touched.description && formik.errors.description}
//               </div>
//               <CustomInput
//                 type="number"
//                 label="Enter Product Price"
//                 name="price"
//                 onCh={formik.handleChange('price')}
//                 onBl={formik.handleBlur('price')}
//                 val={formik.values.price}
//               />
//               <div className="error">
//                 {formik.touched.price && formik.errors.price}
//               </div>
//               <select
//                 name="brand"
//                 onChange={formik.handleChange('brand')}
//                 onBlur={formik.handleBlur('brand')}
//                 value={formik.values.brand}
//                 className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 id=""
//               >
//                 <option value="">Select Brand</option>
//                 {brandState.map((i, j) => {
//                   return (
//                     <option key={j} value={i.title}>
//                       {i.title}
//                     </option>
//                   );
//                 })}
//               </select>
//               <div className="error">
//                 {formik.touched.brand && formik.errors.brand}
//               </div>
//               <select
//                 name="category"
//                 onChange={formik.handleChange('category')}
//                 onBlur={formik.handleBlur('category')}
//                 value={formik.values.category}
//                 className="my-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                 id=""
//               >
//                 <option value="">Select Category</option>
//                 {pcategorystate.map((i, j) => {
//                   return (
//                     <option key={j} value={i.title}>
//                       {i.title}
//                     </option>
//                   );
//                 })}
//               </select>
//               <div className="error">
//                 {formik.touched.category && formik.errors.category}
//               </div>

//               <CustomInput
//                 type="number"
//                 label="Enter Product Quantity"
//                 name="quantity"
//                 onCh={formik.handleChange('quantity')}
//                 onBl={formik.handleBlur('quantity')}
//                 val={formik.values.quantity}
//               />
//               <div className="error">
//                 {formik.touched.quantity && formik.errors.quantity}
//               </div>

//               <div className="showimages d-flex flex-wrap gap-3">
//                 {imgState.map((i, j) => {
//                   return (
//                     <div className="position-relative" key={j}>
//                       <button
//                         onClick={() => dispatch(deleteImg(i.public_id))}
//                         className="btn-close position-absolute"
//                         style={{ top: '10px', right: '10px' }}
//                       ></button>
//                       <img src={i.url} alt="" width={200} height={200} />
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//             <div className="">
//               <div className="mt-10 text-center">
//                 <Dropzone
//                   onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
//                 >
//                   {({ getRootProps, getInputProps }) => (
//                     <section>
//                       <div {...getRootProps()}>
//                         <input {...getInputProps()} />

//                         <div className="flex items-center justify-center w-full">
//                           <label
//                             htmlFor="dropzone-file"
//                             className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
//                           >
//                             <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                               <svg
//                                 aria-hidden="true"
//                                 className="w-10 h-10 mb-3 text-gray-400"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                                 xmlns="http://www.w3.org/2000/svg"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth="2"
//                                   d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                                 ></path>
//                               </svg>
//                               <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                                 <span className="font-semibold">
//                                   Click to upload
//                                 </span>{' '}
//                                 or drag and drop
//                               </p>
//                               <p className="text-xs text-gray-500 dark:text-gray-400">
//                                 SVG, PNG, JPG or GIF (MAX. 800x400px)
//                               </p>
//                             </div>
//                             <input
//                               id="dropzone-file"
//                               type="file"
//                               className="hidden"
//                             />
//                           </label>
//                         </div>
//                       </div>
//                     </section>
//                   )}
//                 </Dropzone>
//               </div>
//             </div>
//             <button
//               className="bg-blue-300 hover:bg-blue-500 border-none rounded-full my-5"
//               type="submit"
//             >
//               Add Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Addproduct;
