import React, {Fragment} from 'react';
import {useForm} from 'react-hook-form';
import Container from 'src/Components/Shared/Container/Container';
import Body from 'src/Components/Shared/Body/Body';

import {View, StyleSheet} from 'react-native';
import FormInput from 'src/Components/Shared/FormInput/FormInput';
import Spacer from 'src/Components/Shared/Spacer/Spacer';
import useAuth from 'src/Hooks/Custom/useAuth';
import scaler from 'src/Utils/Shared/scaler';
import Header from 'src/Components/Header';
import ButtonComponent from 'src/Components/Custom/ButtonComponent';

function ForgotPassword() {
  const {control, errors, handleSubmit} = useForm({
    defaultValues: {email: ''},
    mode: 'onChange',
  });

  const {status, loading, forgotPassword} = useAuth();

  const onSubmit = handleSubmit(forgotPassword);

  return (
    <Container backgroundColor={'white'} fullScreen={true}>
      <Body>
        <View style={{marginTop: 50}}>
          <Header title={'Forgot Password'} leftImage={'arrow-left'} />
        </View>
        <Fragment>
          <View style={style.InputField}>
            <View style={{marginHorizontal: scaler(30)}}>
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
            </View>
            <Spacer size={scaler(30)} />
            <ButtonComponent
              children={
                loading
                  ? 'Sending...'
                  : status === 'success'
                  ? 'Email Sent'
                  : 'Send Reset Link'
              }
              onPress={onSubmit}
              loading={loading}
              Successtitle={'Email Sent Successfully'}
              ApiresStatus={status}
              Loadingtitle={'Sending'}
            />
          </View>
        </Fragment>
      </Body>
    </Container>
  );
}

const style = StyleSheet.create({
  InputField: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default ForgotPassword;
