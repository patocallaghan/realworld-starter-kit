import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('editor');
  this.route('settings');
  this.route('register');
  this.route('login');

  this.route('articles', function() {
    this.route('article', { path: ':id' });
  });
  this.route('profile', { path: 'profile/:id' }, function() {
    this.route('favorites');
  });
});

export default Router;
