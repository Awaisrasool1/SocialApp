import {View, Text, Image} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constants } from '../../utils';

export default function Splash() {
  const nav :any= useNavigation()
  useEffect(() => {
    setTimeout(async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setTimeout(() => {
            nav.reset({
              index: 0,
              routes: [
                {
                  name: Constants.MyDrawer,
                },
              ],
            });
          }, 2000);
        } else {
          setTimeout(() => {
            nav.reset({
              index: 0,
              routes: [
                {
                  name: Constants.LOGIN_SCREEN,
                },
              ],
            });
          }, 2000);
        }
      } catch (e: any) {
        setTimeout(() => {
          nav.reset({
            index: 0,
            routes: [
              {
                name: Constants.LOGIN_SCREEN,
              },
            ],
          });
        }, 2000);
      }
    }, 1000);
  });
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        flex: 1,
      }}>
      <Image source={require('../../assest/Img/1.png')} />
    </View>
  );
}
