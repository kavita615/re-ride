import * as React from 'react';
import {Appbar} from 'react-native-paper';

const Headers = () => {
  const _handleSearch = () => console.log('Searching');

  return (
    <Appbar.Header>
      <Appbar.Content title="Title" subtitle="Subtitle" />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
    </Appbar.Header>
  );
};

export default Headers;
