import React, {useMemo} from 'react';
import {StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import scaler from 'src/Utils/Shared/scaler';
import Typography from 'src/Components/Shared/Typography/Typography';
import Row from 'src/Components/Shared/Row/Row';
import AntDesign from 'react-native-vector-icons/AntDesign';
type PropType = {
  loading?: boolean;
  ApiresStatus?: string;
  children?: any;
  Loadingtitle: string;
  Successtitle: string;
  onPress?: () => void | undefined | any;
};

function ButtonComponent({
  loading,
  children,
  onPress,
  Loadingtitle,
  Successtitle,
  ApiresStatus,
}: PropType) {
  const style = useMemo(
    () =>
      StyleSheet.create({
        btn: {
          backgroundColor: 'black',
          paddingVertical: scaler(20),
          borderRadius: 0,
          alignItems: 'center',
          marginTop: scaler(20),
        },
      }),
    [],
  );
  return (
    <TouchableOpacity activeOpacity={1} style={style.btn} onPress={onPress}>
      <Row style={{marginHorizontal: scaler(25)}}>
        <Typography
          style={{flex: 2}}
          textAlign={'center'}
          type={'medium'}
          fontSize={scaler(16)}
          color={'white'}>
          {loading
            ? Loadingtitle
            : ApiresStatus === 'success'
            ? Successtitle
            : children}
        </Typography>

        {loading ? (
          <ActivityIndicator color="white" size="small" />
        ) : ApiresStatus == 'success' ? (
          <AntDesign name={'checkcircle'} size={scaler(20)} color={'#94C356'} />
        ) : null}
      </Row>
    </TouchableOpacity>
  );
}

export default ButtonComponent;
