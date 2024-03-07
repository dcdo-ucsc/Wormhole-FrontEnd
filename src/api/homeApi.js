import axios from 'axios';

const backend = import.meta.env.VITE_BACKEND;

const getWelcomeMessage = async () => {
  try {
    const res = await axios.get(backend + `/home`);
    return res.data.message;
  } catch (err) {
    return 'Server Error: Unable to fetch welcome message.';
  }
};

export { getWelcomeMessage };
