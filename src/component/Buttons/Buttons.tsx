import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Theme from '../../theme/Theme';
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
    color: Theme.colors.white,
    width: '90%',
    height: Theme.responsiveSize.size35,
    borderRadius: Theme.responsiveSize.size5,
    backgroundColor: Theme.colors.lightBlue,
    textAlign: 'center',
    textAlignVertical: 'center',
    alignSelf:'center'
  },
});
