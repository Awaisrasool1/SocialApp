import {View, Text, ToastAndroid, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/header/Header';
import InputText from '../../component/InputText/InputText';
import style from './style';
import {isNetworkAvailable} from '../../api/api';
import {getAllUser, getPendingRequest} from '../../services/Get';
import {acceptFriendRequest, sendFriendRequest} from '../../services/Put';
import {useNavigation} from '@react-navigation/native';
import {Constants} from '../../utils';

export default function Friends() {
  const [data, setData] = useState([]);
  const nav: any = useNavigation();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const isConnected = await isNetworkAvailable();
      if (isConnected) {
        const res = await getPendingRequest();
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
 
  const acceptRequest = async (id: any, flag: any) => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      let data = {
        requestId: id,
        accept: flag,
      };
      const res = await acceptFriendRequest(data);
      if (res.status == 'success') {
        ToastAndroid.showWithGravityAndOffset(
          res.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
      const res2 = await getPendingRequest();
      setData(res2);
      try {
      } catch (e: any) {
        ToastAndroid.showWithGravityAndOffset(
          e,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    } else {
    }
  };
  return (
    <View style={style.container}>
      <Header title="Friends" />
      <View style={[style.flexRow, {marginLeft: 10}]}>
        <TouchableOpacity onPress={() => nav.navigate(Constants.Suggestion)}>
          <Text style={style.topBtn}>Suggestions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nav.navigate(Constants.YourFriend)}>
          <Text style={style.topBtn}>Your Friends</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={{marginTop: 20, paddingHorizontal: 10}}>
          <InputText placeHolder="Search for Friend" />
        </View>
        <Text style={style.heading}>Friend Requests</Text>
        {data?.map((val: any, index: any) => (
          <View style={style.itemContainer} key={index}>
            <Image
              source={require('../../assest/Img/1.jpg')}
              style={style.itemImg}
            />
            <View style={{rowGap: 10}}>
              <Text style={style.itemTitle}>{val.sender.username}</Text>
              <View style={style.flexRow}>
                <TouchableOpacity
                  onPress={() => {
                    acceptRequest(val._id, true);
                  }}>
                  <Text style={style.btn}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    acceptRequest(val._id, false);
                  }}>
                  <Text style={[style.btn, {backgroundColor: 'gray'}]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

