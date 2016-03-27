import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('offering');
  },
  actions: {
    delete(model) {
      model.destroyRecord();
      this.transitionTo('offerings');
    }
  }
});
