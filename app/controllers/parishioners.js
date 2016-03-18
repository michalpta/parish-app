import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  isFormVisible: false,
  actions: {
    toggleIsFormVisible: function() {
      this.toggleProperty('isFormVisible');
    },
    createParishioner: function() {
      this.set('editedParishioner', null);
      this.set('isFormVisible', true);
    },
    editParishioner: function(id) {
      let parishioner = this.get('model').findBy('id',id);
      this.set('editedParishioner', parishioner);
      this.set('isFormVisible', true);
      $('html, body').animate({ scrollTop: 0 });
    }
  },
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
