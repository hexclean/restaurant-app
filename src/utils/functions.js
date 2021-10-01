import 'intl';
import 'intl/locale-data/jsonp/en';

import {
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
  ALIAS_PATTERN,
  MOBILE_PATTERN,
} from '@constants/regexs';

let isCalled = false,
  timer;

export const callOnceInInterval = (functionTobeCalled, interval = 1500) => {
  if (!isCalled) {
    isCalled = true;
    clearTimeout(timer);
    timer = setTimeout(() => {
      isCalled = false;
    }, interval);
    return functionTobeCalled();
  }
};

export const navOptionHandler = () => ({
  headerShown: false,
  animationEnabled: true,
});

export const validateName = value => {
  if (value.length >= 3 && value.length <= 20) {
    return true;
  }
  return false;
};

export const validateEmail = value => {
  if (EMAIL_PATTERN.test(value)) {
    return true;
  }
  return false;
};

export const validateMobile = value => {
  if (MOBILE_PATTERN.test(value)) {
    return true;
  }
  return false;
};

export const validatePassword = value => {
  if (PASSWORD_PATTERN.test(value)) {
    return true;
  }
  return false;
};

export const validateAlias = value => {
  if (ALIAS_PATTERN.test(value)) {
    return true;
  }
  return false;
};

export const validateLength = (value, length) => {
  if (value.length >= length) {
    return true;
  }
  return false;
};
export const validateBetween = (value, min, max) => {
  if (value.length >= min && value.length <= max) {
    return true;
  }
  return false;
};

export const isEmpty = param => {
  return (
    param == undefined ||
    param == null ||
    (typeof param === 'string' && param == '') ||
    (typeof param === 'object' && param.length == 0) ||
    (typeof param === 'array' && param.length == 0)
  );
};
