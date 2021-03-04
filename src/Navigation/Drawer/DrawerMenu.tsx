import React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Container from 'src/Components/Shared/Container/Container';
import scaler from 'src/Utils/Shared/scaler';
import DrawerItem from 'src/Navigation/Drawer/DrawerItem';

import images from 'src/Assets/images';
import AppStateHandler from 'src/StateHandlers/AppStateHandler';
function DrawerMenu(props: any) {
  console.log(props);
  const {navigation} = props;

  return (
    <DrawerContentScrollView {...props}>
      <Container backgroundColor={'#000000'}>
        <View style={styles.drawerItems}>
          <DrawerItem
            title={'Home'}
            onPress={() => {
              navigation.navigate('Car');
            }}
            leftImage={images.home}
          />
          <DrawerItem
            title={'Log Out'}
            leftImage={images.logout}
            onPress={() => {
              Alert.alert(
                'Reride',
                'Are you sure?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      AppStateHandler.logout();
                    },
                  },
                ],
                {cancelable: false},
              );
            }}
          />
        </View>
      </Container>
    </DrawerContentScrollView>
  );
}

export default DrawerMenu;

const styles = StyleSheet.create({
  drawerItems: {
    marginTop: scaler(10),
    marginLeft: scaler(10),
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
});
