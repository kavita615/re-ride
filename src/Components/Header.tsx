import React, {useMemo} from 'react';
import {Image, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import scaler from 'src/Utils/Shared/scaler';
import {Appbar} from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Typography from 'src/Components/Shared/Typography/Typography';
import Spacer from 'src/Components/Shared/Spacer/Spacer';
import images from 'src/Assets/images';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {color} from 'react-native-reanimated';

type PropType = {
  title?: string;
  onPressLeft?: any;
  onPressRight?: any;
  leftImage?: 'menu' | 'arrow-left';
  rightImage?: 'magnifier' | 'plus';
  backgroundColor?: string;
  onPress?: () => void | undefined | any;
};

function Header({
  title,
  onPressLeft,
  onPressRight,
  leftImage,
  rightImage,
  backgroundColor,
}: PropType) {
  const theme = useTheme();
  const navigation = useNavigation();

  const style = useMemo(
    () =>
      StyleSheet.create({
        header: {
          backgroundColor: backgroundColor || theme.colors.white,
          elevation: 0,
          paddingHorizontal: scaler(20),
          alignItems: 'center',
        },
        titleImage: {
          flex: 1,
          height: scaler(30),
          width: '100%',
          resizeMode: 'contain',
        },
      }),
    [],
  );
  return (
    <Appbar.Header style={style.header}>
      {leftImage ? (
        <SimpleLineIcons
          name={leftImage}
          size={scaler(20)}
          color={backgroundColor ? 'white' : 'black'}
          onPress={
            onPressLeft
              ? onPressLeft
              : leftImage === 'arrow-left'
              ? () => navigation.goBack()
              : leftImage === 'menu'
              ? () => navigation.dispatch(DrawerActions.toggleDrawer())
              : () => {}
          }
        />
      ) : (
        <Spacer horizontal size={scaler(20)} />
      )}
      {title ? (
        <Typography
          style={{flex: 1}}
          textAlign={'center'}
          type={'medium'}
          fontSize={scaler(18)}
          color={backgroundColor ? 'white' : 'black'}>
          {title}
        </Typography>
      ) : (
        <Image style={style.titleImage} source={images.logo} />
      )}
      {rightImage ? (
        rightImage == 'plus' ? (
          <AntDesign
            name={rightImage}
            size={scaler(20)}
            onPress={onPressRight}
            color={backgroundColor ? 'white' : 'black'}
          />
        ) : (
          <SimpleLineIcons
            name={rightImage}
            size={scaler(20)}
            onPress={onPressRight}
            color={backgroundColor ? 'white' : 'black'}
          />
        )
      ) : (
        <Spacer horizontal size={scaler(20)} />
      )}
    </Appbar.Header>
  );
}

export default Header;
