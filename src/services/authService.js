import axios from 'axios';

export const login = (username, password) => {
  try {
    const response = axios.post('/auth/login', { username, password });
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error while logging in', error);
    throw error;
  }
};
