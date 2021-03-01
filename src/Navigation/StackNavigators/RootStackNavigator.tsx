import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import LoginScreen from 'src/Screens/Login/LoginScreen';

import CarScreen from '../../Screens/CarScreen/CarScreen';

const RootStack = createStackNavigator();

function RootStackNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="Car"
        component={CarScreen}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
}

export default RootStackNavigator;
