import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Header} from 'native-base';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {Icon} from 'react-native-elements';
import {setLoading} from '@modules/reducers/auth/actions';
import {FoodService} from '@modules/services';
import {isEmpty} from '@utils/functions';
import {common, colors} from '@constants/themes';
import i18n from '@utils/i18n';

export default Order = props => {
  const dispatch = useDispatch();
  const {country, user} = useSelector(state => state.auth);

  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    dispatch(setLoading(true));
    FoodService.getOrders(user.token)
      .then(response => {
        dispatch(setLoading(false));
        if (response.status == 200) {
          setOrderList(response.result);
        }
      })
      .catch(error => {
        dispatch(setLoading(false));
      });
  }, []);

  const goOrder = orderId => {
    dispatch(setLoading(true));
    FoodService.getOrder(user.token, country, orderId)
      .then(response => {
        dispatch(setLoading(false));
        if (response.status == 200) {
          props.navigation.push('OrderDetail', {order: response});
        }
      })
      .catch(error => {
        dispatch(setLoading(false));
      });
  };

  const renderItem = (order, index) => {
    return (
      <View key={index} style={styles.review}>
        <View style={styles.status}>
          <Text style={styles.statusText}>{i18n.translate('Where')}</Text>
        </View>
        <View style={styles.reviewMain}>
          <Text style={styles.reviewText} numberOfLines={1}>
            {order.item.restaurant_name}
          </Text>
        </View>
        <View style={styles.status}>
          <Text style={[styles.statusText, {width: '40%'}]}>
            {i18n.translate('Kit')}
          </Text>
          <Text style={styles.statusText}>{i18n.translate('Operations')}</Text>
        </View>
        <View style={styles.reviewMain}>
          <Text style={[styles.reviewText, {width: '40%'}]} numberOfLines={1}>
            {order.item.total} {i18n.translate('lei')}
          </Text>
          <TouchableOpacity onPress={() => goOrder(order.item.order_id)}>
            <Text style={styles.reviewAdd}>{i18n.translate('View')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.status}>
          <Text style={styles.statusText}>{i18n.translate('When')}</Text>
        </View>
        <View style={styles.reviewMain}>
          <Text style={styles.reviewText} numberOfLines={1}>
            {!isEmpty(order.item.time) && order.item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Container style={common.container}>
      <StatusBar />
      <Header style={common.header}>
        <View style={common.headerLeft}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon
              type="material"
              name="arrow-back"
              size={30}
              color={colors.YELLOW.PRIMARY}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={common.headerTitle}>
          <Text style={common.headerTitleText} numberOfLines={1}>
            {i18n.translate('My orders')}
          </Text>
        </TouchableOpacity>
        <View style={common.headerRight} />
      </Header>
      <View style={{flex: 1, padding: 20}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={orderList}
          keyExtractor={(result, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  descriptionText: {
    width: '100%',
    fontSize: 16,
    fontWeight: '400',
    color: '#666',
    lineHeight: 24,
    marginBottom: 10,
  },
  review: {
    width: '100%',
    marginTop: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999999',
  },
  reviewMain: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 30,
    marginBottom: 5,
  },
  reviewText: {
    width: '70%',
    fontSize: 16,
    lineHeight: 24,
    color: '#111',
  },
  reviewOption: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 100,
  },
  reviewAdd: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.YELLOW.PRIMARY,
  },
});
