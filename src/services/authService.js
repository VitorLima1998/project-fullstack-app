import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      username,
      password,
    });
    if (response.status === 200) {
      const { token } = response.data;
      localStorage.setItem('token', token);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error while logging in', error);
    throw error;
  }
};

export const register = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/register', {
      username,
      password,
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error while registering', error);
    throw error;
  }
};
