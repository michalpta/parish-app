import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr(),
  city: DS.attr(),
  street: DS.attr(),
  streetNumber: DS.attr(),
  // streetNumberSuffix: DS.attr(),
  offerings: DS.hasMany('offering'),

  address: Ember.computed('city', 'street', 'streetNumber', function() {
    return `${this.get('city')}, ${this.get('street')} ${this.get('streetNumber')}`;
  }),

  nameAndAddress: Ember.computed('name', 'address', function() {
    return `${this.get('name')} - ${this.get('address')}`;
  }),

  offeringsTotal: Ember.computed('offerings', 'offerings.@each', function() {
    let total = 0;
    this.get('offerings').forEach(function(offering) {
      total += offering.get('value');
    })
    return total;
  })
});
