import {View, Text, Image, Animated, ScrollView} from 'react-native';
import React, {useRef} from 'react';
import Header from '../../component/header/Header';
import styles from './style';
import InputText from '../../component/InputText/InputText';

export default function Home() {
  const animation = useRef(new Animated.Value(0)).current;

  const onFocus = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  const onBlur = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -55],
  });
 
  return (
    <>
      <Header title={'Home'} />
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateY: height,
              },
            ],
          },
        ]}>
        <View style={{marginTop: 15}} />
        <InputText
          placeHolder="Search for Friend"
          onFocus={() => {
            onFocus();
          }}
          onBlur={() => {
            onBlur();
          }}
        />
        <View style={{marginTop: 20}} />
        <View style={styles.itemContainer}>
          <Image
            source={require('../../assest/Img/1.jpg')}
            style={styles.itemImg}
          />
          <View>
            <Text style={styles.itemTitle}> asdada</Text>
            <Text style={styles.itemMessage}> asdada</Text>
          </View>
        </View>
      </Animated.View>
    </>
  );
}
