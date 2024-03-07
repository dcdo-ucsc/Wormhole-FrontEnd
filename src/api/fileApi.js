/* API Docs

https://github.com/dcdo-ucsc/Wormhole-Backend/blob/master/API_DOCS.md
*/
import axios from "axios";
import FormData from "form-data";

const backend = import.meta.env.VITE_BACKEND;

const uploadFile = async (files, sessionToken, fileCount) => {
  let formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  const res = await axios.post(
    backend + `/api/session/upload/${fileCount}`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionToken}`,
      },
    }
  );
  return res.data;
};

const downloadFile = async (sessionToken) => {
  const res = await axios.get(backend + `/api/session/download`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });
  return res.data;
};

export { uploadFile, downloadFile };
