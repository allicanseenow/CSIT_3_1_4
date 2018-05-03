import Validator      from 'validator';
import _              from 'lodash';
import moment         from 'moment';

export function validateFirstPageRegister(data) {
  let errors = {};

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
  else if (data.password.length < 8) {
    errors.password = 'Password needs to have at least 8 characters';
  }
  else if (!/\d/.test(data.password)) {
    errors.password = 'Password needs to contain at least 1 digit.';
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

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
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
  if (_.isEmpty(data.cardCvv)) {
    errors.cardCvv = 'This field is required';
  }

  return {
    errors,
    isValid: _.isEmpty(errors)
  };
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

export function validateCreateListing(data) {
  let errors = {};
  _.forEach(data, (value, key) => {
    if (_.isEmpty(value)) errors[key] = 'This field is required';
  });
  return {
    errors,
    isValid: _.isEmpty(errors),
  };
}

//inside profile
export function validateChangePassword(data){
  let errors = {};
  if (_.isEmpty(data.oldPassword)) {
    errors.firstName = 'This field is required';
  }
  if (_.isEmpty(data.newPassword)) {
    errors.lastName = 'This field is required';
  }
  if (_.isEmpty(data.passwordConfirmation)) {
    errors.licenseNumber = 'This field is required';
  }
  if (!Validator.equals(data.newPassword, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }
  return {
    errors,
    isValid: _.isEmpty(errors)
  };
}

//inside Profile
export function validateChangePaymentDetail(data){
  let errors = {};
  if (_.isEmpty(data.cardHolderName)) {
    errors.cardHolderName = 'This field is required';
  }
  if (_.isEmpty(data.cardNumber)) {
    errors.cardNumber = 'This field is required';
  }
  if (_.isEmpty(data.cardExpiryDate)) {
    errors.cardExpiryDate = 'This field is required';
  }
  if (_.isEmpty(data.cardCvv)) {
    errors.cardCvv = 'This field is required';
  }
  return {
    errors,
    isValid: _.isEmpty(errors)
  };
}

export function validateChangeBillingDetail(data){
  let errors={};
  if (_.isEmpty(data.bsb)) {
    errors.bsb = 'This field is required';
  }
  if (_.isEmpty(data.accountNumber)) {
    errors.accountNumber = 'This field is required';
  }
  if (_.isEmpty(data.accountName)) {
    errors.accountName = 'This field is required';
  }
  alert("val error", errors)
  return {
    errors,
    isValid: _.isEmpty(errors)
  };
}
