import {API} from '../api/api';

export async function userCreate(data: any) {
  const res = await API.post('account/SignUp', data);
  return res.data;
}

export async function userLogin(data: any) {
  const res = await API.post('account/SignIn', data);
  return res.data;
}
