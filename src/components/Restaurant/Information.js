import React, {useEffect} from 'react';

import {StyleSheet, LogBox, View, Text} from 'react-native';

import Card from '../Athena/Card';
import {isEmpty} from '@utils/functions';
import i18n from '@utils/i18n';

export default Information = props => {
  useEffect(
    () => LogBox.ignoreLogs(['VirtualizedLists should never be nested']),
    [],
  );

  return (
    <View style={styles.container}>
      <Card key="INFORMATION" style={styles.card}>
        <Text style={styles.cardTitle}>
          {i18n.translate('INFORMATION & PROMOTIONS')}
        </Text>
      </Card>
      <Card key="Average" style={styles.card}>
        <Text style={[styles.cardTitle, {fontSize: 16}]}>
          {i18n.translate('Average delivery time')}
        </Text>
        <Text style={[styles.cardText, {fontSize: 16}]}>
          {i18n.translate('Aproximativ')}{' '}
          {isEmpty(props.information.restaurant_avgTransport)
            ? 0
            : props.information.restaurant_avgTransport}{' '}
          {i18n.translate('minute')}
        </Text>
      </Card>
      <Card key="delivery_price_city" style={styles.card}>
        <Text style={[styles.cardTitle, {fontSize: 16}]}>
          {i18n.translate('Delivery Price City')}
        </Text>
        <Text style={[styles.cardText, {fontSize: 16}]}>
          {isEmpty(props.information.delivery_price_city)
            ? 0
            : props.information.delivery_price_city}{' '}
          {i18n.translate('lei')}
        </Text>
      </Card>
      <Card key="delivery_price_village" style={styles.card}>
        <Text style={[styles.cardTitle, {fontSize: 16}]}>
          {i18n.translate('Delivery Price Village')}
        </Text>
        <Text style={[styles.cardText, {fontSize: 16}]}>
          {isEmpty(props.information.delivery_price_village)
            ? 0
            : props.information.delivery_price_village}{' '}
          {i18n.translate('lei')}
        </Text>
      </Card>
      <Card key="Discount" style={styles.card}>
        <Text style={[styles.cardTitle, {fontSize: 16}]}>
          {i18n.translate('Discount')}
        </Text>
        <Text style={[styles.cardText, {fontSize: 16}]}>
          {isEmpty(props.information.restaurant_discount)
            ? 0
            : props.information.restaurant_discount}
          %
        </Text>
      </Card>
      <Card key="Aproximativ" style={styles.card}>
        <Text style={[styles.cardTitle, {fontSize: 16}]}>
          {i18n.translate('Address & Contact')}
        </Text>
        <Text style={[styles.cardText, {fontSize: 14}]} numberOfLines={1}>
          {isEmpty(props.information.restaurant_address)
            ? ''
            : props.information.restaurant_address}
        </Text>
        <Text style={[styles.cardText, {marginTop: 10, fontSize: 14}]}>
          {isEmpty(props.information.restaurant_phoneNumber)
            ? ''
            : props.information.restaurant_phoneNumber}
        </Text>
      </Card>

      {!isEmpty(props.information.result) && (
        <Card key="OpenHours" style={styles.card}>
          <Text style={[styles.cardTitle, {fontSize: 16}]}>
            {i18n.translate('Opening Hours')}
          </Text>
          <View style={styles.open}>
            {props.information.result.map((open, key) => (
              <View
                key={`open${key}`}
                style={[
                  styles.item,
                  key == props.information.result.length - 1
                    ? null
                    : {borderBottomWidth: 1},
                ]}>
                <Text style={{fontWeight: 'bold'}}>{open.day}</Text>
                <Text>
                  {open.open} - {open.close}
                </Text>
              </View>
            ))}
          </View>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    width: '100%',
    marginBottom: 15,
  },
  cardTitle: {
    marginVertical: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    width: '100%',
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    width: '100%',
  },
  open: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    borderColor: '#C4C4C4',
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
