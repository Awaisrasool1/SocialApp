import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import Theme from '../../theme/Theme';
import styles from './style';
import InputText from '../../component/InputText/InputText';
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
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <ScrollView style={styles.container}>
      <FastImage
        source={Theme.icons.SignUpGif}
        style={styles.image}
        resizeMode="center"
      />
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
          title="LogIn"
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
          <Text style={[styles.remember, {color: Theme.colors.lightBlue}]}>
            Sign In
          </Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
//
