import * as React from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import scaler from 'src/Utils/Shared/scaler';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Row from 'src/Components/Shared/Row/Row';
import Typography from 'src/Components/Shared/Typography/Typography';

type PropType = {
  heading?: any;
  data: Array<any>;
  noOfColumns?: any;
  visible: boolean;
  onDismiss?: any;
  text?: any;
  type: 1 | 2;
  onChange?: (value: any) => void | undefined | any;
};

const ScreenDropdown = ({
  visible,
  onDismiss,
  heading,
  onChange,
  data,
  type,
  noOfColumns,
}: PropType) => {
  const lightGray = '#D3D3D3';
  const styles = StyleSheet.create({
    itemsRow: {
      alignItems: 'center',
      padding: scaler(20),
      borderColor: lightGray,
      borderBottomWidth: scaler(1),
    },
    innerRow: {
      flex: 1,
      alignItems: 'center',
      padding: scaler(15),
      borderColor: lightGray,
      borderBottomWidth: scaler(1),
      borderEndWidth: scaler(0.5),
    },
    containerStyle: {
      backgroundColor: 'white',
    },
    circleView: {
      height: scaler(20),
      width: scaler(20),
      borderRadius: scaler(10),
      backgroundColor: 'black',
      marginRight: scaler(10),
    },
  });

  const renderVehicleItem = ({item, index}: any) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={
          type === 1
            ? styles.itemsRow
            : [styles.innerRow, {flexDirection: 'row'}]
        }
        onPress={() => {
          onChange && onChange(item);
          onDismiss && onDismiss();
        }}>
        <Typography fontSize={scaler(14)} type={'medium'}>
          {item.title}
        </Typography>
      </TouchableOpacity>
    );
  };

  if (visible)
    return (
      <Modal
        hardwareAccelerated
        visible={visible}
        transparent={true}
        onRequestClose={onDismiss}
        animationType="slide"
        presentationStyle="overFullScreen">
        <SafeAreaView />
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000cc',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              maxHeight: '70%',
            }}>
            <Row style={styles.itemsRow}>
              <Typography
                style={{flex: 1}}
                fontSize={scaler(16)}
                type={'medium'}>
                {heading}
              </Typography>
              <SimpleLineIcons
                name={'arrow-up'}
                size={scaler(15)}
                onPress={onDismiss}
              />
            </Row>
            <FlatList
              keyboardShouldPersistTaps={'always'}
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderVehicleItem}
              numColumns={noOfColumns || 1}
            />
          </View>
          <SafeAreaView style={{backgroundColor: 'white'}} />
        </View>
      </Modal>
    );
  return <View />;
};

export default ScreenDropdown;
