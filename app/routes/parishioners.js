import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('parishioner');
  },
  actions: {
    save(model) {
      model.save().then(() => (this.transitionTo('parishioners')));
    },
    delete(model) {
      let self = this;
      let deletions = model.get('offerings').map(function(offering) {
        return offering.destroyRecord();
      });
      Ember.RSVP.all(deletions).then(function() {
        model.destroyRecord();
        self.transitionTo('parishioners');
      });
    }
  }
});
