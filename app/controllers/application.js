import Ember from 'ember';
import ENV from 'parish-app/config/environment';

export default Ember.Controller.extend({
  i18n: Ember.inject.service(),
  setLocale: function(locale) {
    this.set('i18n.locale', locale);
  },
  isAuthenticated: Ember.computed('session.isAuthenticated', function(){
    return this.get('session.isAuthenticated') ||
      !ENV.useFirebase;
  })
});
