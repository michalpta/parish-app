import Ember from 'ember';
import {faker} from 'ember-cli-mirage';
import moment from 'moment';

export default Ember.Route.extend({
  model() {
    let offering = {
      date: moment(faker.date.past()).format('YYYY-MM-DD HH:mm'),
      value: faker.finance.amount()
    };
    return Ember.RSVP.hash({
      offering: this.store.createRecord('offering', offering),
      parishioners: this.store.findAll('parishioner')
    });
  }
});
