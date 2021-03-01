import React, {useMemo} from 'react';
import {View, ViewStyle, StyleSheet} from 'react-native';

export type PaddingsProps = {
  children?: any;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  horizontal?: boolean;
  vertical?: boolean;
  size?: number;
  flex?: number;
  style?: ViewStyle;
};

function Padding(props: PaddingsProps) {
  const {
    children,
    left,
    right,
    top,
    bottom,
    horizontal,
    vertical,
    size = 15,
    style,
    flex,
  } = props;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        paddingHorizontalStyle: horizontal
          ? {
              paddingLeft: size,
              paddingRight: size,
            }
          : {},
        paddingVerticalStyle: vertical
          ? {
              paddingTop: size,
              paddingBottom: size,
            }
          : {},
        paddingRightStyle: right
          ? {
              paddingRight: size,
            }
          : {},
        paddingLeftStyle: left
          ? {
              paddingLeft: size,
            }
          : {},
        paddingTopStyle: top
          ? {
              paddingTop: size,
            }
          : {},
        paddingBottomStyle: bottom
          ? {
              paddingBottom: size,
            }
          : {},
        paddingContainerStyle: {
          flex: flex ?? 0,
          ...style,
        },
      }),
    [vertical, horizontal, size, right, left, top, bottom, flex, style],
  );

  return (
    <View
      style={[
        styles.paddingHorizontalStyle,
        styles.paddingVerticalStyle,
        styles.paddingLeftStyle,
        styles.paddingRightStyle,
        styles.paddingTopStyle,
        styles.paddingBottomStyle,
        styles.paddingContainerStyle,
      ]}>
      {children}
    </View>
  );
}

export default Padding;
