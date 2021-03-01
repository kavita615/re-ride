import React, {useLayoutEffect, useMemo} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
} from 'react-native';
import {Surface, useTheme} from 'react-native-paper';

export type ContainerProps = {
  children?: React.ReactNode;
  backgroundColor?: string;
  statusBarBackgroundColor?: string;
  statusBarStyle?: StatusBarStyle;
  fullScreen?: boolean;
};

function Container(props: ContainerProps) {
  const {
    children,
    backgroundColor,
    fullScreen,
    statusBarBackgroundColor,
    statusBarStyle,
  } = props;
  const theme = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        statusBarStyle: {
          flex: 0,
          backgroundColor: fullScreen ? 'transparent' : theme.colors.primary,
        },
        containerStyle: {
          flex: 1,
          backgroundColor: backgroundColor ?? theme.colors.background,
        },
      }),
    [
      backgroundColor,
      fullScreen,
      theme.colors.background,
      theme.colors.primary,
    ],
  );

  useLayoutEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(fullScreen ?? false);
      StatusBar.setBackgroundColor(
        fullScreen
          ? 'transparent'
          : statusBarBackgroundColor ?? theme.colors.primary,
      );
    }
    StatusBar.setBarStyle(
      statusBarStyle ?? fullScreen ? 'dark-content' : 'light-content',
    );
  }, [
    fullScreen,
    statusBarBackgroundColor,
    statusBarStyle,
    theme.colors.primary,
  ]);

  return (
    <Surface style={styles.containerStyle}>
      <SafeAreaView style={styles.statusBarStyle} />
      <SafeAreaView style={styles.containerStyle}>{children}</SafeAreaView>
    </Surface>
  );
}

export default Container;
