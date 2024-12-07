import axios from 'axios';

const API_URL = 'https://localhost:7227/api';

export const login = async (usernameOrEmail: string, password: string) => {
  try {
    const ipAdress = await getUserIpAddress();
    const deviceInfo = getDeviceInfo();

    const response = await axios.post(`${API_URL}/Auth/Login`, {
      ipAdress,
      deviceInfo,
      usernameOrEmail,
      password,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};


const getUserIpAddress = async (): Promise<string> => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (error) {
    throw new Error('Unable to fetch IP address');
  }
};


const getDeviceInfo = (): string => {
  return `${navigator.platform} - ${navigator.userAgent}`;
};

export const getCurrentUser = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/Auth/Login`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user data');
  }
};
