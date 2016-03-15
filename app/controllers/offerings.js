import Ember from 'ember';

export default Ember.Controller.extend({
  isNewOfferingFormVisible: false,
  actions: {
    toggleIsFormVisible: function() {
      this.toggleProperty('isFormVisible');
    },
  }
});
