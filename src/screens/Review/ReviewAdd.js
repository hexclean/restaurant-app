import React, {useState, useEffect, Fragment} from 'react';
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
import {setLoading} from '@modules/reducers/auth/actions';
import {setReviewStatus} from '@modules/reducers/profile/actions';
import {ProfileService} from '@modules/services';
import {Card} from '@components';
import {isEmpty, validateBetween} from '@utils/functions';
import {common, colors} from '@constants/themes';
import {StarYellowIcon, StarGreyIcon} from '@constants/svgs';
import i18n from '@utils/i18n';

import {TextField} from 'react-native-material-textfield';

export default ReviewAdd = props => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const {reviewStatus} = useSelector(state => state.profile);

  const [type] = useState(props.route.params.type);
  const [review] = useState(props.route.params.review);
  const [reviewCode] = useState(props.route.params.reviewCode);
  const [ratingStar, setRatingStar] = useState(
    isEmpty(props.route.params.review.review_rating)
      ? 0
      : props.route.params.review.review_rating,
  );
  const [reviewText, setReviewText] = useState(
    isEmpty(props.route.params.review.review_message)
      ? ''
      : props.route.params.review.review_message,
  );
  const [visitReviewText, setVisitReviewText] = useState(false);
  const [errorReviewText, setErrorReviewText] = useState('');

  useEffect(() => {
    (visitReviewText && isEmpty(reviewText)) ||
    (visitReviewText && !validateBetween(reviewText, 1, 300))
      ? setErrorReviewText(
          i18n.translate('The text must be less more than 300 characters'),
        )
      : setErrorReviewText('');
  }, [reviewText, visitReviewText]);

  const onSave = () => {
    dispatch(setLoading(true));
    ProfileService.setReview(user.token, reviewCode, ratingStar, reviewText)
      .then(response => {
        dispatch(setLoading(false));
        if (response.status == 201 || response.status == 200) {
          dispatch(setReviewStatus(!reviewStatus));
          props.navigation.push('Success', {type: 1});
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
              type="material"
              name="arrow-back"
              size={30}
              color={colors.YELLOW.PRIMARY}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={common.headerTitle}>
          <Text style={common.headerTitleText} numberOfLines={1}>
            {i18n.translate('Edit-create review')}
          </Text>
        </TouchableOpacity>
        <View style={common.headerRight} />
      </Header>
      <Content style={{flex: 1, padding: 20}}>
        <Text style={styles.descriptionText}>
          {i18n.translate(
            'Opinions require approval which may take 3-5 business days Thank you in advance for your patience',
          )}
        </Text>
        <Text style={styles.kitText}>{i18n.translate('Kit')}</Text>
        <Text style={styles.reviewText}>{review.restaurant_name}</Text>

        <Card key="stars" style={styles.card}>
          <Text style={styles.starTitle}>{i18n.translate('Evaluation')}</Text>
          <View style={styles.starView}>
            <TouchableOpacity
              key="rating1"
              style={[
                styles.starItem,
                ratingStar === 1
                  ? common.borderColorYellow
                  : common.borderColorGrey,
              ]}
              onPress={() => setRatingStar(1)}
              disabled={type == 1 ? false : true}>
              {ratingStar === 1 ? <StarYellowIcon /> : <StarGreyIcon />}
              <Text
                style={[
                  styles.ratingTitle,
                  ratingStar === 1
                    ? common.fontWeightBold
                    : common.fontWeightNormal,
                ]}>
                1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              key="rating2"
              style={[
                styles.starItem,
                ratingStar === 2
                  ? common.borderColorYellow
                  : common.borderColorGrey,
              ]}
              onPress={() => setRatingStar(2)}
              disabled={type == 1 ? false : true}>
              {ratingStar === 2 ? <StarYellowIcon /> : <StarGreyIcon />}
              <Text
                style={[
                  styles.ratingTitle,
                  ratingStar === 2
                    ? common.fontWeightBold
                    : common.fontWeightNormal,
                ]}>
                2
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              key="rating3"
              style={[
                styles.starItem,
                ratingStar === 3
                  ? common.borderColorYellow
                  : common.borderColorGrey,
              ]}
              onPress={() => setRatingStar(3)}
              disabled={type == 1 ? false : true}>
              {ratingStar === 3 ? <StarYellowIcon /> : <StarGreyIcon />}
              <Text
                style={[
                  styles.ratingTitle,
                  ratingStar === 3
                    ? common.fontWeightBold
                    : common.fontWeightNormal,
                ]}>
                3
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              key="rating4"
              style={[
                styles.starItem,
                ratingStar === 4
                  ? common.borderColorYellow
                  : common.borderColorGrey,
              ]}
              onPress={() => setRatingStar(4)}
              disabled={type == 1 ? false : true}>
              {ratingStar === 4 ? <StarYellowIcon /> : <StarGreyIcon />}
              <Text
                style={[
                  styles.ratingTitle,
                  ratingStar === 4
                    ? common.fontWeightBold
                    : common.fontWeightNormal,
                ]}>
                4
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              key="rating5"
              style={[
                styles.starItem,
                ratingStar === 5
                  ? common.borderColorYellow
                  : common.borderColorGrey,
              ]}
              onPress={() => setRatingStar(5)}
              disabled={type == 1 ? false : true}>
              {ratingStar === 5 ? <StarYellowIcon /> : <StarGreyIcon />}
              <Text
                style={[
                  styles.ratingTitle,
                  ratingStar === 5
                    ? common.fontWeightBold
                    : common.fontWeightNormal,
                ]}>
                5
              </Text>
            </TouchableOpacity>
          </View>
        </Card>

        <Card key="review" style={styles.card}>
          <Text
            style={[
              styles.starTitle,
              !isEmpty(errorReviewText)
                ? common.fontColorRed
                : common.fontColorBlack,
            ]}>
            {i18n.translate('Evaluation')}
          </Text>
          <TextField
            keyboardType="default"
            returnKeyType="next"
            fontSize={16}
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            value={reviewText}
            multiline={true}
            height={85}
            disabled={type == 1 ? false : true}
            containerStyle={[
              styles.textContainer,
              !isEmpty(errorReviewText)
                ? common.borderColorRed
                : common.borderColorGrey,
            ]}
            inputContainerStyle={styles.inputContainer}
            lineWidth={0}
            activeLineWidth={0}
            onChangeText={value => {
              setReviewText(value);
              setVisitReviewText(true);
            }}
          />
          <Text style={common.errorText}>{errorReviewText}</Text>
        </Card>

        {type === 1 && (
          <Fragment>
            <View style={[styles.buttonView, common.marginTop35]}>
              <TouchableOpacity
                disabled={
                  ratingStar === 0 ||
                  isEmpty(reviewText) ||
                  !validateBetween(reviewText, 1, 300)
                    ? true
                    : false
                }
                style={[
                  common.button,
                  ratingStar === 0 ||
                  isEmpty(reviewText) ||
                  !validateBetween(reviewText, 1, 300)
                    ? common.backColorGrey
                    : common.backColorYellow,
                ]}
                onPress={() => onSave()}>
                <Text style={[common.buttonText, common.fontColorWhite]}>
                  {i18n.translate('Sending')}
                </Text>
              </TouchableOpacity>
            </View>
          </Fragment>
        )}
        <View style={common.height50} />
      </Content>
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
  kitText: {
    marginTop: 24,
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  reviewText: {
    marginTop: 6,
    width: '100%',
    fontSize: 16,
    color: '#111',
  },
  card: {
    width: '100%',
    marginTop: 20,
  },
  starTitle: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
  starView: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  starItem: {
    marginRight: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: '#C4C4C4',
  },
  ratingTitle: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
  textContainer: {
    width: '100%',
    marginTop: 10,
    height: 120,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    paddingRight: 20,
  },
  inputContainer: {
    marginTop: -20,
    borderWidth: 0,
    overflow: 'scroll',
  },
  rememberMe: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 10,
    width: '100%',
  },
  rememberText: {
    marginLeft: 10,
    fontSize: 16,
    paddingRight: 30,
  },
  buttonView: {
    width: '100%',
    alignItems: 'center',
  },
});
