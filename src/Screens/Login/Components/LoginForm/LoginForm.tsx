import React, {Fragment, useState} from 'react';
import {useForm} from 'react-hook-form';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-paper';
import FormInput from 'src/Components/Shared/FormInput/FormInput';
import Spacer from 'src/Components/Shared/Spacer/Spacer';
import Typography from 'src/Components/Shared/Typography/Typography';
import useAuth from 'src/Hooks/Custom/useAuth';
import scaler from 'src/Utils/Shared/scaler';
import {useNavigation} from '@react-navigation/native';
import Row from 'src/Components/Shared/Row/Row';

function LoginForm() {
  const {control, errors, handleSubmit} = useForm({
    defaultValues: {email: 'eve.holt@reqres.in', password: '12345678'},
    mode: 'onChange',
  });

  const {loading, login} = useAuth();
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();

  const onSubmit = handleSubmit(login);

  return (
    <Fragment>
      <Spacer size={200} />
      <Typography
        textAlign={'center'}
        type={'regular'}
        fontSize={30}
        style={{marginBottom: scaler(50)}}>
        Login
      </Typography>
      <Spacer />
      <View style={style.textInput}>
        <FormInput
          config={{
            name: 'email',
            textInputProps: {
              label: 'Email',
            },
          }}
          rules={{
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
            required: {
              value: true,
              message: 'Email is required',
            },
          }}
          errors={errors}
          control={control}
        />
        <Spacer />
        <FormInput
          config={{
            name: 'password',
            textInputProps: {
              label: 'Password',
              secureTextEntry: true,
            },
          }}
          rules={{
            required: {
              value: true,
              message: 'Password is required',
            },
          }}
          errors={errors}
          control={control}
        />
        <Spacer />
        <Row style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => setChecked(!checked)}>
            {checked ? (
              <Image source={require('src/Assets/Images/checked.png')} />
            ) : (
              <Image source={require('src/Assets/Images/uncheck.png')} />
            )}
          </TouchableOpacity>

          <Typography style={{flex: 1}} type={'medium'} fontSize={scaler(12)}>
            {' '}
            Remember Me
          </Typography>
          <Typography
            onPress={() => navigation.navigate('Forgot')}
            type={'medium'}
            textDecorationLine={'underline'}
            fontSize={scaler(12)}>
            Forgot Password
          </Typography>
        </Row>
        <Spacer />
        <Spacer />
        <Button
          loading={loading}
          mode={'contained'}
          onPress={onSubmit}
          style={{backgroundColor: 'black', marginTop: 200}}>
          Sign In
        </Button>
        <Row style={style.newUser}>
          <Typography>New User? </Typography>
          <Typography type={'regular'}>Create Account</Typography>
        </Row>
      </View>
      <Spacer />
    </Fragment>
  );
}
const style = StyleSheet.create({
  textInput: {
    alignContent: 'center',
    justifyContent: 'center',
    marginHorizontal: scaler(30),
  },
  newUser: {
    marginTop: scaler(20),
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default LoginForm;
