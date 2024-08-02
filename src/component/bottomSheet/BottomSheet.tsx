import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  ToastAndroid,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {isNetworkAvailable} from '../../api/api';
import Buttons from '../Buttons/Buttons';
import {sendPosts} from '../../services/Put';
const {height} = Dimensions.get('window');

const BottomSheet = (props: any) => {
  const nav: any = useNavigation();

  const sendPost = async () => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        let data = {
          imageUrl: props?.img,
        };
        const res = await sendPosts(data);
        if (res.status == 'success') {
          props.getData();
          props.refRBSheet.current.close();
          ToastAndroid.showWithGravityAndOffset(
            'Post Share successfully',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        }
      } catch (error: any) {
        ToastAndroid.showWithGravityAndOffset(
          error,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    }
  };

  return (
    <RBSheet
      ref={props.refRBSheet}
      openDuration={600}
      draggable
      dragOnContent
      customStyles={{
        container: {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
      }}
      height={height - 100}>
      <ScrollView style={{paddingHorizontal: 20}}>
        <Image source={{uri: props?.img}} style={styles.img} />
        <View style={{marginTop: 20}} />
        <Buttons
          title="Share"
          onPress={() => {
            sendPost();
          }}
        />
      </ScrollView>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 150,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default BottomSheet;
