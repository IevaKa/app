import axios from 'axios';

const signup = (username, password, name, role) => {
  return axios
    .post('/api/auth/signup', { username, password, name, role })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

const login = (username, password) => {
  return axios
    .post('/api/auth/login', { username, password })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

const logout = () => {
  return axios
    .delete('/api/auth/logout')
    .then(response => {
      console.log('logout happened')
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export { signup, login, logout }