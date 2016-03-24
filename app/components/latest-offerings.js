import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 50.0464284, lng: 19.7246942},
      zoom: 10
    });
  },
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
  })
});
