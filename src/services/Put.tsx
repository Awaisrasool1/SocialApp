import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_BASE_URL} from './auth';
import axios from 'axios';

export async function sendFriendRequest(data: any) {
  const token = await AsyncStorage.getItem('userToken');
  const res = await axios.post(`${API_BASE_URL}request/sendrequest`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function acceptFriendRequest(data: any) {
  const token = await AsyncStorage.getItem('userToken');
  const res = await axios.put(`${API_BASE_URL}request/acceptRequest`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function sendMessage(data: any) {
  const token = await AsyncStorage.getItem('userToken');
  const res = await axios.post(`${API_BASE_URL}chat/sendMessage`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function deleteMessage(data: any) {
  const token = await AsyncStorage.getItem('userToken');
  const res = await axios.post(`${API_BASE_URL}chat/deleteMessage`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function uploadImg(data: any) {
  const res = await axios.post(`${API_BASE_URL}account/uploadFile`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}

export async function sendPosts(data: any) {
  const token = await AsyncStorage.getItem('userToken');
  const res = await axios.post(`${API_BASE_URL}posts/createPost`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}


