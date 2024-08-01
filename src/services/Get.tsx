import axios from 'axios';
import {API_BASE_URL} from './auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getAllUser() {
  try {
    let token = await AsyncStorage.getItem('userToken');
    let result = await fetch(`${API_BASE_URL}request/GetNonFriend`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await result.json();
    console.log(res);
    return res.data;
  } catch (Error: any) {
    console.log('error ', Error);
  }
}
//
export async function getAllMyFriend() {
  const token = await AsyncStorage.getItem('userToken');
  const res = await axios.get(`${API_BASE_URL}request/allFriend`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
}
//
export async function getPendingRequest() {
  const token = await AsyncStorage.getItem('userToken');
  const res = await axios.get(`${API_BASE_URL}request/pendingRequest`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
}
//
export async function getProfile() {
  const token = await AsyncStorage.getItem('userToken');
  const res = await axios.get(`${API_BASE_URL}account/GetProfile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
//
export async function getMessage(id: any) {
  const token = await AsyncStorage.getItem('userToken');
  const res = await axios.get(`${API_BASE_URL}chat/getAllMessage/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
