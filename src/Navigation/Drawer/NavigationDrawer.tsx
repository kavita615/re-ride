import CarScreen from 'src/Screens/CarScreen/CarScreen';
import DrawerMenu from './DrawerMenu';

import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function NavigationDrawer() {
  return (
    <Drawer.Navigator
      drawerStyle={{width: '70%', backgroundColor: '#000000'}}
      drawerType="slide"
      screenOptions={{swipeEnabled: false}}
      keyboardDismissMode="none"
      initialRouteName="CarStack"
      drawerContent={(props: any) => <DrawerMenu {...props} />}>
      <Drawer.Screen name="CarStack" component={CarStackScreen} />
    </Drawer.Navigator>
  );
}

export const CarStackScreen = () => {
  return (
    <Stack.Navigator initialRouteName="CarScreen">
      <Stack.Screen
        name="Car"
        component={CarScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default NavigationDrawer;
