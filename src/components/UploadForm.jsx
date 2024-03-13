import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './index.css';

import { uploadFiles } from '../api/fileApi';
import { fileUpload, uploadSvg } from '../assets/svg/fileUpload';

const UploadForm = (sessionId) => {
  const [fileNames, setfileNames] = useState([]); // preview files
  const [files, setFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState(null);

  const handleFileSelect = (event) => {
    const fileNames = Array.from(event.target.files).map((file) => file.name);
    setfileNames((prevFiles) => [...prevFiles, fileNames]);
    setFiles((prevFiles) => [...prevFiles, ...event.target.files]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const fileNames = Array.from(event.dataTransfer.files).map(
      (file) => file.name
    );
    setfileNames((prevFiles) => [...prevFiles, fileNames]);
    setFiles((prevFiles) => [...prevFiles, ...event.dataTransfer.files]);
    // handle the file here
  };

  const handleUpload = async () => {
    // Get session token from cookies
    let sessionToken = Cookies.get(`token_owner_${sessionId.sessionId}`);
    
    console.log(sessionToken)

    try {
      await uploadFiles(files, sessionToken, files.length);
      setUploadMessage('Files uploaded!');
    } catch (err) {
      // empty file if 413 error occurs
      setFiles([]);
      console.log('some 413 error occured, either file too big or no file');
    }
    // clear files to upload
    setFiles([]);
  };

  // FIXME: dashed borders not visible on light theme
  return (
    <>
      <div
        className='upload-form'
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {/* Drag and drop area / upload */}
        <div className='flex justify-center'>
          <div>
            {/* Image */}
            {uploadSvg}
            <div className='text-center'>
              <label htmlFor='file-upload' className='upload-form-label'>
                <span>Upload a file</span>
                <input
                  style={{ display: 'none' }}
                  id='file-upload'
                  name='file-upload'
                  multiple
                  type='file'
                  onChange={handleFileSelect}
                />
              </label>
              <p style={{ paddingLeft: '4px' }}>or drag and drop</p>
            </div>
          </div>
        </div>

        {/* Upload btn */}
        <label htmlFor='contained-button-file'>
          <button onClick={handleUpload}>Upload</button>
        </label>
      </div>
      
      {uploadMessage && <div className='font-semibold'>{uploadMessage}</div>}
    </>
  );
};

export { UploadForm };
