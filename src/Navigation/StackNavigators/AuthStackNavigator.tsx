// import HomeScreen from 'src/Screens/Home/HomeScreen';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NavigationDrawer from 'src/Navigation/Drawer/NavigationDrawer';

const AuthStack = createStackNavigator();

function AuthStackNavigator() {
  return (
    <AuthStack.Navigator initialRouteName={'Drawer'}>
      <AuthStack.Screen
        name="Drawer"
        component={NavigationDrawer}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;
