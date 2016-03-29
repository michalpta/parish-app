import Ember from 'ember';

export default Ember.Controller.extend({
  sortParams: ['name'],
  sortedModel: Ember.computed.sort('model', 'sortParams'),
  searchableParishioners: Ember.computed('sortedModel', 'quickSearch', function() {
    let parishioners = this.get('sortedModel');
    let filter = this.get('quickSearch');
    if (filter) {
      parishioners = parishioners.filter(function(parishioner) {
        return parishioner.get('name').toLowerCase().includes(filter.toLowerCase()) ||
          parishioner.get('address').toLowerCase().includes(filter.toLowerCase());
      });
    }
    return parishioners;
  }),
});
