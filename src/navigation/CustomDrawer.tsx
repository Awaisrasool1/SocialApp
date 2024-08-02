import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {isNetworkAvailable} from '../api/api';
import {getProfile} from '../services/Get';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Constants} from '../utils';

const CustomDrawer = (props: any) => {
  const [data, setData] = useState<any>();
  const nav: any = useNavigation();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        const res = await getProfile();
        setData(res?.data);
      } catch (e: any) {
        console.log(e);
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
  const logOut = async () => {
    AsyncStorage.clear();
    nav.reset({
      index: 0,
      routes: [
        {
          name: Constants.LOGIN_SCREEN,
        },
      ],
    });
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#1E71B7'}}>
        <ImageBackground
          source={require('../assest/Img/bg2.jpg')}
          style={{padding: 20}}>
          <Image
            source={
              data?.image
                ? {uri: data?.image}
                : require('../assest/Img/user-profile.jpg')
            }
            style={style.userImg}
          />
          <Text style={style.userName}>{data?.username}</Text>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={style.logOutContainer}>
        <TouchableOpacity
          onPress={() => {
            logOut();
          }}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('../assest/Img/logout.png')} />
            <Text style={style.logoutText}>LogOut</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  userImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto-Medium',
    marginBottom: 5,
  },
  logoutText: {
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
    marginLeft: 15,
  },
  logOutContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

export default CustomDrawer;
