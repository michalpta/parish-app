import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('parishioner');
  },
  actions: {
    save(model) {
      model.save().then(() => (this.transitionTo('parishioners.edit', model.get('id'))));
    },
    delete(model) {
      model.destroyRecord();
      this.transitionTo('parishioners');
    }
  }
});
