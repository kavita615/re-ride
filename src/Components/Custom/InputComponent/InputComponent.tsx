import React, {ComponentProps} from 'react';
import {TextInput, useTheme} from 'react-native-paper';

type PropType = {
  textInputProps?: ComponentProps<typeof TextInput>;
  customProps?: any;
};

function InputComponent({textInputProps, customProps}: PropType) {
  const theme = useTheme();
  return (
    <TextInput
      {...textInputProps}
      style={[textInputProps?.style, {backgroundColor: theme.colors.white}]}
      mode={'outlined'}
      error={customProps?.error}
    />
  );
}

export default InputComponent;
