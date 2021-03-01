import React, {Fragment} from 'react';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper';
import FormInput from 'src/Components/Shared/FormInput/FormInput';
import Spacer from 'src/Components/Shared/Spacer/Spacer';
import Typography from 'src/Components/Shared/Typography/Typography';
import useAuth from 'src/Hooks/Custom/useAuth';

function LoginForm() {
  const {control, errors, handleSubmit} = useForm({
    defaultValues: {email: 'eve.holt@reqres.in', password: '12345678'},
    mode: 'onChange',
  });

  const {loading, login} = useAuth();

  const onSubmit = handleSubmit(login);

  return (
    <Fragment>
      <Spacer size={200} />

      <Typography textAlign={'center'} type={'regular'} fontSize={30}>
        Login
      </Typography>

      <Spacer />
      <FormInput
        config={{
          name: 'email',
          textInputProps: {
            label: 'Email',
          },
        }}
        rules={{
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
      <Button loading={loading} mode={'contained'} onPress={onSubmit}>
        Submit
      </Button>
      <Spacer />
    </Fragment>
  );
}

export default LoginForm;
