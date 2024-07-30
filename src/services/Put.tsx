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
  return res.data
}
