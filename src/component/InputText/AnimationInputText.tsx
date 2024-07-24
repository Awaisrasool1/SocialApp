import {StyleSheet, View, TextInput, Text, Animated} from 'react-native';
import React, {useRef, useState} from 'react';

interface props {
  value?: string;
  label?: string;
  placeHolder?: string;
  style?: any;
  onBlur: () => void;
  onChange: (i: string) => void;
}
export default function AnimationInputText(props: props) {
  const animation = useRef(new Animated.Value(0)).current;
  const [placeholder, setPlaceHolder] = useState<any>('');
  const [flag, setFlag] = useState(false);

  const isFocus = () => {
    setFlag(true);
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    setPlaceHolder(props.placeHolder);
  };
  const isBlur = () => {
    setFlag(false);
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    setPlaceHolder('');
  };
  return (
    <View style={{justifyContent: 'center'}}>
      <Animated.Text
        style={[
          styles.lebel,
          {
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -22],
                }),
              },
              {
                translateX: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -3],
                }),
              },
            ],
          },
        ]}>
        {props.label}
      </Animated.Text>
      <TextInput
        value={props.value}
        placeholderTextColor={'#000000'}
        style={[
          styles.input,
          flag && props.value == ''
            ? {
                borderColor: '#1E71B7',
                borderWidth: 0.5,
              }
            : flag && props.value != ''
            ? {
                borderColor: '#1E71B7',
                borderWidth: 0.5,
              }
            : flag == false &&
              props.value != '' && {
                borderColor: '#BFBFBF',
                borderWidth: 0.5,
              },
        ]}
        placeholder={placeholder}
        onFocus={() => {
          isFocus();
        }}
        onBlur={() => {
          setFlag(false);
          props.onBlur();
          if (
            props.value == '' ||
            props.value == undefined ||
            props.value == null
          ) {
            isBlur();
          }
        }}
        onChangeText={(e: any) => props.onChange(e)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  lebel: {
    position: 'absolute',
    zIndex: 1,
    marginLeft: 10,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    color: 'black',
    fontWeight: '500',
    fontSize: 14,
  },
  input: {
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#BFBFBF',
    backgroundColor: 'white',
    color: 'black',
    height: 45,
    padding: 0,
    paddingLeft: 10,
    fontSize: 14,
  },
});
