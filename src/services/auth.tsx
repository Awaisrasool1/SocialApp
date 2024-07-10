import {API} from '../api/api';

export async function loginApi() {
  const res = await API.get('SignIn');
  console.log(res)
  return res.data;
}
