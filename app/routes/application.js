import Ember from 'ember';
import ENV from 'parish-app/config/environment';

let route = null;

if (ENV.useFirebase) {

route = Ember.Route.extend({
  beforeModel: function() {
    return this.get('session').fetch().catch(function() {});
  },
  actions: {
    accessDenied: function() {
      this.transitionTo('index');
    },
    signIn: function(username, password) {
      this.get('session').open('firebase', { provider: 'password', email: username, password: password }).then(function(data) {
        console.log(data.currentUser);
      });
    },
    signOut: function() {
      this.get('session').close();
      this.transitionTo('index');
    }
  }
});

}
else {

route = Ember.Route.extend({});

}

export default route;
