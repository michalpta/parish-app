import Ember from 'ember';

export default Ember.Controller.extend({
  sortParams: ['name'],
  sortedModel: Ember.computed.sort('model', 'sortParams'),
  searchableParishioners: Ember.computed('sortedModel', 'quickSearch', function() {
    let parishioners = this.get('sortedModel');
    let filter = this.get('quickSearch');
    if (filter) {
      parishioners = parishioners.filter(function(parishioner) {
        return parishioner.get('name').toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
          parishioner.get('address').toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      });
    }
    return parishioners;
  }),
});
