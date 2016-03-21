import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('offerings');
  this.route('parishioners', function() {
    this.route('create');
    this.route('edit', { path: '/edit/:parishioner_id' });
  });
});

export default Router;
