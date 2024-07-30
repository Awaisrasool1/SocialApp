import {View, Text, Image, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import style from './style';
import Header from '../../component/header/Header';
import {isNetworkAvailable} from '../../api/api';
import {getProfile} from '../../services/Get';

export default function Profile() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        const res = await getProfile();
        setData(res?.data);
        console.log(res);
      } catch (e: any) {
        ToastAndroid.showWithGravityAndOffset(
          e?.response.data,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'No internet Connection',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  };
  return (
    <View style={style.container}>
      <Header title="My Profile" />
      <View style={style.imgContainer}>
        <Image source={require('../../assest/Img/1.jpg')} style={style.img} />
        <Text style={style.nameText}>{data?.username}</Text>
      </View>
    </View>
  );
}
