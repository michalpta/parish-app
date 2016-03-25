import Ember from 'ember';

export default Ember.Component.extend({
  sortedParishioners: Ember.computed.sort('parishioners', 'sortProps'),
  sortProps: ['name'],
  actions: {
    selectParishioner(parishioner) {
      this.set('model.parishioner', parishioner);
      this.focusValueInput();
    },
    save() {
      this.sendAction('save', this.get('model'));
      this.focusParishionerInput();
    },
    delete() {
      this.sendAction('delete', this.get('model'));
    },
    showDeleteConfirmation() {
      this.set('deleteConfirmationNeeded', true);
    },
    cancelDelete() {
      this.set('deleteConfirmationNeeded', false);
    },
    powerSelectFocusHandler(select) {
      select.actions.open();
    }
  },
  focusParishionerInput: function() {
    this.$('#ember-power-select-trigger-offering-parishioner').focus();
  },
  focusValueInput: function() {
    this.$('#offering-value').focus();
    this.$('#offering-value').select();
  },
  willDestroy() {
    this.get('model').rollbackAttributes();
  }
});
