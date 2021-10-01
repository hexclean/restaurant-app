import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Header, Content} from 'native-base';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {Icon} from 'react-native-elements';
import {setLoading, deleteUser} from '@modules/reducers/auth/actions';
import {ProfileService} from '@modules/services';
import {common, colors} from '@constants/themes';
import i18n from '@utils/i18n';

export default Profile = props => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  const onLogout = () => {
    dispatch(
      deleteUser({
        token: null,
        email: user.email,
        name: user.name,
        city: {
          id: user.city.id,
          name: user.city.name,
          status: false,
        },
      }),
    );
    props.navigation.reset({index: 1, routes: [{name: 'Start'}]});
  };

  const goProfileEdit = () => {
    dispatch(setLoading(true));
    ProfileService.getProfileInformation(user.token)
      .then(response => {
        dispatch(setLoading(false));
        if (response.status == 200) {
          props.navigation.push('ProfileEdit', {userInfo: response.result});
        }
      })
      .catch(error => {
        dispatch(setLoading(false));
      });
  };

  return (
    <Container style={common.container}>
      <StatusBar />
      <Header style={common.header}>
        <View style={common.headerLeft}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon
              type="ionicon"
              name="ios-close"
              size={30}
              color={colors.YELLOW.PRIMARY}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={common.headerTitle}>
          <Text style={common.headerTitleText} numberOfLines={1}>
            {user.name}
          </Text>
        </TouchableOpacity>
        <View style={common.headerRight} />
      </Header>
      <Content contentContainerStyle={{padding: 20}}>
        <TouchableOpacity
          key="2"
          style={styles.item}
          onPress={() => goProfileEdit()}>
          <Text style={styles.itemText} numberOfLines={1}>
            {i18n.translate('Edit profile information')}
          </Text>
          <Icon
            type="material"
            name="keyboard-arrow-right"
            size={25}
            color="#666666"
          />
        </TouchableOpacity>
        <TouchableOpacity
          key="3"
          style={styles.item}
          onPress={() => props.navigation.push('ProfilePassword')}>
          <Text style={styles.itemText} numberOfLines={1}>
            {i18n.translate('Change password')}
          </Text>
          <Icon
            type="material"
            name="keyboard-arrow-right"
            size={25}
            color="#666666"
          />
        </TouchableOpacity>
        <TouchableOpacity
          key="6"
          style={styles.item}
          onPress={() => props.navigation.push('ReviewList')}>
          <Text style={styles.itemText} numberOfLines={1}>
            {i18n.translate('Restaurant reviews')}
          </Text>
          <Icon
            type="material"
            name="keyboard-arrow-right"
            size={25}
            color="#666666"
          />
        </TouchableOpacity>
        <TouchableOpacity
          key="7"
          style={styles.item}
          onPress={() => props.navigation.push('ProfileDelete')}>
          <Text style={styles.itemText} numberOfLines={1}>
            {i18n.translate('Delete profile')}
          </Text>
          <Icon
            type="material"
            name="keyboard-arrow-right"
            size={25}
            color="#666666"
          />
        </TouchableOpacity>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
  },
  itemText: {
    fontSize: 16,
    color: '#111111',
  },
  signout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 60,
  },
});
