import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
interface props {
  value?: string;
  label?: string;
  placeHolder?: string;
  style?: any;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange: (i: string) => void;
  multiline?:boolean
}
export default function InputText(props: props) {
  return (
    <View>
      {props.label && <Text style={styles.lebel}>{props.label}</Text>}
      <TextInput
        value={props.value}
        placeholderTextColor={'#000000'}
        style={[styles.input,props.style]}
        placeholder={props.placeHolder}
        onFocus={() => {
          props.onFocus?.();
        }}
        onBlur={() => {
          props.onBlur?.();
        }}
        multiline={props.multiline}
        onChangeText={(e: any) => props.onChange(e)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lebel: {
    marginLeft: 10,
    paddingHorizontal: 5,
    color: 'black',
    fontWeight: '500',
    fontSize: 14,
  },
  input: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    color: 'black',
    height: 45,
    padding: 0,
    paddingLeft: 10,
    fontSize: 14,
  },
});
