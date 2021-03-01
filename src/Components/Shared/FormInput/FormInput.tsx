import React, {ComponentProps, Fragment} from 'react';
import {TextInput, HelperText} from 'react-native-paper';
import {
  Controller,
  Validate,
  ValidationRule,
  ValidationValueMessage,
} from 'react-hook-form';
import Toggle from '../Toggle/Toggle';
import InputComponent from 'src/Components/Custom/InputComponent/InputComponent';

export type FormConfigType = {
  name: string;
  textInputProps?: ComponentProps<typeof TextInput>;
  customProps?: any;
};

export type FormInputPropType = {
  config: FormConfigType;
  control: any;
  errors?: any;
  rules?:
    | Partial<{
        required: string | boolean | ValidationValueMessage<boolean>;
        min: ValidationRule<React.ReactText>;
        max: ValidationRule<React.ReactText>;
        maxLength: ValidationRule<React.ReactText>;
        minLength: ValidationRule<React.ReactText>;
        pattern: ValidationRule<RegExp>;
        validate: Validate | Record<string, Validate>;
      }>
    | undefined;
};

function FormInput({config, control, errors, rules}: FormInputPropType) {
  const {name, textInputProps, customProps} = config;

  return (
    <Fragment>
      <Controller
        render={({onChange, onBlur, value}) => {
          return (
            <InputComponent
              textInputProps={{
                ...textInputProps,
                onChangeText: onChange,
                onBlur,
                value,
              }}
              customProps={{...customProps, error: errors[name]}}
            />
          );
        }}
        rules={rules}
        control={control}
        name={name}
      />
      <Toggle visible={errors?.[name]}>
        <HelperText type={'error'}>{errors?.[name]?.message}</HelperText>
      </Toggle>
    </Fragment>
  );
}

export default FormInput;
