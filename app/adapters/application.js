import Ember from 'ember';
import ENV from 'parish-app/config/environment';
import DS from 'ember-data';
import FirebaseAdapter from 'emberfire/adapters/firebase';

const { inject } = Ember;

let adapter = null;

if (ENV.useFirebase) {

adapter = FirebaseAdapter.extend({
  firebase: inject.service(),
});

}
else {

adapter = DS.RESTAdapter.extend({});

}

export default adapter;
