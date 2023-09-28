import ImageUploader from 'quill-image-uploader';
import ImageResize from 'quill-image-resize-module-react';

import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { base_url } from '../utils/base_url';
import axios from 'axios';
import { config } from '../utils/axiosconfig';
import Dropzone from 'react-dropzone';
import BlotFormatter from 'quill-blot-formatter';
Quill.register('modules/imageUploader', ImageUploader);
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/blotFormatter', BlotFormatter);

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: '', files: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  handleDrop(acceptedFiles) {
    console.log(acceptedFiles);

    try {
      const file = acceptedFiles[0];

      const formData = new FormData();
      formData.append('file', file);

      axios
        .post(`${base_url}/api/upload-media`, formData, config)
        .then((response) => {
          const imageUrl = response.data.url;

          const quill = this.reactQuillRef.getEditor();

          const range = quill.getSelection();

          quill.clipboard.dangerouslyPasteHTML(
            range.index,
            `<img src="${imageUrl}"  alt="Resim" />`
          );
          acceptedFiles.length = 0;

          this.setState({ files: [] });
        });
    } catch (error) {
      console.error('Image upload error:', error);
    }
    const editor = this.reactQuillRef.getEditor();
    editor.clipboard.dangerouslyPasteHTML(editor.getSelection(true));
  }

  render() {
    return (
      <>
        <Dropzone onDrop={this.handleDrop}>
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
          ref={(el) => (this.reactQuillRef = el)}
          value={this.state.editorHtml}
          onChange={(newContent) => {
            this.handleChange(newContent);
            this.props.onDescriptionChange(newContent);
          }}
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
              // toggle to add extra line breaks when pasting HTML:
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
  }
}

export default Editor;
