import React, {useMemo} from 'react';
import {StyleSheet, TextProps} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

export interface TypographyProps extends TextProps {
  children?: any;
  textAlign?: 'left' | 'center' | 'right';
  fontSize?: number;
  variant?:
    | 'primary'
    | 'background'
    | 'surface'
    | 'accent'
    | 'error'
    | 'text'
    | 'onSurface'
    | 'onBackground'
    | 'disabled'
    | 'placeholder'
    | 'backdrop'
    | 'notification'
    | 'white'
    | 'black'
    | 'success';
  color?: string;
  type?: 'light' | 'medium' | 'regular' | 'thin';
  textTransform?: 'capitalize' | 'none' | 'uppercase' | 'lowercase';
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through'
    | undefined;
}

function Typography(props: TypographyProps) {
  const {
    textAlign,
    style,
    fontSize,
    color,
    type,
    variant,
    textTransform,
    textDecorationLine,
  } = props;
  const theme = useTheme();
  const {fontFamily, fontWeight} = theme.fonts[type ?? 'light'];

  const styles = useMemo(
    () =>
      StyleSheet.create({
        typographyStyle: {
          textAlign,
          fontSize,
          color: color
            ? color
            : variant
            ? theme.colors[variant]
            : theme.colors.text,
          fontFamily,
          fontWeight,
          textTransform,
          textDecorationLine,
          textDecorationColor: color
            ? color
            : variant
            ? theme.colors[variant]
            : theme.colors.text,
        },
      }),
    [
      color,
      fontFamily,
      fontSize,
      fontWeight,
      textAlign,
      textTransform,
      theme.colors,
      variant,
      textDecorationLine,
    ],
  );

  return <Text {...props} style={[styles.typographyStyle, style]} />;
}

export default Typography;
