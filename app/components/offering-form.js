import Ember from 'ember';
import {faker} from 'ember-cli-mirage';
import moment from 'moment';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  init: function() {
    this._super(arguments);
    this.get('store').findAll('parishioner').
      then((parishioners) => { this.set('parishioners', parishioners); });
    if (this.get('model') === null) {
      this.setDefaultOffering();
    }
  },
  didInsertElement: function() {
    this.initChosen();
  },
  sortedParishioners: Ember.computed.sort('parishioners', 'sortProps'),
  sortProps: ['name'],
  actions: {
    selectParishioner(id) {
      if (id !== '') {
        this.get('store').findRecord('parishioner', id).
          then((parishioner) => { this.set('model.parishioner', parishioner); });
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
        this.set('model', offering);
        this.resetChosen();
        this.setDefaultOffering();
        this.focusParishionerInput();
      }
      offering.save();
    },
    delete() {
      if (!this.get('isNewRecord')) {
        let offering = this.get('model');
        offering.destroyRecord();
        this.set('model',{});
        this.resetChosen();
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
  resetChosen: function() {
    this.$('option:selected').removeAttr('selected');
    this.$('select').trigger('chosen:updated');
  },
  parishionersObserver: function() {
    if (!this.get('isNewRecord')) {
      this.$('select').val(this.get('model.parishioner.id'));
    }
    this.$('select').trigger('chosen:updated');
  }.observes('parishioners').on('didUpdate'),
});
