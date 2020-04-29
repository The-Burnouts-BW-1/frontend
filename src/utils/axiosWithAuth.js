import axios from 'axios';

const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'https://the-burnouts-production.herokuapp.com/',
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
export default axiosWithAuth;
