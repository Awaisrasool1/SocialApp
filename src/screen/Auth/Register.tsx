import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import styles from './style';
import InputText from '../../component/InputText/AnimationInputText';
import Buttons from '../../component/Buttons/Buttons';
import {isValidEmail, isValidPassword} from '../../utils/Validations';
import {useNavigation} from '@react-navigation/native';
import {LOGIN_SCREEN} from '../../utils/Constants';
import {isNetworkAvailable} from '../../api/api';
import {userCreate} from '../../services/auth';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [conPassword, setConPassword] = useState('');
  const nav: any = useNavigation();
  //error state
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPassowrdError] = useState('');
  const [conPasswordError, setConPasswordError] = useState('');

  const isValid = () => {
    let valid = true;
    setEmailError('');
    setPassowrdError('');
    setNameError('');
    setConPasswordError('');
    if (userName == '') {
      setNameError('Plase Enter User Name!');
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Please Enter valid Email');
      valid = false;
    } else if (!isValidPassword(password)) {
      setPassowrdError(
        ' Password must be 8 characters long containing at least 1 lowercase, 1 uppercase, 1 number and 1 special character.',
      );
      valid = false;
    } else if (conPassword != password) {
      setConPasswordError("Password Doesn't Match!");
      valid = false;
    }
    return valid;
  };
  const isRegister = async () => {
    const isConnected = await isNetworkAvailable();
    if (isConnected) {
      try {
        let data = {
          username: userName,
          email: email,
          password: password,
        };
        const res = await userCreate(data);
        if (res.status == 'success') {
          ToastAndroid.showWithGravityAndOffset(
            res?.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
          setUserName('');
          setEmail('');
          setPassword('');
          nav.navigate(LOGIN_SCREEN);
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
        source={require('../../assest/Img/SignUp.gif')}
        style={styles.image}
        resizeMode="center"
      />
      <Text style={styles.heading}>Register</Text>
      <View style={styles.rowGap}>
        <View>
          <InputText
            onBlur={() => isValid()}
            value={userName}
            label="User Name"
            placeHolder=""
            onChange={setUserName}
          />
          {nameError != '' && <Text style={styles.errorText}>{nameError}</Text>}
        </View>
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
        <View>
          <InputText
            onBlur={() => isValid()}
            value={password}
            label="Password"
            placeHolder="*******"
            onChange={setPassword}
          />
          {passwordError != '' && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}
        </View>
        <View>
          <InputText
            onBlur={() => isValid()}
            value={conPassword}
            label="Confirm Password"
            placeHolder="*******"
            onChange={setConPassword}
          />
          {conPasswordError != '' && (
            <Text style={styles.errorText}>{conPasswordError}</Text>
          )}
        </View>
        <Buttons
          title="Sign Up"
          onPress={() => {
            if (isValid()) {
              isRegister();
            }
          }}
        />
      </View>
      <TouchableOpacity onPress={() => nav.navigate(LOGIN_SCREEN)}>
        <Text style={styles.remember}>
          {'Already have Account? '}
          <Text style={[styles.remember, {color: '#1E71B7'}]}>
            Sign In
          </Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
//
