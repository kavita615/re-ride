import React, {Fragment, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Image, Platform, StyleSheet, View} from 'react-native';
import FormInput from 'src/Components/Shared/FormInput/FormInput';
import Row from 'src/Components/Shared/Row/Row';
import Spacer from 'src/Components/Shared/Spacer/Spacer';
import scaler from 'src/Utils/Shared/scaler';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Typography from 'src/Components/Shared/Typography/Typography';
// import AppButton from 'src/Components/Custom/AppButton/AppButton';
// import PickerComponent from './PickerComponent';
import ComplexDropdown from 'src/Screens/CarScreen/ComplexDropdown';
import {useNavigation} from '@react-navigation/native';
import useApiFetch from 'src/Hooks/Shared/useApiFetch';
import useAuth from 'src/Hooks/Custom/useAuth';
import AppStateHandler from 'src/StateHandlers/AppStateHandler';
// import useMedia from 'src/Components/Custom/useMedia';
// import Popup, {PopupStateHandler} from 'src/Components/Custom/Popup';
import images from 'src/Assets/images';
import Col from 'src/Components/Shared/Col/Col';

const Brand = () => {
  const {control, errors, handleSubmit, setValue} = useForm({
    defaultValues: {
      brand: '',
      model: '',
      year: '',
      importFrom: '',
      price: '',
      mileage: '',
      cylinders: '',
      transmission: '',
      bodyType: '',
      exteriorColor: '',
      interiorColor: '',
      vnNumber: '',
      description: '',
    },
    mode: 'onChange',
  });

  const {data, status, error} = useApiFetch(['/carbrand']);
  console.log(data);

  const [brandVisible, setBrandVisible] = useState(false);
  const [modelVisible, setModelVisible] = useState(false);
  const [yearVisible, setYearVisible] = useState(false);
  const [cylinderVisible, setCylinderVisible] = useState(false);
  const [transmissionVisible, setTransmissionVisible] = useState(false);
  const [bodyVisible, setBodyVisible] = useState(false);
  const [exteriorColorVisible, setExteriorColorVisible] = useState(false);
  const [interiorColorVisible, setInteriorColorVisible] = useState(false);

  const navigation = useNavigation();

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const initialModels: any[] = [];
  const [models, setModels] = useState(initialModels);
  const [selectedModel, setSelectedModel] = useState(null);
  const [cylinders, setCylinders] = useState(initialModels);
  const [selectedCylinder, setSelectedCylinder] = useState(null);
  const [transmissions, setTransmissions] = useState([]);
  const [selectedTransmission, setSelectedTransmission] = useState(null);
  const [bodyTypes, setBodyTypes] = useState([]);
  const [selectedBodyType, setSelectedBodyType] = useState(null);
  const [exteriorColors, setExteriorColors] = useState([]);
  const [selectedExteriorColor, setSelectedExteriorColor] = useState(null);
  const [interiorColors, setInteriorColors] = useState([]);
  const [selectedInteriorColor, setSelectedInteriorColor] = useState(null);
  const initial: any[] = [];
  const [years, setYears] = useState(initial);

  // const {getModel} = useAuth();
  // getModel(selectedBrand);

  const {openCamera, openGallery, data: imagesData = [], clear} = useMedia();
  const [carImages] = imagesData;
  console.log('images are', imagesData);
  const url = (Platform.OS === 'ios' ? 'file://' : '') + carImages?.path;
  const formData = new FormData();
  formData.append('image', {
    uri: url,
    type: carImages?.mime,
    name: url?.substr(url?.lastIndexOf('/') + 1),
  });

  useEffect(() => {
    getYear();
  }, []);

  const {getModel, getSpecifications, addCar} = useAuth();

  const getYear = () => {
    const thisYear = new Date().getFullYear();
    let arr = [];

    for (let i = 0; i < 50; i++) {
      arr.push({text: thisYear - i});
    }
    setYears(arr);
  };

  const submit = handleSubmit((defaultValues) => {
    onSubmit(defaultValues);
  });

  const onSubmit = (values: any) => {
    var photoData = new FormData();
    photoData.append('brand_id', selectedBrand?.id);
    photoData.append('model_id', selectedModel?.id);
    photoData.append('year', values.year);
    photoData.append('import', values.importFrom);
    photoData.append('price', values.price);
    photoData.append('mileage', values.mileage);
    photoData.append('cylinders_id', selectedCylinder?.id);
    photoData.append('transmission_id', selectedTransmission?.id);
    photoData.append('body_type_id', selectedBodyType?.id);
    photoData.append('exterior_color_id', selectedExteriorColor?.id);
    photoData.append('interior_color_id', selectedInteriorColor?.id);
    photoData.append('description', values.description);

    imagesData?.forEach((element: any) => {
      const urls = (Platform.OS === 'ios' ? 'file://' : '') + element.path;
      const newFile = {
        uri: urls,
        type: element.mime,
        name: urls?.substr(urls?.lastIndexOf('/') + 1),
      };
      photoData.append('photos[]', newFile);
    });
    addCar(photoData);
  };

  console.log('AppState is', AppStateHandler.getState().models);

  return (
    <Fragment>
      <ComplexDropdown
        text={'Car Brand'}
        heading={'Brand'}
        onChange={(value) => {
          setValue('brand', value?.brand_name);
          setSelectedBrand(value);
          getModel(value);
          console.log('value is', selectedBrand);
        }}
        visible={brandVisible}
        onDismiss={() => setBrandVisible(false)}
        data={brands}
        type={2}
        noOfColumns={2}
      />

      <ComplexDropdown
        heading={'Model'}
        onChange={(value) => {
          setValue('model', value?.model_name);
          setSelectedModel(value);
          getSpecifications(value);
        }}
        visible={modelVisible}
        onDismiss={() => setModelVisible(false)}
        data={models}
        type={2}
        noOfColumns={2}
      />
      <ComplexDropdown
        heading={'Year'}
        onChange={(value) => {
          setValue('year', value.text.toString());
        }}
        visible={yearVisible}
        onDismiss={() => setYearVisible(false)}
        data={years}
        type={1}
      />
      <ComplexDropdown
        heading={'Cylinder'}
        onChange={(value) => {
          setValue('cylinders', value?.cylinder);
          setSelectedCylinder(value);
        }}
        visible={cylinderVisible}
        onDismiss={() => setCylinderVisible(false)}
        data={cylinders}
        type={1}
      />

      <ComplexDropdown
        heading={'Transmission'}
        onChange={(value) => {
          setValue('transmission', value?.transmission_name);
          setSelectedTransmission(value);
        }}
        visible={transmissionVisible}
        onDismiss={() => setTransmissionVisible(false)}
        data={transmissions}
        type={1}
      />
      <ComplexDropdown
        heading={'Body Type'}
        onChange={(value) => {
          setValue('bodyType', value?.body_name);
          setSelectedBodyType(value);
        }}
        visible={bodyVisible}
        onDismiss={() => setBodyVisible(false)}
        data={bodyTypes}
        type={1}
      />
      <ComplexDropdown
        heading={'Exterior Color'}
        onChange={(value) => {
          setValue('exteriorColor', value?.ext_color);
          setSelectedExteriorColor(value);
        }}
        visible={exteriorColorVisible}
        onDismiss={() => setExteriorColorVisible(false)}
        data={exteriorColors}
        type={1}
      />
      <ComplexDropdown
        heading={'Interior Color'}
        onChange={(value) => {
          setValue('interiorColor', value?.int_color);
          setSelectedInteriorColor(value);
        }}
        visible={interiorColorVisible}
        onDismiss={() => setInteriorColorVisible(false)}
        data={interiorColors}
        type={1}
      />

      <View style={style.viewInput}>
        <Spacer />

        <PickerComponent
          name={'brand'}
          label={'Brand'}
          errorMessage={'Brand is Required'}
          onPress={() => {
            setBrands(
              data?.data?.carBrand.map((item: any) => ({
                ...item,
                text: item.brand_name,
              })),
            );
            setBrandVisible(true);
          }}
          errors={errors}
          control={control}
        />
        <Spacer />

        <PickerComponent
          name={'model'}
          label={'Model'}
          errorMessage={'Model is Required'}
          onPress={() => {
            setModels(
              AppStateHandler.getState().models.map((item: any) => ({
                ...item,
                text: item.model_name,
              })),
            );
            setModelVisible(true);
          }}
          errors={errors}
          control={control}
        />

        <Spacer />
        <PickerComponent
          name={'year'}
          label={'Year'}
          errorMessage={'Year is Required'}
          onPress={() => setYearVisible(true)}
          errors={errors}
          control={control}
        />
        <Spacer />

        <FormInput
          config={{
            name: 'importFrom',
            textInputProps: {
              label: 'Import',
            },
          }}
          rules={{
            required: {
              value: true,
              message: 'Import is required',
            },
          }}
          errors={errors}
          control={control}
        />
        <Spacer />
        <FormInput
          config={{
            name: 'price',
            textInputProps: {
              label: 'Price',
              theme: {colors: {primary: 'black'}},
              placeholderTextColor: 'black',
            },
          }}
          rules={{
            required: {
              value: true,
              message: 'Price is required',
            },
          }}
          errors={errors}
          control={control}
        />
        <Spacer size={scaler(30)} />
        <Row>
          <View style={[style.ratingView, {backgroundColor: '#69ACDF'}]} />
          <Typography
            fontSize={scaler(12)}
            type={'medium'}
            style={{flex: 1, color: '#69ACDF'}}>
            Timely Maintenance Record
          </Typography>
        </Row>
        <Spacer size={scaler(15)} />
        <Row>
          <View style={style.ratingView} />
          <Typography fontSize={scaler(12)} type={'medium'} color={'#94C356'}>
            Approved by Supplier
          </Typography>
        </Row>
        <Spacer size={scaler(30)} />
      </View>
      <View style={style.viewBorder}></View>
      <View style={style.viewInput}>
        <FormInput
          config={{
            name: 'mileage',
            textInputProps: {
              label: 'Mileage',
            },
          }}
          rules={{
            required: {
              value: true,
              message: 'Mileage is required',
            },
          }}
          errors={errors}
          control={control}
        />
        <Spacer />
        <PickerComponent
          name={'cylinders'}
          label={'Cylinders'}
          errorMessage={'Cylinder is Required'}
          onPress={() => {
            setCylinders(
              AppStateHandler.getState().specifications.cylinders.map(
                (item: any) => ({
                  ...item,
                  text: item.cylinder,
                }),
              ),
            );
            setCylinderVisible(true);
          }}
          errors={errors}
          control={control}
        />
        <Spacer />

        <PickerComponent
          name={'transmission'}
          label={'Transmission'}
          errorMessage={'Transmission is Required'}
          onPress={() => {
            setTransmissions(
              AppStateHandler.getState().specifications.transmission.map(
                (item: any) => ({
                  ...item,
                  text: item.transmission_name,
                }),
              ),
            );
            setTransmissionVisible(true);
          }}
          errors={errors}
          control={control}
        />
        <Spacer />

        <PickerComponent
          name={'bodyType'}
          label={'Body Type'}
          errorMessage={'Body Type is Required'}
          onPress={() => {
            setBodyTypes(
              AppStateHandler.getState().specifications.body_type.map(
                (item: any) => ({
                  ...item,
                  text: item.body_name,
                }),
              ),
            );
            setBodyVisible(true);
          }}
          errors={errors}
          control={control}
        />
        <Spacer />

        <PickerComponent
          name={'exteriorColor'}
          label={'Exterior Color'}
          errorMessage={'Exterior Color is Required'}
          onPress={() => {
            setExteriorColors(
              AppStateHandler.getState().specifications.exterior_color.map(
                (item: any) => ({
                  ...item,
                  text: item.ext_color,
                }),
              ),
            );
            setExteriorColorVisible(true);
          }}
          errors={errors}
          control={control}
        />
        <Spacer />

        <PickerComponent
          name={'interiorColor'}
          label={'Interior Color'}
          errorMessage={'Interior Color is Required'}
          onPress={() => {
            setInteriorColors(
              AppStateHandler.getState().specifications.interior_color.map(
                (item: any) => ({
                  ...item,
                  text: item.int_color,
                }),
              ),
            );
            setInteriorColorVisible(true);
          }}
          errors={errors}
          control={control}
        />
        <Spacer />

        <Row style={{alignItems: 'center'}}>
          <View style={{flex: 1}}>
            <FormInput
              config={{
                name: 'vnNumber',
                textInputProps: {
                  label: 'V N Number',
                },
              }}
              rules={{
                required: {
                  value: true,
                  message: 'V N Number is required',
                },
              }}
              errors={errors}
              control={control}
            />
          </View>
          <SimpleLineIcons name={'camera'} size={scaler(20)} />
        </Row>
        <Spacer />

        <FormInput
          config={{
            name: 'description',
            textInputProps: {
              label: 'Description',
            },
          }}
          rules={{
            required: {
              value: true,
              message: 'Description is required',
            },
          }}
          errors={errors}
          control={control}
        />
        <Spacer />
        <View style={{margin: scaler(15)}}>
          <Col>
            <Typography
              fontSize={scaler(16)}
              type={'medium'}
              style={{
                borderBottomWidth: scaler(0.5),
                color: 'gray',
                marginBottom: scaler(15),
              }}>
              Photos
            </Typography>
            {imagesData && imagesData.length > 0 ? (
              <Image
                style={
                  imagesData.length != 0
                    ? {
                        height: scaler(66.25),
                        width: scaler(66.25),
                      }
                    : style.upload
                }
                source={
                  imagesData.length != 0
                    ? {uri: carImages.path}
                    : images.img_upload
                }
              />
            ) : (
              <Image
                source={images.img_upload}
                style={{height: scaler(66.25), width: scaler(66.25)}}
              />
            )}
          </Col>
        </View>
        <Spacer />
      </View>
      <AppButton
        children={'Add Photos'}
        onPress={() =>
          PopupStateHandler.openPopup('Select Profile Picture', '', [
            {
              title: 'Open Camera',
              onPress: () =>
                openCamera({
                  compressImageQuality: 0.1,
                  mediaType: 'photo',
                }),
            },
            {
              title: 'Open Gallery',
              onPress: () =>
                openGallery({
                  compressImageQuality: 0.1,
                  mediaType: 'photo',
                }),
            },
          ])
        }
      />
      <Spacer />
      <AppButton children={'Add'} onPress={submit} />

      <Popup />
    </Fragment>
  );
};

const style = StyleSheet.create({
  viewInput: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: scaler(30),
  },
  ratingView: {
    height: scaler(15),
    width: scaler(15),
    borderRadius: scaler(7.5),
    backgroundColor: '#94C356',
    marginRight: scaler(5),
  },
  viewBorder: {
    width: '100%',
    height: scaler(10),
    backgroundColor: '#F2F2F2',
  },
  circle: {
    height: scaler(120),
    width: scaler(120),
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: scaler(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  upload: {
    height: scaler(42),
    width: scaler(42),
  },
});

export default Brand;
