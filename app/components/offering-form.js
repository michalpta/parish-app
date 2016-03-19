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
  didInsertElement: function() {
    this.initChosen();
    this.updateChosen();
  },
  sortedParishioners: Ember.computed.sort('parishioners', 'sortProps'),
  sortProps: ['name'],
  actions: {
    selectParishioner(id) {
      if (id !== '') {
        let parishioner = this.get('parishioners').findBy('id', id);
        this.set('model.parishioner', parishioner);
        this.focusValueInput();
      }
      else {
        this.set('model.parishioner', null);
      }
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
    this.$('select').trigger('chosen:activate');
  },
  focusValueInput: function() {
    this.$('#offering-value').focus();
    this.$('#offering-value').select();
  },
  initChosen: function() {
    this.$('select').chosen({ max_selected_options: 1 });
  },
  updateChosen: function() {
    this.$('select').val(this.get('model.parishioner.id'));
    this.$('select').trigger('chosen:updated');
  },
  chosenUpdater: function() {
    this.updateChosen();
  }.observes('model')
});
