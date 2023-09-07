import React, { useCallback, useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import {
  createApost,
  getApost,
  resetState,
  updateApost,
} from '../features/posts/postSlice';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

let schema = yup.object({
  title: yup.string().required('Title s is Required'),
  description: yup.string().required('Description is Required'),
  slug: yup.string(),
  image: yup.mixed().required('Icon is Required'),
  meta_title: yup.string(),
  meta_description: yup.string(),
  published_at: yup.date(),
});

const AddPost = () => {
  const [isFileDetected, setIsFileDetected] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getpostId = location.pathname.split('/')[3];
  const newPost = useSelector((state) => state.post);

  const {
    isSuccess,
    isError,
    isLoading,
    createdPost,
    postTitle,
    postDescription,
    postImage,
    updatedPost,
    postMeta_title,
    postMeta_description,
    postSlug,
    postPublished,
  } = newPost;

  const onDrop = useCallback(
    (acceptedFiles) => {
      formik.setFieldValue('image', acceptedFiles);
      setIsFileDetected(true);
    }, // eslint-disable-next-line no-use-before-define, react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (getpostId !== undefined) {
      dispatch(getApost(getpostId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getpostId]);

  useEffect(() => {
    if (isSuccess && createdPost) {
      toast.success('post Added Successfully!');
      navigate('/admin/post-list');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    if (isSuccess && updatedPost !== undefined) {
      toast.success('post Updated Successfully!');
      navigate('/admin/post-list');
    }
    if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [
    isSuccess,
    isError,
    isLoading,
    createdPost,
    postTitle,
    postDescription,
    postImage,
    postMeta_title,
    postSlug,
    postMeta_description,
    postPublished,
    updatedPost,
    navigate,
  ]);

  const formatDateTimeForServer = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(
      date.getMonth() + 1
    ).padStart(2, '0')}.${date.getFullYear()} ${String(
      date.getHours()
    ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

    return formattedDate;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: postTitle || '',
      description: postDescription || '',
      image: postImage || null,
      meta_title: postMeta_title || '',
      meta_description: postMeta_description || '',
      slug: postSlug || '',
      published_at: postPublished || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const formattedPublishedAt = formatDateTimeForServer(values.published_at);

      // Create a new object with updated values
      const updatedValues = {
        ...values,
        published_at: formattedPublishedAt,
      };
      // alert(JSON.stringify(updatedValues));
      if (getpostId !== undefined) {
        const data = { id: getpostId, post: values };
        dispatch(updateApost(data));
      } else {
        dispatch(createApost(updatedValues));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 1000);
      }
    },
  });

  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction
    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    [{ list: 'check' }], // check/uncheck list item
    ['image'], // links, images, and videos
    ['clean'], // remove formatting button
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  return (
    <div>
      <h3 className="mb-4 title">
        {getpostId !== undefined ? 'Edit' : 'Add'} post
      </h3>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const requiredFields = ['title', 'description', 'slug', 'image'];
            const errors = {};
            requiredFields.forEach((fieldName) => {
              if (formik.touched[fieldName] && !formik.values[fieldName]) {
                errors[fieldName] = 'This field is Required';
              }
            });
            if (Object.keys(errors).length > 0) {
              toast.error('Please fill in the required fields.');
              return;
            }
            formik.handleSubmit(e);
          }}
        >
          <CustomInput
            type="text"
            label="Enter meta_title"
            name="meta_title"
            onCh={formik.handleChange('meta_title')}
            onBl={formik.handleBlur('meta_title')}
            val={formik.values.meta_title}
          />
          <div className="error">
            {formik.touched.meta_title && formik.errors.meta_title}
          </div>
          <CustomInput
            type="text"
            label="Enter meta_description"
            name="meta_description"
            onCh={formik.handleChange('meta_description')}
            onBl={formik.handleBlur('meta_description')}
            val={formik.values.meta_description}
          />
          <ReactQuill
            theme="snow"
            name="description"
            className="mt-3"
            onChange={formik.handleChange('content')}
            value={formik.values.content}
            modules={module}
          />
          <div className="error">
            {formik.touched.meta_description && formik.errors.meta_description}
          </div>
          <CustomInput
            type="text"
            label="Enter title"
            name="title"
            onCh={formik.handleChange('title')}
            onBl={formik.handleBlur('title')}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <CustomInput
            type="text"
            label="Enter description"
            name="description"
            onCh={formik.handleChange('description')}
            onBl={formik.handleBlur('description')}
            val={formik.values.description}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="text"
            label="Enter slug"
            name="slug"
            onCh={formik.handleChange('slug')}
            onBl={formik.handleBlur('slug')}
            val={formik.values.slug}
          />
          <input
            type="datetime-local"
            id="datetime"
            name="published_at"
            value={formik.values.published_at || ''}
            onChange={formik.handleChange('published_at')}
            onBlur={formik.handleBlur('published_at')}
          />
          <div className="">
            <div className="text-center">
              <div className="flex justify-space w-full gap-10">
                <div className="mt-4 text-center">
                  <Dropzone onDrop={onDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />

                          <div
                            className={`flex items-center justify-center w-[800px]
                        `}
                          >
                            <label
                              htmlFor="dropzone-file"
                              className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 ${
                                isFileDetected
                                  ? 'bg-green-200'
                                  : 'dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100'
                              } dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
                            >
                              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {isFileDetected ? (
                                  <p className="mb-2 text-sm text-yellow-600 dark:text-yellow-400">
                                    File detected
                                  </p>
                                ) : (
                                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">
                                      Click to upload
                                    </span>{' '}
                                    or drag and drop
                                  </p>
                                )}

                                <svg
                                  aria-hidden="true"
                                  className="w-10 h-10 mb-3 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                  ></path>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{' '}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </div>
                              <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                  <div className="error">
                    {formik.touched.image && formik.errors.image}
                  </div>
                </div>
                <div className="mt-[70px] w-[200px]">
                  <img
                    src="https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg?w=2000"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-10 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 add_button"
          >
            {getpostId !== undefined ? 'Edit' : 'Add'} post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
