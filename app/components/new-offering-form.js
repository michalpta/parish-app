import Ember from 'ember';
import {faker} from 'ember-cli-mirage';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  init: function() {
    this._super(arguments);
    let parishioners = this.get('store').findAll('parishioner');
    this.set('parishioners', parishioners);
    if (this.get('model') === null)
      this.setDefaultOffering();
  },
  didInsertElement: function() {
    this.initChosen();
  },
  sortedParishioners: Ember.computed.sort('parishioners', 'sortProps'),
  sortProps: ['name'],
  actions: {
    selectParishioner: function(id) {
      let parishioner = null;
      if (id !== '') {
        parishioner = this.get('store').findRecord('parishioner', id);
        this.focusValueInput();
      }
      this.set('model.parishioner', parishioner);
    },
    saveOffering: function() {
      let offering = this.get('model');
      if (this.isOfferingValid(offering)) {
        if (this.get('isNewRecord')) {
          offering = this.get('store').createRecord('offering', offering);
          this.set('model', offering);
        }
        offering.save();
        this.resetChosen();
        this.setDefaultOffering();
        this.focusParishionerInput();
        this.set('errorMessage', null);
      }
      else {
        this.set('errorMessage', 'Offering is not complete and cannot be added.');
      }
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
    }
    this.set('model', offering);
  },
  focusParishionerInput: function() {
    this.$('select').trigger('chosen:activate');
  },
  focusValueInput: function() {
    this.$('#offering-value').focus();
  },
  initChosen: function() {
    this.$('select').chosen({ max_selected_options: 1 });
  },
  resetChosen: function() {
    this.$('option:selected').removeAttr('selected');
    this.$('select').trigger('chosen:updated');
  },
  parishionersObserver: function() {
    this.$('select').trigger('chosen:updated');
  }.observes('parishioners').on('didUpdate'),
  isOfferingValid: function(offering) {
    return offering.parishioner != null &&
      offering.value != null &&
      offering.value > 0;
  }
});
