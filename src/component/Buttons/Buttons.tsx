import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
interface props {
  title: string;
  onPress: () => void;
  style?: any;
}
export default function Buttons(props: props) {
  return (
    <View>
      <TouchableOpacity onPress={() => props.onPress()}>
        <Text style={[styles.btn]}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    color: 'white',
    width: '90%',
    height: 35,
    borderRadius: 5,
    backgroundColor: '#1E71B7',
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf: 'center',
  },
});
