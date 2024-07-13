import {API} from '../api/api';

export async function userCreate(data: any) {

  const res = await API.post('account/SignIp', );
  console.log(res);
  return res.data;
}
