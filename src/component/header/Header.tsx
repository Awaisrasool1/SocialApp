import {Animated, Text, StyleSheet, Image, View} from 'react-native';
import React from 'react';

interface props {
  title: string;
}
export default function Header(props: props) {
  return (
    <View style={style.container}>
      <Image
        source={require('../../assest/Img/line.png')}
        // style={{width: 20, height: 20}}
      />
      <Text style={style.title}>{props.title}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderBottomWidth: 0.7,
    borderBottomColor: '#BFBFBF',
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    width: '85%',
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
  },
});
