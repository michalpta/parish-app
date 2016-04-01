import Ember from 'ember';

export default Ember.Component.extend({
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
  offeringMapData: Ember.computed('searchableParishioners.@each', function() {
    let data = Ember.A();
    this.get('searchableParishioners').forEach(function(parishioner){
      data.pushObject({
        address: parishioner.get('address'),
        name: parishioner.get('name'),
        total: parishioner.get('offeringsTotal')
      });
    });
    return data;
  }),
  showOnMap: false,
  actions: {
    toggleShowOnMap() {
      this.toggleProperty('showOnMap');
    }
  }
});
