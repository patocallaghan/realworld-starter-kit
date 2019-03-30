import DS from 'ember-data';
const { Model, attr, belongsTo, hasMany } = DS;
import { tracked } from '@glimmer/tracking';
import marked from 'marked';
import { htmlSafe } from '@ember/string';
import { inject as service } from '@ember/service';
import ENV from 'realworld-starter-kit/config/environment';

export default class ArticleModel extends Model {
  @tracked body;

  @service('session') session;

  @attr('string') title;
  @attr('string') description;
  @attr('string') body;
  @attr('date') createdAt;
  @attr('date') updatedAt;
  @attr('boolean') favorited;
  @attr('number') favoritesCount;
  @attr() tagList;

  @belongsTo('profile') author;
  @hasMany('comment', { async: false }) comments;

  get safeMarkup() {
    let markup = marked(this.body, { sanitize: true });
    return htmlSafe(markup);
  }

  loadComments() {
    return this.store.query('comment', {
      article_id: this.id,
    });
  }

  async favorite() {
    let response = await fetch(`${ENV.APP.apiHost}/articles/${this.id}/favorite`, {
      headers: {
        Authorization: `Token ${this.session.token}`,
      },
    });
    let articlePayload = await response.json();
    this.store.pushPayload({
      articles: [articlePayload.articles],
    });
  }
}
