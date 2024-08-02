import {View, Text, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Header from '../../component/header/Header';
import style from './style';
import {isNetworkAvailable} from '../../api/api';
import {getAllUserPost} from '../../services/Get';
import {useFocusEffect} from '@react-navigation/native';

export default function Home() {
  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );
  const getData = async () => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        const res = await getAllUserPost();
        console.log(res)
        setData(res?.data);
      } catch (e) {}
    }
  };
  return (
    <>
      <Header title={'Home'} />
      <ScrollView style={style.container}>
        <View style={{marginTop: 20}} />
        {data.map((val: any, index: any) => (
          <View style={{flex: 1, marginBottom: 30}} key={index}>
            <View style={style.senderContainer}>
              <Image
                source={{uri: val?.sender?.image}}
                style={style.senderimg}
              />
              <Text style={style.snedreName}>{val?.sender?.username}</Text>
            </View>
            <Image source={{uri: val.imageUrl}} style={style.postImg} />
          </View>
        ))}
      </ScrollView>
    </>
  );
}
