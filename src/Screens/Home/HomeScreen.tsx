import React from 'react';
import {FlatList} from 'react-native';
import {Avatar, Button, Divider, List} from 'react-native-paper';
import Container from 'src/Components/Shared/Container/Container';
import Padding from 'src/Components/Shared/Padding/Padding';
import Spacer from 'src/Components/Shared/Spacer/Spacer';
import useApiFetchInfinite from 'src/Hooks/Shared/useApiFetchInfinite';
import AppStateHandler from 'src/StateHandlers/AppStateHandler';

function HomeScreen() {
  const {data, status, error, fetchMore, refetch} = useApiFetchInfinite(
    ['/users?per_page=8&page='],
    {
      getFetchMore: (lastData) => {
        const nextPage = lastData.data.page + 1;
        const totalPages = lastData.data.total_pages;
        if (totalPages >= nextPage) {
          return nextPage;
        } else {
          return null;
        }
      },
    },
  );

  console.log(data);
  console.log(status);
  console.log(error);

  return (
    <Container>
      <Spacer />
      <Padding horizontal>
        <Spacer />
        <Button mode={'contained'} onPress={AppStateHandler.logout}>
          Logout
        </Button>
      </Padding>
      <Spacer />
      <FlatList
        data={(data || [])
          .map((_) => _.data.data)
          .reduce((a, b) => a.concat(b), [])}
        renderItem={({item}) => (
          <List.Item
            left={() => <Avatar.Image source={{uri: item.avatar}} />}
            title={item.first_name + ' ' + item.last_name}
            description={item.email}
          />
        )}
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={(item) => `${item.id}`}
        onEndReachedThreshold={0.01}
        onEndReached={() => {
          fetchMore();
        }}
        refreshing={status === 'loading'}
        onRefresh={refetch}
      />
    </Container>
  );
}

export default HomeScreen;
