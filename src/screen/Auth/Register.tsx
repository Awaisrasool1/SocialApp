import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
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
import ImagePicker from 'react-native-image-crop-picker';
import {uploadImg} from '../../services/Put';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [bio, setBio] = useState('');
  const [img, setImg] = useState('');
  const [flag, setFlag] = useState(true);
  const nav: any = useNavigation();
  //error state
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPassowrdError] = useState('');
  const [conPasswordError, setConPasswordError] = useState('');
  const [bioError, setBioError] = useState('');

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
  const isValid2 = () => {
    let valid = true;
    setBioError('');
    if (bio == '') {
      setBioError('Please Enter about your self');
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
          image: img ? img : null,
          bio: bio,
        };
        console.log(data);
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
          setFlag(true);
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
    } else {
      ToastAndroid.showWithGravityAndOffset(
        JSON.stringify('No internet Connection'),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  };
  const imgPicker = () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      mediaType: 'photo',
    }).then(async (image: any) => {
      const formData = new FormData();
      formData.append('file', {
        uri: image.path,
        type: image.mime,
        name: image.path.split('/').pop(),
      });
      const res = await uploadImg(formData);
      console.log(res);
      if (res.status) {
        setImg(res.fileUrl);
      }
    });
  };
  return (
    <ScrollView style={styles.container}>
      {flag ? (
        <>
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
              {nameError != '' && (
                <Text style={styles.errorText}>{nameError}</Text>
              )}
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
              title="Next"
              onPress={() => {
                if (isValid()) {
                  setFlag(false);
                }
              }}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.flexRow}>
            <TouchableOpacity
              onPress={() => {
                setFlag(true);
              }}>
              <Image
                source={require('../../assest/Img/arrowback.png')}
                style={{tintColor: 'black'}}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.heading,
                {
                  marginTop: 20,
                  width: '85%',
                },
              ]}>
              Complete Your Profile
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              imgPicker();
            }}>
            <Image
              source={
                img != '' ? {uri: img} : require('../../assest/Img/jhon.png')
              }
              style={styles.defultImg}
            />
          </TouchableOpacity>
          <View style={{marginBottom: 20}}>
            <Text style={styles.lebel}>Bio</Text>
            <InputText
              onBlur={() => isValid()}
              value={bio}
              style={{
                height: 100,
                textAlignVertical: 'top',
                paddingTop: 10,
                paddingLeft: 20,
              }}
              placeHolder=""
              onChange={setBio}
              multiline={true}
            />
            {bioError != '' && <Text style={styles.errorText}>{bioError}</Text>}
          </View>
          <Buttons
            title="Sign Up"
            onPress={() => {
              if (isValid2()) {
                isRegister();
              }
            }}
          />
          <TouchableOpacity onPress={() => nav.navigate(LOGIN_SCREEN)}>
            <Text style={styles.remember}>
              {'Already have Account? '}
              <Text style={[styles.remember, {color: '#1E71B7'}]}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}
//
