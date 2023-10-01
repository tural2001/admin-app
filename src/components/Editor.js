import React, { useState, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Stil dosyasını içe aktarın

import ImageUploader from 'quill-image-uploader';
import ImageResize from 'quill-image-resize-module-react';
import BlotFormatter from 'quill-blot-formatter';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { base_url } from '../utils/base_url';
import { config } from '../utils/axiosconfig';

Quill.register('modules/imageUploader', ImageUploader);
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/blotFormatter', BlotFormatter);

const Editor = () => {
  const [editorHtml, setEditorHtml] = useState('');
  const [files, setFiles] = useState([]);
  const reactQuillRef = useRef(null);

  const handleChange = (html) => {
    setEditorHtml(html);
    // this.props.onDescriptionChange(html); // Eğer bu özelliği kullanıyorsanız, burada da kullanabilirsiniz.
  };

  const handleDrop = async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0];

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        `${base_url}/api/upload-media`,
        formData,
        {
          headers: config.getHeaders('az'),
        }
      );

      const imageUrl = response.data.url;

      const quill = reactQuillRef.current.getEditor();
      const range = quill.getSelection();

      quill.clipboard.dangerouslyPasteHTML(
        range.index,
        `<img src="${imageUrl}"  alt="Resim" />`
      );

      setFiles([]);
    } catch (error) {
      console.error('Image upload error:', error);
    }
  };

  return (
    <>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <input {...getInputProps()} />
            <p>Drag and drop an image here, or click to select one</p>
          </div>
        )}
      </Dropzone>

      <ReactQuill
        ref={reactQuillRef}
        value={editorHtml}
        onChange={handleChange}
        theme="snow"
        style={{
          minHeight: '5vh',
        }}
        modules={{
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],

              [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],

              [{ size: ['small', false, 'large', 'huge'] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }],

              ['clean'],
            ],
          },
          clipboard: {
            matchVisual: false,
          },
          imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize'],
          },
          blotFormatter: {},
        }}
        formats={[
          'header',
          'font',
          'size',
          'bold',
          'italic',
          'underline',
          'align',
          'strike',
          'script',
          'blockquote',
          'background',
          'list',
          'bullet',
          'indent',
          'link',
          'image',
          'color',
          'code-block',
        ]}
      />
    </>
  );
};

export default Editor;
