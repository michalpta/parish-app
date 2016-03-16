import Ember from 'ember';

export function numberToLocaleString(params/*, hash*/) {
  let value = Number(params[0]);
  return value.toLocaleString();
}

export default Ember.Helper.helper(numberToLocaleString);
