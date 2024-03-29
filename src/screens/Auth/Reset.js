import React, {useState, useEffect} from 'react';
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
import {setLoading, setUser, setLogged} from '@modules/reducers/auth/actions';
import {AuthService} from '@modules/services';
import {isEmpty, validatePassword} from '@utils/functions';
import {common, colors} from '@constants/themes';
import {ErrorIcon} from '@constants/svgs';
import i18n from '@utils/i18n';

import {TextField} from 'react-native-material-textfield';

export default SignIn = props => {
  const dispatch = useDispatch();
  const {user, country} = useSelector(state => state.auth);

  const [password, setPassword] = useState('');
  const [visitPassword, setVisitPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [visitConfirm, setVisitConfirm] = useState(false);
  const [errorConfirm, setErrorConfirm] = useState('');
  const [secureTextEntry1, setSecureTextEntry1] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setErrorMsg('');
    (visitPassword && isEmpty(password)) ||
    (visitPassword && !validatePassword(password))
      ? setErrorPassword(
          i18n.translate('The password must be at least 3 characters long'),
        )
      : setErrorPassword('');
    (visitConfirm && isEmpty(confirm)) ||
    (visitConfirm && !validatePassword(confirm))
      ? setErrorConfirm(
          i18n.translate('The password must be at least 3 characters long'),
        )
      : confirm.length >= 5 && password !== confirm
      ? setErrorConfirm(i18n.translate('The two passwords do not match'))
      : setErrorConfirm('');
  }, [password, visitPassword, confirm, visitConfirm]);

  const onReset = () => {
    dispatch(setLoading(true));
    AuthService.reset(
      props.route.params.email,
      password,
      props.route.params.code,
      country,
    )
      .then(response => {
        dispatch(setLoading(false));
        if (response.status == 200) {
          var userCity = user.city;

          dispatch(setLogged());
          dispatch(
            setUser({
              token: response.result[0].token,
              email: props.route.params.email,
              name: user.name,
              city: {
                id: userCity.id,
                name: userCity.name,
                status: false,
              },
            }),
          );
          props.navigation.navigate('App');
        } else {
          setErrorMsg(response.msg);
        }
      })
      .catch(error => {
        dispatch(setLoading(false));
        setErrorMsg(error.message);
      });
  };

  return (
    <Container style={common.container}>
      <StatusBar />
      <Header style={common.header}>
        <View style={common.headerLeft} />
        <View style={common.headerTitle}>
          <Text style={common.headerTitleText}>
            {i18n.translate('Set a new password')}
          </Text>
        </View>
        <View style={common.headerRight} />
      </Header>
      <Content style={styles.content}>
        <Text style={styles.descriptionText}>
          {i18n.translate('Enter your new password so you can use the app')}
        </Text>
        {!isEmpty(errorMsg) && (
          <View style={common.errorContainer}>
            <ErrorIcon />
            <Text style={common.iconText}>{errorMsg}</Text>
            <View style={common.width30} />
          </View>
        )}
        <View style={styles.inputView}>
          <Text
            style={[
              styles.labelText,
              !isEmpty(errorPassword)
                ? common.fontColorRed
                : common.fontColorBlack,
            ]}>
            {i18n.translate('Password')}
          </Text>
          <Text style={styles.characterText}>
            {i18n.translate('6+ characters')}
          </Text>
          <TextField
            autoCapitalize="none"
            returnKeyType="next"
            fontSize={16}
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            value={password}
            secureTextEntry={secureTextEntry1}
            containerStyle={[
              styles.textContainer,
              !isEmpty(errorPassword)
                ? common.borderColorRed
                : common.borderColorGrey,
            ]}
            inputContainerStyle={styles.inputContainer}
            lineWidth={0}
            activeLineWidth={0}
            renderRightAccessory={() => {
              let name = secureTextEntry1 ? 'eye' : 'eye-off';
              return (
                <Icon
                  name={name}
                  type="feather"
                  size={24}
                  color={TextField.defaultProps.baseColor}
                  onPress={() => setSecureTextEntry1(!secureTextEntry1)}
                />
              );
            }}
            onChangeText={value => {
              setPassword(value);
              setVisitPassword(true);
            }}
          />
          <Text style={common.errorText}>{errorPassword}</Text>
        </View>
        <View style={[styles.inputView, common.marginTop15]}>
          <Text
            style={[
              styles.labelText,
              !isEmpty(errorConfirm)
                ? common.fontColorRed
                : common.fontColorBlack,
            ]}>
            {i18n.translate('New password again')}
          </Text>
          <Text style={styles.characterText}>
            {i18n.translate('6+ characters')}
          </Text>
          <TextField
            autoCapitalize="none"
            returnKeyType="done"
            fontSize={16}
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            value={confirm}
            secureTextEntry={secureTextEntry2}
            containerStyle={[
              styles.textContainer,
              !isEmpty(errorConfirm)
                ? common.borderColorRed
                : common.borderColorGrey,
            ]}
            inputContainerStyle={styles.inputContainer}
            lineWidth={0}
            activeLineWidth={0}
            renderRightAccessory={() => {
              let name = secureTextEntry2 ? 'eye' : 'eye-off';
              return (
                <Icon
                  name={name}
                  type="feather"
                  size={24}
                  color={TextField.defaultProps.baseColor}
                  onPress={() => setSecureTextEntry2(!secureTextEntry2)}
                />
              );
            }}
            onChangeText={value => {
              setConfirm(value);
              setVisitConfirm(true);
            }}
          />
          <Text style={common.errorText}>{errorConfirm}</Text>
        </View>
        <View style={[styles.buttonView, common.marginTop35]}>
          <TouchableOpacity
            disabled={
              isEmpty(password) ||
              isEmpty(confirm) ||
              errorPassword ||
              errorConfirm
                ? true
                : false
            }
            style={[
              common.button,
              isEmpty(password) ||
              isEmpty(confirm) ||
              errorPassword ||
              errorConfirm
                ? common.backColorGrey
                : common.backColorYellow,
            ]}
            onPress={() => onReset()}>
            <Text style={[common.buttonText, common.fontColorWhite]}>
              {i18n.translate('Save')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={common.height50} />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  descriptionText: {
    width: '80%',
    fontSize: 16,
    fontWeight: '400',
    color: '#666',
    lineHeight: 24,
  },
  inputView: {
    marginTop: 20,
    width: '100%',
  },
  labelView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  characterText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '400',
    color: '#666',
  },
  textContainer: {
    width: '100%',
    marginTop: 10,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 15,
    paddingRight: 20,
  },
  inputContainer: {
    marginTop: -20,
    borderWidth: 0,
  },
  buttonView: {
    width: '100%',
    alignItems: 'center',
  },
});
