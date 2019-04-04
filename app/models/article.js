import DS from 'ember-data';
const { Model, attr, belongsTo, hasMany } = DS;
import { tracked } from '@glimmer/tracking';
import marked from 'marked';
import { htmlSafe } from '@ember/string';
import { inject as service } from '@ember/service';
import ENV from 'realworld-starter-kit/config/environment';

export default class ArticleModel extends Model {
  @tracked title;
  @tracked description;
  @tracked body;
  @tracked tagList;

  @service('session') session;

  @attr('string') title;
  @attr('string') description;
  @attr('string') body;
  @attr('date') createdAt;
  @attr('date') updatedAt;
  @attr('boolean') favorited;
  @attr('number') favoritesCount;
  @attr({ defaultValue: () => [] }) tagList;

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
    await this.favoriteOperation('favorite');
  }

  async unfavorite() {
    await this.favoriteOperation('unfavorite');
  }

  async favoriteOperation(operation) {
    let response = await fetch(`${ENV.APP.apiHost}/articles/${this.id}/favorite`, {
      method: operation === 'unfavorite' ? 'DELETE' : 'POST',
      headers: {
        Authorization: `Token ${this.session.token}`,
      },
    });
    let { article } = await response.json();
    this.store.pushPayload({
      articles: [Object.assign(article, { id: article.slug })],
    });
  }
}
