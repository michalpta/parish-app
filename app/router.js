import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.authenticatedRoute('offerings', function() {
    this.authenticatedRoute('create');
    this.authenticatedRoute('edit', { path: '/edit/:offering_id' });
  });
  this.authenticatedRoute('parishioners', function() {
    this.authenticatedRoute('create');
    this.authenticatedRoute('edit', { path: '/edit/:parishioner_id' });
  });
});

export default Router;
