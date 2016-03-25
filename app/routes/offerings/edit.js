import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return Ember.RSVP.hash({
      offering: this.store.findRecord('offering', params.offering_id),
      parishioners: this.store.findAll('parishioner')
    });
  }
});
