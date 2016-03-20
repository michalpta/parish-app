import Ember from 'ember';
import {faker} from 'ember-cli-mirage';
import moment from 'moment';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  init: function() {
    this._super(arguments);
    if (this.get('model') === null) {
      this.setDefaultOffering();
    }
  },
  sortedParishioners: Ember.computed.sort('parishioners', 'sortProps'),
  sortProps: ['name'],
  actions: {
    selectParishioner(parishioner) {
      this.set('model.parishioner', parishioner);
      this.focusValueInput();
    },
    save() {
      let offering = this.get('model');
      if (this.get('isNewRecord')) {
        offering = this.get('store').createRecord('offering', offering);
        this.setDefaultOffering();
        this.focusParishionerInput();
      }
      offering.save();
    },
    delete() {
      this.set('deleteConfirmationNeeded', false);
      if (!this.get('isNewRecord')) {
        let offering = this.get('model');
        offering.destroyRecord();
        this.set('model', {});
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
  setDefaultOffering: function() {
    let offering = {
      date: moment(faker.date.past()).format('YYYY-MM-DD HH:mm'),
      value: faker.finance.amount()
    };
    this.set('model', offering);
  },
  focusParishionerInput: function() {
    this.$('#ember-power-select-trigger-offering-parishioner').focus();
  },
  focusValueInput: function() {
    this.$('#offering-value').focus();
    this.$('#offering-value').select();
  }
});
