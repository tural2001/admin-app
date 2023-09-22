import ImageUploader from 'quill-image-uploader';
import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { base_url } from '../utils/base_url';
import axios from 'axios';
import { config } from '../utils/axiosconfig';
import Dropzone from 'react-dropzone'; // Import the react-dropzone component

Quill.register('modules/imageUploader', ImageUploader);

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
    // Handle the uploaded files here, e.g., send them to the server

    try {
      const file = acceptedFiles[0]; // Assuming you want to upload the first accepted file

      // Create a FormData object to send the file to the server
      const formData = new FormData();
      formData.append('file', file); // 'file' should match the field name expected by the server

      // Send a POST request to the server to upload the file
      axios
        .post(
          `${base_url}/api/upload-media`, // Replace with your server's endpoint
          formData, // Attach the FormData containing the file
          config // Include any Axios configuration options you need
        )
        .then((response) => {
          // Sunucunun yanıtında yüklü görüntünün URL'sine erişebilirsiniz
          const imageUrl = response.data.url;

          // Quill editörüne bir başvuru alın
          const quill = this.reactQuillRef.getEditor();

          // Quill editöründeki mevcut imleç pozisyonunu alın
          const range = quill.getSelection();

          // İmleç pozisyonuna yüklenen görüntü URL'sini ekleyin
          quill.clipboard.dangerouslyPasteHTML(
            range.index, // İmleç pozisyonuna ekle
            `<img src="${imageUrl}" className="w-20" alt="Resim" />`
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

  // Rest of your component code...

  render() {
    return (
      <>
        {/* Place the Dropzone component where you want the drag-and-drop area */}
        <Dropzone onDrop={this.handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              style={{
                border: '1px solid #ccc',
                padding: '20px',
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
          ref={(el) => (this.reactQuillRef = el)} // Reference to the Quill editor
          value={this.state.editorHtml}
          onChange={(newContent) => {
            this.handleChange(newContent);
            this.props.onDescriptionChange(newContent);
          }}
          theme="snow"
          style={{
            minHeight: '25vh',
          }}
          modules={this.modules}
          formats={this.formats}
        />
      </>
    );
  }
}

export default Editor;
