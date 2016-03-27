import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get('session').fetch().catch(function() {});
  },
  actions: {
    signIn: function(username, password) {
      this.get('session').open('firebase', { provider: 'password', email: username, password: password }).then(function(data) {
        console.log(data.currentUser);
      });
    },
    signOut: function() {
      this.get('session').close();
    }
  }
});
