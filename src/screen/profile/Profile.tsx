import {
  View,
  Text,
  Image,
  ToastAndroid,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import style from './style';
import Header from '../../component/header/Header';
import {isNetworkAvailable} from '../../api/api';
import {getAllMyFriend, getProfile, getUserPost} from '../../services/Get';
import Buttons from '../../component/Buttons/Buttons';
import ImagePicker from 'react-native-image-crop-picker';
import {uploadImg} from '../../services/Put';
import BottomSheet from '../../component/bottomSheet/BottomSheet';
import {useNavigation} from '@react-navigation/native';
import {YourFriend} from '../../utils/Constants';

export default function Profile() {
  const [data, setData] = useState<any>();
  const [img, setImg] = useState('');
  const refRBSheet: any = useRef(null);
  const [postData, setPostData] = useState([]);
  const [friend, setFriend] = useState([]);
  const nav:any = useNavigation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        const res = await getProfile();
        setData(res?.data);
        const res2 = await getUserPost();
        setPostData(res2?.data);
        const res3 = await getAllMyFriend();
        setFriend(res3);
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

  const imgPicker = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      mediaType: 'photo',
    }).then(async (image: any) => {
      const formData = new FormData();
      formData.append('file', {
        uri: image.path,
        type: image.mime,
        name: image.path.split('/').pop(),
      });
      refRBSheet.current.open();
      const res = await uploadImg(formData);
      if (res.status) {
        setImg(res.fileUrl);
      }
    });
  };
  return (
    <>
      <Header
        title="My Profile"
        isPrifile={true}
        imgPicker={() => {
          imgPicker();
        }}
      />
      <ScrollView style={style.container}>
        <View style={style.imgContainer}>
          <View>
            <Image
              source={
                data?.image
                  ? {uri: data?.image}
                  : require('../../assest/Img/1.jpg')
              }
              style={style.img}
            />
            <Text style={style.nameText}>{data?.username}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={style.postNumberText}>{postData?.length}</Text>
            <Text style={style.postsText}>posts</Text>
          </View>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => {
              nav.navigate(YourFriend);
            }}>
            <Text style={style.postNumberText}>{friend?.length}</Text>
            <Text style={style.postsText}>Friends</Text>
          </TouchableOpacity>
        </View>
        <Text style={style.aboutText}>{data?.bio}</Text>
        <View style={style.btnContainer}>
          <Buttons title="Edit" onPress={() => {}} style={{width: 100}} />
          <Buttons title="Share" onPress={() => {}} style={{width: 100}} />
        </View>
        <Text
          style={[
            style.nameText,
            {marginTop: 20, marginBottom: 10, marginLeft: 10},
          ]}>
          Your Posts
        </Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {postData.map((val: any, index: any) => (
            <TouchableOpacity key={index}>
              <Image source={{uri: val.imageUrl}} style={style.postImg} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <BottomSheet refRBSheet={refRBSheet} img={img} getData={getData} />
    </>
  );
}
