import {Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.58.156:8000/';
let token: any;

export const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

API.interceptors.request.use(
  function (_config: any) {
    _config.headers['Content-Type'] = 'application/json';

    if (token !== null && token !== '') {
      _config.headers.Authorization = 'Bearer ' + token;
    }
    return _config;
  },
  function (error) {
    console.log('API ERROR :: ' + JSON.stringify(error));
  },
);

export const apiError = (error: any) => {
  console.log(error?.response)
  if(error.response){
    if (error?.response.status == 401) {
      return 'Unauthorized User! Please Login again.';
    } else if (error.response.status == 403) {
      return 'You are not authorized to access the requested resource.';
    } else if (error.response.status == 404) {
      return 'Requested URL not found.';
    } else if (error.response.status == 500) {
      return 'Internal Server Error';
    } else {
      return error.response.data.message;
    }
  } else if(error.message){
    return error.message;
  }
};

export const saveToken = (data: any) => {
  token = data;
};

export const getToken = () => {
  return token;
};

// network issue check
export const isNetworkAvailable = async () => {
  let response = false;
  await NetInfo.fetch().then((networkState: any) => {
    response = networkState.isConnected;
  });
  return response;
};

