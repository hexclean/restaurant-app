import React from 'react';
import {Container, Header} from 'native-base';
import {StatusBar, StyleSheet, View, Text} from 'react-native';

import {common} from '@constants/themes';
import {InternetIcon} from '@constants/svgs';
import i18n from '@utils/i18n';

export default Internet = props => {
  return (
    <Container style={common.container}>
      <StatusBar />
      <Header style={common.header}>
        <View style={common.headerLeft} />
        <View style={common.headerTitle}>
          <Text style={common.headerTitleText}>
            {i18n.translate('No internet')}
          </Text>
        </View>
        <View style={common.headerRight} />
      </Header>
      <View style={styles.content}>
        <InternetIcon />
        <Text style={styles.mainText}>
          {i18n.translate('No internet connection')}
        </Text>
        <Text style={styles.subText}>
          {i18n.translate('Please connect to the internet and refresh')}
        </Text>
        <View style={common.height50} />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
  },
  subText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  button: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 6,
    backgroundColor: '#FEEBD6',
  },
});
