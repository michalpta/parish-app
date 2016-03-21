import Ember from 'ember';
import {faker} from 'ember-cli-mirage';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  init: function() {
    this._super(arguments);
    if (this.get('model') === null) {
      this.setDefaultParishioner();
    }
  },
  actions: {
    save() {
      this.saveParishioner(this.get('model'));
    },
    delete() {
      this.set('deleteConfirmationNeeded', false);
      if (!this.get('isNewRecord')) {
        let parishioner = this.get('model');
        parishioner.destroyRecord();
        this.set('model',{});
      }
    },
    showDeleteConfirmation() {
      this.set('deleteConfirmationNeeded', true);
    },
    cancelDelete() {
      this.set('deleteConfirmationNeeded', false);
    }
  },
  isNewRecord: Ember.computed('model', function() {
    let model = this.get('model');
    return model.get === undefined;
  }),
  setDefaultParishioner: function() {
    let parishioner = {
      name: faker.fake('{{name.lastName}} {{name.firstName}}'),
      city: faker.address.city(),
      street: faker.address.streetName(),
      streetNumber: faker.random.number({ min: 1, max: 100 })
    };
    this.set('model', parishioner);
  }
});
