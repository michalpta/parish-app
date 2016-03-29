import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  city: DS.attr('string'),
  street: DS.attr('string'),
  streetNumber: DS.attr('number'),
  streetNumberSuffix: DS.attr('string'),
  notes: DS.attr('string'),
  offerings: DS.hasMany('offering', { async: true }),

  address: Ember.computed('city', 'street', 'streetNumber', function() {
    return `${this.get('city')}, ${this.get('street')} ${this.get('streetNumber')} ${this.get('streetNumberSuffix')}`;
  }),

  nameAndAddress: Ember.computed('name', 'address', function() {
    return `${this.get('name')} - ${this.get('address')}`;
  }),

  offeringsTotal: Ember.computed('offerings', 'offerings.@each', function() {
    let total = 0;
    this.get('offerings').forEach(function(offering) {
      total += Number(offering.get('value'));
    });
    return total;
  })
});
