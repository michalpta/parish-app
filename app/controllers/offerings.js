import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  isFormVisible: false,
  actions: {
    toggleIsFormVisible: function() {
      this.toggleProperty('isFormVisible');
    },
    createOffering: function() {
      this.set('editedOffering', null);
      this.set('isFormVisible', true);
    },
    editOffering: function(id) {
      let offering = this.get('model.offerings').findBy('id',id);
      this.set('editedOffering', offering);
      this.set('isFormVisible', true);
      $('html, body').animate({ scrollTop: 0 });
    }
  },
});
