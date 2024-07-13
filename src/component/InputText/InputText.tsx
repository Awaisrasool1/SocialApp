import {StyleSheet, View, TextInput, Text, Animated} from 'react-native';
import React, {useRef, useState} from 'react';
import Theme from '../../theme/Theme';

interface props {
  value?: string;
  label?: string;
  placeHolder?: string;
  style?: any;
  onBlur: () => void;
  onChange: (i: string) => void;
}
export default function InputText(props: props) {
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
        placeholderTextColor={Theme.colors.black}
        style={[
          styles.input,
          flag && props.value == ''
            ? {
                borderColor: Theme.colors.lightBlue,
                borderWidth: 0.5,
              }
            : flag && props.value != ''
            ? {
                borderColor: Theme.colors.lightBlue,
                borderWidth: 0.5,
              }
            : flag == false &&
              props.value != '' && {
                borderColor: Theme.colors.disabled,
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
    marginLeft: Theme.responsiveSize.size10,
    backgroundColor: Theme.colors.white,
    paddingHorizontal: 5,
    color: Theme.colors.black,
    fontWeight: '500',
    fontSize: Theme.responsiveSize.size14,
  },
  input: {
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: Theme.colors.disabled,
    backgroundColor: Theme.colors.white,
    color: Theme.colors.black,
    height: Theme.responsiveSize.size40,
    padding: 0,
    paddingLeft: Theme.responsiveSize.size10,
    fontSize: Theme.responsiveSize.size14,
  },
});
