import axios from 'axios';

export const API_BASE_URL = 'http://192.168.100.19:8000/';

export async function userCreate(data: any) {
  const res = await axios.post(`${API_BASE_URL}account/SignUp`, data);
  return res.data;
}

export async function userLogin(data: any) {
  const res = await axios.post(`${API_BASE_URL}account/SignIn`, data);
  return res.data;
}
