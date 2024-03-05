import axios from "axios";

const backend = "http://localhost:9001";

const generateUserId = async () => {
  const res = await axios.get(backend + "/api/user/generate", {
    withCredentials: true,
  });
  return res.data;
};

export { generateUserId };
