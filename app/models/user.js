import DS from 'ember-data';
const { Model, attr } = DS;
import ENV from 'realworld-starter-kit/config/environment';
import { inject as service } from '@ember/service';

export default class UserModel extends Model {
  @service('session') session;

  @attr('string') bio;
  @attr('string') email;
  @attr('string') image;
  @attr('string') password;
  @attr('string') token;
  @attr('string') username;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  async fetchFeed(page = 1) {
    let response = await fetch(`${ENV.APP.apiHost}/articles/feed?page=${page}`, {
      headers: {
        Authorization: `Token ${this.session.token}`,
      },
    });
    let { articles } = await response.json();
    if (!articles.length) {
      return [];
    }
    let ids = articles.map(article => article.id);
    this.store.pushPayload({
      articles: [articles],
    });
    return this.store.peekAll('article').filter(article => ids.includes(article.id));
  }
}
