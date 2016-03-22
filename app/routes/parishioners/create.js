import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('parishioner', {});
  },
  actions: {
    save(parishioner) {
      parishioner.save();
      this.transitionTo('parishioners');
    }
  }
});
