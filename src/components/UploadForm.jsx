import { useEffect, useState } from 'react';
import './index.css';

import { CustomButton } from './button';
import { uploadFiles } from '../api/fileApi';
import { fileUpload, uploadSvg } from '../assets/svg/fileUpload';

const UploadForm = (sessionId) => {
  const [fileNames, setfileNames] = useState([]); // preview files
  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log(files);
    console.log(fileNames);
  }, [files, fileNames]);

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

  const handleUpload = () => {
    // Get session token from cookies
    
    const sessionToken = document.cookie.includes
    uploadFiles(files, 'sessionToken', files.length);
  };

  const click = () => {
    console.log('test')
  };

  return (
    <div
      className='upload-form'
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div>
        <div>
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

      <label htmlFor='contained-button-file'>
        <Button
          variant='contained'
          color='primary'
          component='span'
          onClick={handleUpload}
        >
          Upload
        </Button>
        {/* Create session btn */}
        <div>
          <CustomButton onClick={click} title="Create Session" />
        </div>
      </label>
    </div>
  );
};

export { UploadForm };
