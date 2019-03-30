import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ArticlePreviewComponent extends Component {
  @service('session') session;
  @service('router') router;

  @action
  favoriteArticle(article) {
    if (this.session.isLoggedIn) {
      article.favorite();
    } else {
      this.router.transitionTo('sign-in');
    }
  }
}
