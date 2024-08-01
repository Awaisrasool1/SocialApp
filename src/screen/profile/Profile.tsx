import {View, Text, Image, ToastAndroid, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import style from './style';
import Header from '../../component/header/Header';
import {isNetworkAvailable} from '../../api/api';
import {getProfile} from '../../services/Get';
import Buttons from '../../component/Buttons/Buttons';

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
    <>
      <Header title="My Profile" />
      <View style={style.container}>
        <View style={style.imgContainer}>
          <View>
            <Image
              source={require('../../assest/Img/1.jpg')}
              style={style.img}
            />
            <Text style={style.nameText}>{data?.username}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={style.postNumberText}>30</Text>
            <Text style={style.postsText}>posts</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={style.postNumberText}>40</Text>
            <Text style={style.postsText}>Friends</Text>
          </View>
        </View>
        <Text style={style.aboutText}>
          I dont care have and attitude just have a personality you cannot
          handle this
        </Text>
        <View style={style.btnContainer}>
          <Buttons title="LogIn" onPress={() => {}} style={{width:100}}/>
          <Buttons title="Share" onPress={() => {}} style={{width:100}}/>
        </View>
      </View>
    </>
  );
}
