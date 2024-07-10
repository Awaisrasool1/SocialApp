import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Constants} from '../utils';
import Splash from '../screen/Auth/Splash';
import Login from '../screen/Auth/Login';
import Register from '../screen/Auth/Register';

const Stack = createNativeStackNavigator();

const AuthStackNavigation = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={Constants.SPLASH_SCREEN}
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
      </Stack.Navigator>
    </>
  );
};

export default AuthStackNavigation;
