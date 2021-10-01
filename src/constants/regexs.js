const NAME_PATTERN = /^(?=[a-zA-Z0-9~@#$^*()_+=[\]{}|\\,.?: -]*$)(?!.*[<>'"/;`%])/;
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const MOBILE_PATTERN = /^[+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/;
const ALIAS_PATTERN = /^[a-zA-Z0-9_]{3,}[a-zA-Z]+[0-9]*$/;
const PASSWORD_PATTERN = /^[a-zA-Z0-9!@#$%^&*()_+{}[:;"'|<>?,./]{6,30}$/;

export {
  NAME_PATTERN,
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
  ALIAS_PATTERN,
  MOBILE_PATTERN,
};
