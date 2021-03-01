import React, {useMemo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

export type CenterProps = {
  children?: React.ReactNode;
  allAxis?: boolean;
  vertical?: boolean;
  flex?: number;
  style?: ViewStyle;
};

function Center(props: CenterProps) {
  const {children, allAxis, vertical, flex, style} = props;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        containerStyle: {
          flex: flex ?? (allAxis ? 1 : 0),
        },
        horizontalStyle: {
          alignItems: 'center',
        },
        verticalStyle: {
          justifyContent: 'center',
        },
      }),
    [allAxis, flex],
  );

  return (
    <View
      style={
        allAxis
          ? [
              style,
              styles.containerStyle,
              styles.horizontalStyle,
              styles.verticalStyle,
            ]
          : [
              style,
              styles.containerStyle,
              vertical ? styles.verticalStyle : styles.horizontalStyle,
            ]
      }>
      {children}
    </View>
  );
}

export default Center;
