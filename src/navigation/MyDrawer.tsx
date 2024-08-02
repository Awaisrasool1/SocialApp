import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screen/Home/Home';
import {Constants} from '../utils';
import Profile from '../screen/profile/Profile';
import CustomDrawer from './CustomDrawer';
import {Image} from 'react-native';
import Friends from '../screen/friends/Friends';
import YourFriends from '../screen/YourFriends/YourFriends';

const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName={Constants.Home}
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#1E71B7',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          // marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name={Constants.Home}
        component={Home}
        options={{
          drawerLabel: 'Home',
          headerTitleAlign: 'center',
          headerTitle: 'Home',
          drawerIcon: ({color}) => (
            <Image
              source={require('../assest/Img/home.png')}
              style={{tintColor: color}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={Constants.Friends}
        component={Friends}
        options={{
          drawerLabel: 'Friends',
          headerTitleAlign: 'center',
          headerTitle: 'Friends',
          drawerIcon: ({color}) => (
            <Image
              source={require('../assest/Img/add-friend.png')}
              style={{tintColor: color}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={Constants.YourFriend}
        component={YourFriends}
        options={{
          drawerLabel: 'Chat',
          headerTitleAlign: 'center',
          headerTitle: 'Chat',
          drawerIcon: ({color}) => (
            <Image
              source={require('../assest/Img/chat.png')}
              style={{tintColor: color}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={Constants.Profile}
        component={Profile}
        options={{
          drawerLabel: 'Profile',
          headerTitleAlign: 'center',
          headerTitle: 'Profile',
          drawerIcon: ({color}) => (
            <Image
              source={require('../assest/Img/account.png')}
              style={{tintColor: color}}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
export default MyDrawer;
