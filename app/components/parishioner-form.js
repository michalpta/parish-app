import Ember from 'ember';
import {faker} from 'ember-cli-mirage';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  init: function() {
    this._super(arguments);
    if (this.get('model.isNew')) {
      this.setDefaultParishioner();
    }
  },
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
  setDefaultParishioner: function() {
    this.set('model.name', faker.fake('{{name.lastName}} {{name.firstName}}'));
    this.set('model.city', faker.address.city());
    this.set('model.street', faker.address.streetName());
    this.set('model.streetNumber', faker.random.number({ min: 1, max: 100 }));
  },
  willDestroy() {
    this.get('model').rollbackAttributes();
  }
});
