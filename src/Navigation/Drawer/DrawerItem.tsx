import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import scaler from 'src/Utils/Shared/scaler';
import Typography from 'src/Components/Shared/Typography/Typography';
import Spacer from 'src/Components/Shared/Spacer/Spacer';
import Row from 'src/Components/Shared/Row/Row';

type PropType = {
  title: string;
  leftImage?: any;
  onPress?: () => void | undefined | any;
};

function DrawerItem({title, leftImage, onPress}: PropType) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Row style={style.viewStyle}>
        <Image style={style.titleImage} source={leftImage} />
        <Spacer horizontal={true} />
        <Typography
          color={'#FFFFFF'}
          textAlign={'left'}
          type={'medium'}
          fontSize={scaler(16)}>
          {title}
        </Typography>
      </Row>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  viewStyle: {
    padding: scaler(10),
    height: scaler(65),
  },
  titleImage: {
    height: scaler(20),
    width: scaler(20),
    resizeMode: 'contain',
  },
});

export default DrawerItem;
