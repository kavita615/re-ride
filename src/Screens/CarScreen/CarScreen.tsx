import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Typography from 'src/Components/Shared/Typography/Typography';
import scaler from 'src/Utils/Shared/scaler';
import Header from 'src/Components/Header';
import Container from 'src/Components/Shared/Container/Container';
import Row from 'src/Components/Shared/Row/Row';
import Spacer from 'src/Components/Shared/Spacer/Spacer';
// import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {DrawerActions, useNavigation} from '@react-navigation/native';

import Col from 'src/Components/Shared/Col/Col';
import ScreenDropdown from 'src/Screens/CarScreen/ScreenDropdown';

function CarScreen() {
  const [sortByVisible, setSortByVisible] = useState(false);

  const showModal = () => setSortByVisible(true);
  const hideModal = () => setSortByVisible(false);

  const [selectedYear, setSelectedYear] = useState('');

  const [brandVisible, setBrandVisible] = useState(false);

  const [colorVisible, setColorVisible] = useState(false);
  const [yearVisible, setYearVisible] = useState(false);

  const showBrandModal = () => setBrandVisible(true);

  const showYearModal = () => setYearVisible(true);

  const showColorModel = () => setColorVisible(true);

  const [viewType, setViewType] = useState(1);

  const [vehicles, setVehicles] = useState([]);
  const [model, setModel] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const navigation = useNavigation();

  const brands = [
    {
      title: 'All',
    },
    {
      title: 'BMW',
    },
    {
      title: 'Mercedes',
    },
    {
      title: 'Suzuki',
    },
    {
      title: 'Tesla',
    },
    {
      title: 'Toyota',
    },
    {
      title: 'Audi',
    },
  ];
  const years = [
    {
      title: 'All',
    },
    {
      title: 1995,
    },
    {
      title: 1996,
    },
    {
      title: 1997,
    },
    {
      title: 1998,
    },
    {
      title: 1999,
    },
    {
      title: 2000,
    },
  ];

  const color = [
    {
      title: 'All',
    },
    {
      title: 'Red',
    },
    {
      title: 'Yellow',
    },
    {
      title: 'Green',
    },
    {
      title: 'Black',
    },
    {
      title: 'White',
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const endPoint = 'https://jsonplaceholder.typicode.com/photos?_limit=20';
    const res = await fetch(endPoint);
    setVehicles(await res.json());
  };
  const black = '#000';
  const lightGray = '#D3D3D3';
  const styles = StyleSheet.create({
    View: {
      height: scaler(8),
      width: scaler(8),
      borderRadius: scaler(4),
      backgroundColor: '#94C356',
    },
    itemsRow: {
      alignItems: 'center',
      padding: scaler(15),
      borderTopColor: lightGray,
      borderTopWidth: scaler(1),
    },
    innerRow: {
      flex: 1,
      alignItems: 'center',
      padding: scaler(15),
      borderColor: lightGray,
      borderTopWidth: scaler(1),
      borderEndWidth: scaler(0.5),
    },
    View2: {
      width: scaler(21),
      height: scaler(10),
      backgroundColor: lightGray,
    },
  });

  const carDetails = ({item, index}: any) => {
    return (
      <View
        style={{
          flex: 1,
          borderBottomColor: lightGray,
          borderBottomWidth: scaler(1),
        }}>
        <TouchableOpacity>
          <Image
            style={{
              width: '100%',
              height: scaler(220 / viewType),
            }}
            source={{uri: 'https://picsum.photos/200/300?random=' + index}}
          />
        </TouchableOpacity>
        <Col style={{paddingHorizontal: scaler(10), paddingTop: scaler(10)}}>
          <Row>
            <Typography fontSize={scaler(8)} type={'light'} style={{flex: 1}}>
              {item.created_at ?? '25-02-21'}
            </Typography>
            <View style={styles.View} />
            <View
              style={[
                styles.View,
                {backgroundColor: '#69ACDF', marginHorizontal: scaler(2)},
              ]}
            />
            <Image
              style={{resizeMode: 'contain'}}
              source={{uri: 'https://picsum.photos/200/300?random=1'}}
            />
          </Row>
          <View
            style={[
              {
                paddingVertical: scaler(7),
                flexDirection: viewType == 1 ? 'row' : 'column',
              },
            ]}>
            <Typography
              style={{flex: 1}}
              fontSize={scaler(14)}
              type={'regular'}>
              {item.title}{' '}
              <Typography fontSize={scaler(14)} type={'medium'}>
                {item.model_name ?? 'model'}
              </Typography>{' '}
              {item.year ?? '2021'}
            </Typography>
            <Typography fontSize={scaler(16)} type={'medium'}>
              {item.price ?? '$500'}
            </Typography>
          </View>
        </Col>
      </View>
    );
  };

  return (
    <Container backgroundColor={'white'} fullScreen={true}>
      <View style={{marginTop: 10}}>
        <Header leftImage={'menu'} rightImage={'magnifier'} />
      </View>
      <Spacer />
      <ScreenDropdown
        text={'Car Brand'}
        heading={'Brand'}
        onChange={(value) => {
          setModel(value.title);
        }}
        visible={brandVisible}
        onDismiss={() => setBrandVisible(false)}
        data={brands}
        type={1}
      />
      <ScreenDropdown
        heading={'Year'}
        onChange={(value) => {
          setSelectedYear(value.title);
        }}
        visible={yearVisible}
        onDismiss={() => setYearVisible(false)}
        data={years}
        type={1}
      />
      <ScreenDropdown
        heading={'Color'}
        visible={colorVisible}
        onChange={(value) => {
          setSelectedColor(value.title);
        }}
        onDismiss={() => setColorVisible(false)}
        data={color}
        type={1}
      />

      <View style={{flex: 1}}>
        <Row>
          <TouchableOpacity
            style={[styles.innerRow, {flexDirection: 'row'}]}
            onPress={showBrandModal}>
            <Typography fontSize={scaler(16)} type={'medium'} style={{flex: 1}}>
              {model && model !== 'All' ? model : 'Brand'}
            </Typography>
            <SimpleLineIcons name={'arrow-down'} size={scaler(15)} />
          </TouchableOpacity>
        </Row>
        <Row>
          <TouchableOpacity
            style={[styles.innerRow, {flexDirection: 'row'}]}
            onPress={showYearModal}>
            <Typography fontSize={scaler(16)} type={'medium'} style={{flex: 1}}>
              {selectedYear && selectedYear !== 'All' ? selectedYear : 'Year'}
            </Typography>
            <SimpleLineIcons
              name={'arrow-down'}
              size={scaler(15)}
              onPress={showYearModal}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.innerRow, {flexDirection: 'row'}]}
            onPress={showColorModel}>
            <Typography fontSize={scaler(16)} type={'medium'} style={{flex: 1}}>
              {selectedColor && selectedColor !== 'All'
                ? selectedColor
                : 'Color'}
            </Typography>
            <SimpleLineIcons name={'arrow-down'} size={scaler(15)} />
          </TouchableOpacity>
        </Row>

        <Row
          style={{
            alignItems: 'center',
            padding: scaler(15),
            borderTopColor: lightGray,
            borderTopWidth: scaler(1),
          }}>
          <Typography fontSize={scaler(16)} type={'medium'}>
            Recently
          </Typography>
          <Row
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Typography fontSize={scaler(12)} type={'thin'}>
              View
            </Typography>
            <TouchableOpacity
              onPress={() => setViewType(2)}
              style={[
                {
                  width: scaler(21),
                  height: scaler(10),
                  marginHorizontal: scaler(10),
                  backgroundColor: viewType == 2 ? black : lightGray,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <View
                style={{
                  height: '100%',
                  width: scaler(1),
                  backgroundColor: 'white',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setViewType(1)}
              style={[
                {
                  backgroundColor: viewType == 1 ? black : lightGray,
                  width: scaler(21),
                  height: scaler(10),
                },
              ]}
            />
          </Row>
          <Row style={{alignItems: 'center', justifyContent: 'center'}}>
            <Typography
              fontSize={scaler(12)}
              type={'medium'}
              style={{paddingRight: scaler(5)}}>
              Sort By
            </Typography>
            <SimpleLineIcons
              name={'arrow-down'}
              size={scaler(12)}
              onPress={showModal}
            />
          </Row>
        </Row>
        <FlatList
          data={vehicles}
          key={viewType}
          keyExtractor={(item, index) => index.toString()}
          renderItem={carDetails}
          numColumns={viewType}
        />
      </View>
    </Container>
  );
}

export default CarScreen;
