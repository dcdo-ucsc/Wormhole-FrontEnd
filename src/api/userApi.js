import axios from 'axios';

const backend = import.meta.env.VITE_BACKEND;

const generateUserId = async () => {
  const res = await axios.get(backend + '/api/user/generate', {
    withCredentials: true,
  });
  return res.data;
};

const fetchUserRole = async (sessionToken) => {
  const res = await axios.get(backend + '/api/user/fetchRole', {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });
  return res.data;
};

export { generateUserId, fetchUserRole };
