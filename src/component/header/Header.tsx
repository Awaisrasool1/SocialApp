import {
  Animated,
  Text,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Constants} from '../../utils';

interface props {
  title: string;
  isGoBack?: boolean;
  isPrifile?: boolean;
  imgPicker?: () => void;
}
export default function Header(props: props) {
  const nav: any = useNavigation();
  return (
    <View style={style.container}>
      {props.isGoBack ? (
        <TouchableOpacity onPress={() => nav.goBack()}>
          <Image
            source={require('../../assest/Img/arrowback.png')}
            style={{tintColor: 'black'}}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            nav.openDrawer();
          }}>
          <Image
            source={require('../../assest/Img/line.png')}
            // style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
      )}
      <Text style={style.title}>{props.title}</Text>
      {props.isPrifile && (
        <TouchableOpacity
          onPress={() => {
            props.imgPicker?.();
          }}>
          <Image source={require('../../assest/Img/add.png')} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF',
  },
  title: {
    width: '85%',
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },
});
