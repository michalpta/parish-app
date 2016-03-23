import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save() {
      this.sendAction('save', this.get('model'));
    },
    delete() {
      this.sendAction('delete', this.get('model'));
    },
    showDeleteConfirmation() {
      this.set('deleteConfirmationNeeded', true);
    },
    cancelDelete() {
      this.set('deleteConfirmationNeeded', false);
    }
  },
  willDestroy() {
    this.get('model').rollbackAttributes();
  }
});
