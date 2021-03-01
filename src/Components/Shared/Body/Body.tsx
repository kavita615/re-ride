import React, {useMemo} from 'react';
import {ScrollView, ScrollViewProps, StyleSheet} from 'react-native';

interface BodyProps extends ScrollViewProps {
  backgroundColor?: string;
  children?: any;
}

function Body(props: BodyProps) {
  const {style, backgroundColor} = props;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        containerStyle: {flexGrow: 1, backgroundColor},
      }),
    [backgroundColor],
  );

  return (
    <ScrollView
      contentContainerStyle={[styles.containerStyle, style]}
      keyboardShouldPersistTaps={'handled'}
      {...props}
    />
  );
}

export default Body;
