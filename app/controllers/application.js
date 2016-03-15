import Ember from 'ember';

export default Ember.Controller.extend({
  i18n: Ember.inject.service(),
  setLocale: function(locale) {
    this.set('i18n.locale', locale);
  }
});
