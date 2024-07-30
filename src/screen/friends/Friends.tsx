import {View, Text, ToastAndroid, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/header/Header';
import InputText from '../../component/InputText/InputText';
import style from './style';
import {isNetworkAvailable} from '../../api/api';
import {getAllUser} from '../../services/Get';
import {sendFriendRequest} from '../../services/Put';

export default function Friends() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const isConnected = await isNetworkAvailable();
      if (isConnected) {
        const res = await getAllUser();
        setData(res);
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'No internet Connection',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    } catch (e: any) {
      ToastAndroid.showWithGravityAndOffset(
        e?.response.data,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      console.log(e?.response.data);
    }
  };
  const sendRequest = async (id: any) => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        let data = {
          userId: id,
        };
        const res: any = await sendFriendRequest(data);
        console.log(res);
        const res2 = await getAllUser();
        setData(res2);
        ToastAndroid.showWithGravityAndOffset(
          res?.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } catch (e: any) {
        ToastAndroid.showWithGravityAndOffset(
          e?.response.data,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    }
  };
  return (
    <View style={style.container}>
      <Header title="Peoples" />
      <View>
        <View style={{marginTop: 20, paddingHorizontal: 10}}>
          <InputText placeHolder="Search for Friend" />
        </View>
        {data?.map((val: any, index: any) => (
          <View style={style.itemContainer} key={index}>
            <Image
              source={require('../../assest/Img/1.jpg')}
              style={style.itemImg}
            />
            <View style={{rowGap: 10}}>
              <Text style={style.itemTitle}>{val.username}</Text>
              <TouchableOpacity
              disabled={val.friendRequestStatus == 'pending' ? true : false}
                onPress={() => {
                  sendRequest(val._id);
                }}>
                <Text
                  style={[
                    style.btn,
                    val.friendRequestStatus == 'pending' && {backgroundColor: 'gray'}
                  ]}>
                  {val.friendRequestStatus}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
