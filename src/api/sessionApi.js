/* API Docs

https://github.com/dcdo-ucsc/Wormhole-Backend/blob/master/API_DOCS.md
*/
import axios from 'axios';
import qs from 'qs';

const backend = import.meta.env.VITE_BACKEND;

const createSession = async (expiry, password) => {
  let data = qs.stringify({
    expiry,
    password,
  });

  const res = await axios.post(backend + '/api/session/create', data, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return res.data;
};

const getSessionData = async (sessionId) => {
  const res = await axios.get(backend + `/api/session/data/${sessionId}`, {
    withCredentials: true,
  });

  return res.data;
};

const authSession = async (sessionId, password) => {
  let data = qs.stringify({
    sessionId,
    password,
  });
  console.log(sessionId);
  const res = await axios.post(backend + '/api/session/auth', data, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return res.data;
};

const getFileNames = async (sessionId) => {
  const res = await axios.get(backend + `/api/session/getFileNames/${sessionId}`, {
    withCredentials: true,
  });

  return res.data;
};

export { createSession, getSessionData, authSession, getFileNames };
