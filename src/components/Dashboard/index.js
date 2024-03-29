import React from 'react';

import {Body} from 'native-base';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import Result from './Result';
import {isEmpty} from '@utils/functions';
import {common, colors} from '@constants/themes';
import {images} from '@constants/assets';
import {SearchIcon} from '@constants/svgs';
import i18n from '@utils/i18n';

import {TextField} from 'react-native-material-textfield';
import Grid from 'react-native-infinite-scroll-grid';
import {RES_URL} from '@constants/configs';
import FastImage from 'react-native-fast-image';

export default Dashboard = props => {
  return (
    <Grid
      data={[1]}
      renderItem={item => (
        <View style={common.container}>
          {isEmpty(props.promotionHeader) ? (
            <View style={styles.topView}>
              <Image source={images.pizzaImage} />
              <View style={styles.topRight}>
                <Text style={styles.topTitle}>
                  {i18n.translate('Extra discounts')}
                </Text>
                <View style={styles.topSpace} />
                <View style={common.flexRow}>
                  <TouchableOpacity style={styles.topButton}>
                    <Text style={styles.topText}>
                      {i18n.translate('Know more')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.topPromotionHeaderView}
              activeOpacity={props.promotionHeader[0].type == 1 ? 1 : 0}
              onPress={() => {
                if (props.promotionHeader[0].type == 2) {
                  props.onDetail(props.promotionHeader[0]);
                }
              }}>
              <FastImage
                style={styles.image}
                source={{
                  uri:
                    RES_URL +
                    (props.promotionHeader[0].type == 1
                      ? props.promotionHeader[0].profileImage
                      : props.promotionHeader[0].restaurant_coverImage),
                }}
              />
            </TouchableOpacity>
          )}

          <Body style={styles.content}>
            {!isEmpty(props.dailyMenu) && (
              <DailyMenu
                key="dailyMenu"
                data={props.dailyMenu}
                onExtra={item => props.onExtra(item)}
                onModal={restaurant_name => props.onModal(restaurant_name)}
              />
            )}
            <View key="search" style={styles.inputView}>
              <TextField
                placeholder={i18n.translate('What do you eat')}
                placeholderTextColor="#666"
                autoCapitalize="none"
                returnKeyType="done"
                fontSize={16}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                value={props.search}
                containerStyle={styles.textContainer}
                inputContainerStyle={styles.inputContainer}
                lineWidth={0}
                activeLineWidth={0}
                renderLeftAccessory={() => {
                  return <SearchIcon style={{marginRight: 10}} />;
                }}
                onChangeText={value => props.onSearch(value)}
              />
            </View>
            {!isEmpty(props.featured) && (
              <Featured
                key="featured"
                data={props.featured}
                onDetail={item => props.onDetail(item)}
                count={isEmpty(props.result) ? 0 : props.result.length}
                shown={
                  props.search == '' &&
                  props.filters.freeDelivery == 0 &&
                  props.filters.newest == 0 &&
                  props.filters.pizza == 0 &&
                  props.filters.hamburger == 0 &&
                  props.filters.dailyMenu == 0 &&
                  props.filters.soup == 0 &&
                  props.filters.salad == 0 &&
                  props.filters.money == 0 &&
                  props.filters.card == 0 &&
                  props.filters.withinOneHour == 0
                    ? false
                    : true
                }
              />
            )}

            {!isEmpty(props.result) && (
              <Result
                key="result"
                data={props.result}
                onDetail={item => props.onDetail(item)}
              />
            )}
            <View style={common.height50} />
          </Body>
        </View>
      )}
      refreshing={props.refresh}
      onRefresh={() => props.onRefresh()}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: wp('100%'),
    paddingVertical: 10,
    backgroundColor: '#FEEBD6',
  },
  topPromotionHeaderView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: wp('100%'),
    backgroundColor: '#FEEBD6',
  },
  image: {
    width: wp('100%'),
    height: 200,
    resizeMode: 'cover',
  },
  topRight: {
    marginLeft: 22,
    justifyContent: 'center',
  },
  topTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 30,
    color: colors.YELLOW.PRIMARY,
  },
  topSpace: {
    height: 16,
  },
  topButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.YELLOW.PRIMARY,
    borderRadius: 6,
  },
  topText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  inputView: {
    width: '100%',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderColor: colors.GREY.PRIMARY,
  },
  inputContainer: {
    width: '100%',
    marginTop: -20,
    borderWidth: 0,
  },
});
