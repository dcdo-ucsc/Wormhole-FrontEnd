import { useEffect, useState } from 'react';
import './index.css';

import { getFileNames } from '../api/sessionApi';

const PreviewPanel = (sessionId) => {
  const [fileNames, setFileNames] = useState([]); // preview files
  const [errorMsg, setErrorMsg] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(fileNames);
  }, [fileNames]);

  const fetchFileNames = async () => {
    let response;
    try {
      response = await getFileNames(sessionId);
      setError(false);
      setErrorMsg(null);
      setFileNames(response);
    } catch (error) {
      setError(true);
      setErrorMsg('No files in session');
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

        {error && <div>{errorMsg}</div>}

        <label htmlFor='contained-button-file'>
          <button onClick={handleFilePreview}>get file names</button>
        </label>
      </div>
    </>
  );
};

export { PreviewPanel };
