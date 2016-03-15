import Ember from 'ember';

export default Ember.Controller.extend({
  isNewOfferingFormVisible: false,
  actions: {
    toggleShowNewOfferingForm: function() {
      this.toggleProperty('isNewOfferingFormVisible');
    }
  }
});
