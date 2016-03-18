import Ember from 'ember';

export default Ember.Component.extend({
  sortParams: ['date:desc'],
  sortedModel: Ember.computed.sort('model', 'sortParams'),
  searchableOfferings: Ember.computed('sortedModel', 'quickSearch', function() {
    let offerings = this.get('sortedModel');
    let filter = this.get('quickSearch');
    if (filter) {
      offerings = offerings.filter(function(offering) {
        return offering.get('parishioner.name').toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
          offering.get('parishioner.address').toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
          offering.get('date').toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      });
    }
    return offerings;
  }),
  sumOfOfferings: Ember.computed('searchableOfferings.@each', function() {
    let sum = 0;
    this.get('searchableOfferings').forEach(function(offering) {
      sum += Number(offering.get('value'));
    });
    return sum;
  }),
  actions: {
    editOffering: function(id) {
      this.editOfferingActionHandler(id);
    }
  }
});
