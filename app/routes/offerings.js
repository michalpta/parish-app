import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('offering');
  },
  actions: {
    save(model) {
      model.save().then(() => (this.refresh()));
    },
    delete(model) {
      model.destroyRecord();
      this.transitionTo('offerings');
    }
  }
});
