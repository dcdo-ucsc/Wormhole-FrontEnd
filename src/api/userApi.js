import axios from "axios";

const backend = import.meta.env.VITE_BACKEND;

const generateUserId = async () => {
  const res = await axios.get(backend + "/api/user/generate", {
    withCredentials: true,
  });
  return res.data;
};

export { generateUserId };
