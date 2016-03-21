import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  model() {
    return null;
  },
  actions: {
    saveParishioner(parishioner) {
      parishioner = this.get('store').createRecord('parishioner', parishioner);
      parishioner.save();
      this.transitionTo('parishioners.edit', parishioner);
    }
  }
});
