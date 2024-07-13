import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import Theme from '../../theme/Theme';
import styles from './style';
import InputText from '../../component/InputText/InputText';
import Buttons from '../../component/Buttons/Buttons';
import {isValidEmail} from '../../utils/Validations';
import {useNavigation} from '@react-navigation/native';
import {Register} from '../../utils/Constants';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav: any = useNavigation();
  //error state
  const [emailError, setEmailError] = useState('');
  const isValid = () => {
    let valid = true;
    setEmailError('');
    console.log();

    if (!isValidEmail(email)) {
      setEmailError('Please Enter valid Email');
      valid = false;
    }
    return valid;
  };
  return (
    <ScrollView style={styles.container}>
      <FastImage
        source={Theme.icons.LoginGif}
        style={styles.image}
        resizeMode="center"
      />
      <View style={styles.rowGap}>
        <View>
          <InputText
            onBlur={() => isValid()}
            value={email}
            label="Email"
            placeHolder="example@gmail.com"
            onChange={setEmail}
          />
          {emailError != '' && (
            <Text style={styles.errorText}>{emailError}</Text>
          )}
        </View>
        <InputText
          onBlur={() => isValid()}
          value={password}
          label="Password"
          placeHolder="*******"
          onChange={setPassword}
        />
        <Buttons
          title="LogIn"
          onPress={() => {
            if (isValid()) {
            }
          }}
        />
      </View>
      <TouchableOpacity onPress={() => nav.navigate(Register)}>
        <Text style={styles.remember}>
          {'Don’t have an acount? '}
          <Text style={[styles.remember, {color: Theme.colors.lightBlue}]}>
            Sign Up
          </Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
//
