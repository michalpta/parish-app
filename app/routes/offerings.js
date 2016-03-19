import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return {
      offerings: this.store.findAll('offering'),
      parishioners: this.store.findAll('parishioner')
    };
  }
});
