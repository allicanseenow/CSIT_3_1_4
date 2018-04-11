import Validator      from 'validator';
import _              from 'lodash';
import moment         from 'moment';

export function validateFirstPageRegister(data) {
  let errors = {};

  console.log("validator is ", Validator);
  console.log('date is ', data);
  if (_.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (_.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (_.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (_.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }
  // if (Validator.isEmpty(data.timezone)) {
  //   errors.timezone = 'This field is required';
  // }

  console.log('erros is ', errors)
  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}

export function validateSecondPageRegister(data) {
  let errors = {};
  console.log('second page check')
  if (_.isEmpty(data.firstName)) {
    errors.firstName = 'This field is required';
  }
  if (_.isEmpty(data.lastName)) {
    errors.lastName = 'This field is required';
  }
  if (_.isEmpty(data.licenseNumber)) {
    errors.licenseNumber = 'This field is required';
  }
  if (_.isEmpty(data.dob)) {
    errors.dob = 'This field is required';
  }
  else if (!moment(data.dob, 'DD-MM-YYYY', true).isValid()){
    errors.dob = 'Wrong date format';
  }
  if (_.isEmpty(data.cardHolderName)) {
    errors.cardHolderName = 'This field is required';
  }
  if (_.isEmpty(data.cardNumber)) {
    errors.cardNumber = 'This field is required';
  }
  if (_.isEmpty(data.cardExpiryDate)) {
    errors.cardExpiryDate = 'This field is required';
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  }
}

export function validateRegister(data, page) {
  if (typeof page === 'number' && page >= 0) {
    switch (page) {
      case 0: {
        return validateFirstPageRegister(data);
      }
      case 1: {
        console.log('reach case 1')
        return validateSecondPageRegister(data);
      }
      case 2: {

      }
    }
  }
  console.log('here---------------------------')
  const first = validateFirstPageRegister(data);
  const second = validateSecondPageRegister(data);
  function customizer(des, src) {
    if (typeof des === 'boolean' && typeof src === 'boolean') {
      return des && src;
    }
  }
  return _.mergeWith(first, second, customizer);
}

export function validateLoginForm(data) {
  const { username, password } = data;
  if (password.trim().length < 8) return false;
  return true;
}