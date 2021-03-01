import React, {useMemo, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Row from 'src/Components/Shared/Row/Row';
import Typography from 'src/Components/Shared/Typography/Typography';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import scaler from 'src/Utils/Shared/scaler';
import {useTheme} from 'react-native-paper';
import Center from 'src/Components/Shared/Center/Center';

type PropType = {
  visible: boolean;
  onDismiss?: any;
  children?: any;
  onPress?: () => void | undefined | any;
};

const AppDropdown = ({visible, onDismiss}: PropType) => {
  const theme = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        itemsRow: {
          alignItems: 'center',
          padding: scaler(20),
          borderTopColor: theme.colors.lightGray,
          borderTopWidth: scaler(1),
        },
        containerStyle: {
          backgroundColor: 'white',
        },
      }),
    [],
  );

  const [sortBy, setSortBy] = useState(0);

  if (visible)
    return (
      <Modal
        hardwareAccelerated
        visible={visible}
        transparent={true}
        onRequestClose={onDismiss}>
        <Center style={{backgroundColor: '#000000cc'}} allAxis>
          <View style={{backgroundColor: 'white', width: '100%'}}>
            <Row style={styles.itemsRow}>
              <Typography
                fontSize={scaler(12)}
                type={'medium'}
                style={{flex: 1}}>
                1
              </Typography>
              <SimpleLineIcons
                onPress={onDismiss}
                name={'arrow-up'}
                size={scaler(12)}
              />
            </Row>
            <Row style={styles.itemsRow}>
              <Typography
                fontSize={scaler(12)}
                type={'medium'}
                onPress={() => setSortBy(1)}
                style={{flex: 1}}>
                2
              </Typography>
              {sortBy == 1 ? (
                <Icon name={'checkmark'} color={'#94C356'} size={scaler(20)} />
              ) : null}
            </Row>
            <Row style={styles.itemsRow}>
              <Typography
                fontSize={scaler(12)}
                type={'medium'}
                onPress={() => setSortBy(2)}
                style={{flex: 1}}>
                3
              </Typography>
              {sortBy == 2 ? (
                <Icon name={'checkmark'} color={'#94C356'} size={scaler(20)} />
              ) : null}
            </Row>
            <Row style={styles.itemsRow}>
              <Typography
                fontSize={scaler(12)}
                type={'medium'}
                onPress={() => setSortBy(3)}
                style={{flex: 1}}>
                4
              </Typography>
              {sortBy == 3 ? (
                <Icon name={'checkmark'} color={'#94C356'} size={scaler(20)} />
              ) : null}
            </Row>
          </View>
        </Center>
      </Modal>
    );
  return <View />;
};

export default AppDropdown;

// import AppDropdown from 'src/Components/Custom/AppDropdown';19
{
  /* <AppDropdown visible={sortByVisible} onDismiss={hideModal} /> */
}
144;
