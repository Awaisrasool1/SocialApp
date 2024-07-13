import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import Theme from '../../theme/Theme';
import styles from './style';
import InputText from '../../component/InputText/InputText';
import Buttons from '../../component/Buttons/Buttons';
import {isValidEmail} from '../../utils/Validations';
import {useNavigation} from '@react-navigation/native';
import {Home, LOGIN_SCREEN, Register} from '../../utils/Constants';
import {isNetworkAvailable} from '../../api/api';
import {userLogin} from '../../services/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav: any = useNavigation();
  //error state
  const [emailError, setEmailError] = useState('');
  const isValid = () => {
    let valid = true;
    setEmailError('');
    if (!isValidEmail(email)) {
      setEmailError('Please Enter valid Email');
      valid = false;
    }
    return valid;
  };
  const doLogin = async () => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        let data = {
          email: email,
          password: password,
        };
        const res = await userLogin(data);
        if (res?.status == 'success') {
          ToastAndroid.showWithGravityAndOffset(
            res?.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          setEmail('');
          setPassword('');
          nav.reset({
            index: 0,
            routes: [
              {
                name: Home,
              },
            ],
          });
        }
      } catch (e: any) {
        ToastAndroid.showWithGravityAndOffset(
          JSON.stringify(e?.response?.data?.message),
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    }
  };
  return (
    <ScrollView style={styles.container}>
      <FastImage
        source={Theme.icons.LoginGif}
        style={styles.image}
        resizeMode="center"
      />
      <Text style={styles.heading}>Login</Text>
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
              doLogin();
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
