import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  this.route('editor');
  this.route('settings');
  this.route('sign-up');

  this.route('articles', function() {
    this.route('article', { path: ':id' });
  });
  this.route('author', { path: 'profile/:id' });
});

export default Router;
