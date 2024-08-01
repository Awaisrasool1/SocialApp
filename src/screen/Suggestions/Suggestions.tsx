import {
  View,
  Text,
  ToastAndroid,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/header/Header';
import {isNetworkAvailable} from '../../api/api';
import {getAllUser} from '../../services/Get';
import {sendFriendRequest} from '../../services/Put';
import {useNavigation} from '@react-navigation/native';

export default function Suggestions() {
  const [data, setData] = useState([]);
  const nav: any = useNavigation();
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
      <Header title="Suggestions" isGoBack={true} />
      <View>
        <View style={{marginTop: 20}} />
        <Text
          style={{
            color: 'black',
            fontWeight: '700',
            fontSize: 16,
            marginLeft: 10,
          }}>
          People you may Know
        </Text>
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
                    val.friendRequestStatus == 'pending' && {
                      backgroundColor: 'gray',
                    },
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

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    height: 90,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    padding: 15,
    borderBottomColor: '#ededee',
  },
  heading: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 10,
  },
  itemImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
    marginLeft: 5,
  },
  btn: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#1E71B7',
    width: 100,
    height: 35,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 10,
  },

});
