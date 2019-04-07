import DS from 'ember-data';
const { Model, attr } = DS;
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
    let { articles } = await this.authorizedFetch.fetch(`/articles/feed?page=${page}`);
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
