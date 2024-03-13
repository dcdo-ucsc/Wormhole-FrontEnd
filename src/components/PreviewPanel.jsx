import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

// import { getFileNames, getFilePreview } from '../api/fileApi';

const backend = import.meta.env.VITE_BACKEND;

const PreviewPanel = (sessionId) => {
  const [fileNames, setFileNames] = useState([]); // preview files
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(fileNames);
  }, [fileNames]);

  const fetchFileNames = async () => {
    let response;
    try {
      response = await axios.get(
        `${backend}/api/session/getFileNames/${sessionId.sessionId}`,
        {
          withCredentials: true,
        }
      );
      setFileNames(response.data);
    } catch (error) {
      setError(true);
    }
  };

  const handleFilePreview = () => {
    fetchFileNames();
  };

  return (
    <>
      <div className='preview-form'>
        <div>
          {fileNames.map((name, _) => (
            <label className='flex justify-center' key={_}>
              {name}
            </label>
          ))}
        </div>
        <label htmlFor='contained-button-file'>
          <button onClick={handleFilePreview}>get file names</button>
        </label>
      </div>
    </>
  );
};

export { PreviewPanel };
