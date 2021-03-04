import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ForgotPassword from 'src/Screens/ForgotPassword/ForgotPassword';
import LoginScreen from 'src/Screens/Login/LoginScreen';

const RootStack = createStackNavigator();

function RootStackNavigator() {
  return (
    <RootStack.Navigator initialRouteName={'Login'}>
      <RootStack.Screen
        name="Forgot"
        component={ForgotPassword}
        options={{headerShown: false}}
      />

      <RootStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
}

export default RootStackNavigator;
