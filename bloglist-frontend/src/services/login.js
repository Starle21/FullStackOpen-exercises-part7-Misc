import axios from 'axios';

const baseUrl = '/api/login';

// post credentials
// store the returned data

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

const toExport = { login };

export default toExport;
