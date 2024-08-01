import {
  View,
  Text,
  ToastAndroid,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/header/Header';
import InputText from '../../component/InputText/InputText';
import {isNetworkAvailable} from '../../api/api';
import {getAllMyFriend} from '../../services/Get';
import {useNavigation} from '@react-navigation/native';
import {Constants} from '../../utils';

export default function YourFriends() {
  const [data, setData] = useState([]);
  const nav: any = useNavigation();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const isConnected = await isNetworkAvailable();
      if (isConnected) {
        const res = await getAllMyFriend();
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

  return (
    <View style={style.container}>
      <Header title="Your Friends" isGoBack={true} />
      <View>
        <View style={{marginTop: 20, paddingHorizontal: 10}}>
          <InputText placeHolder="Search for Friend" />
        </View>
        {data?.map((val: any, index: any) => (
          <TouchableOpacity
            style={style.itemContainer}
            key={index}
            onPress={() => {
              nav.navigate(Constants.ChatScreen, {
                data: val,
              });
            }}>
            <Image
              source={require('../../assest/Img/1.jpg')}
              style={style.itemImg}
            />
            <View style={{rowGap: 10}}>
              <Text style={style.itemTitle}>{val.username}</Text>
            </View>
          </TouchableOpacity>
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
    height: 70,
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    padding: 15,
    borderBottomColor: '#ededee',
    alignItems: 'center',
  },
  heading: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 10,
  },
  itemImg: {
    width: 50,
    height: 50,
    borderRadius: 35,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
    marginLeft: 5,
    marginTop: -15,
  },
});
