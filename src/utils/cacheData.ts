import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDataFromCachedWithKey = (key: any) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then((res: any) => {
        if (res !== null) {
          resolve(JSON.parse(res));
        } else {
          resolve(false);
        }
      })
      .catch((err: any) => reject(err));
  });
};

export const saveDataToCachedWithKey = (key: any, data: any) => {
    AsyncStorage.setItem(key, JSON.stringify(data));
  };
  