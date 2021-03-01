import React, {useMemo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

export type RowProps = {
  flex?: number;
  wrap?: boolean;
  style?: ViewStyle;
  children?: any;
};

function Row(props: RowProps) {
  const {style, children, wrap, flex} = props;
  const styles = useMemo(
    () =>
      StyleSheet.create({
        rowStyle: {
          flex: flex ?? 0,
          flexDirection: 'row',
          flexWrap: wrap ? 'wrap' : 'nowrap',
        },
      }),
    [flex, wrap],
  );

  return <View style={[styles.rowStyle, style]}>{children}</View>;
}

export default Row;
