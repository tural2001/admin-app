// import React, { useEffect } from 'react';
// import CustomInput from '../components/CustomInput';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import {
//   createbcategory,
//   getAbcategory,
//   resetState,
//   updateAbcategory,
// } from '../features/faq/faqSlice';
// import { useLocation, useNavigate } from 'react-router-dom';

// let schema = yup.object({
//   title: yup.string().required('Blog Category name is Required'),
// });
// const Addblogcat = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const location = useLocation();
//   const getbcategoryId = location.pathname.split('/')[3];
//   const newbCategory = useSelector((state) => state.bcategory);

//   const {
//     isSuccess,
//     isError,
//     isLoading,
//     createdbcategory,
//     bcategoryName,
//     updatedbcategory,
//   } = newbCategory;

//   useEffect(() => {
//     if (getbcategoryId !== undefined) {
//       dispatch(getAbcategory(getbcategoryId));
//     } else {
//       dispatch(resetState());
//     }
//   }, [dispatch, getbcategoryId]);

//   useEffect(() => {
//     if (isSuccess && createdbcategory) {
//       toast.success('Blog Category Added Successfully!');
//     }
//     if (isSuccess && updatedbcategory !== undefined) {
//       toast.success('Blog Category Updated Successfully!');
//       navigate('/admin/blog-category-list');
//     }
//     if (isError) {
//       toast.error('Something Went Wrong!');
//     }
//   }, [
//     isSuccess,
//     isError,
//     isLoading,
//     createdbcategory,
//     bcategoryName,
//     updatedbcategory,
//     navigate,
//   ]);

//   const formik = useFormik({
//     enableReinitialize: true,
//     initialValues: {
//       title: bcategoryName || '',
//     },
//     validationSchema: schema,
//     onSubmit: (values) => {
//       if (getbcategoryId !== undefined) {
//         const data = { id: getbcategoryId, bcategoryData: values };
//         dispatch(updateAbcategory(data));
//       } else {
//         dispatch(createbcategory(values));
//         formik.resetForm();
//         setTimeout(() => {
//           dispatch(resetState());
//         }, 300);
//       }
//     },
//   });
//   return (
//     <div>
//       <h3 className="mb-4 title">
//         {getbcategoryId !== undefined ? 'Edit' : 'Add'} Blog Category
//       </h3>
//       <div>
//         <form action="" onSubmit={formik.handleSubmit}>
//           <CustomInput
//             type="text"
//             label="Enter Blog Category"
//             name="title"
//             onCh={formik.handleChange('title')}
//             onBl={formik.handleBlur('title')}
//             val={formik.values.title}
//             id="bcategories"
//           />
//           <div className="error">
//             {formik.touched.title && formik.errors.title}
//           </div>
//           <button
//             className="btn btn-success border-0 rounded-3 my-5"
//             type="submit"
//           >
//             {getbcategoryId !== undefined ? 'Edit' : 'Add'} Blog Category
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Addblogcat;
