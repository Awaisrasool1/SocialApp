import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Constants} from '../utils';
import Splash from '../screen/Auth/Splash';
import Login from '../screen/Auth/Login';
import Register from '../screen/Auth/Register';
import Home from '../screen/Home/Home';
import Friends from '../screen/friends/Friends';
import Profile from '../screen/profile/Profile';

const Stack = createNativeStackNavigator();

const AuthStackNavigation = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={Constants.LOGIN_SCREEN}
        screenOptions={({navigation, route}: any) => ({})}>
        <Stack.Screen
          name={Constants.SPLASH_SCREEN}
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Constants.LOGIN_SCREEN}
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Constants.Register}
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Constants.Home}
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Constants.Friends}
          component={Friends}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={Constants.Profile}
          component={Profile}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthStackNavigation;
