import DS from 'ember-data';
import { tracked } from '@glimmer/tracking';
const { Model, attr, hasMany } = DS;
import { inject as service } from '@ember/service';
import ENV from 'realworld-starter-kit/config/environment';

export default class UserModel extends Model {
  @tracked articles;

  @service('session') session;

  @attr('string') bio;
  @attr('string') image;
  @attr('boolean') following;

  @hasMany('article', { async: false, inverse: 'author' }) articles;

  async loadArticles() {
    let articles = await this.store.query('article', { author: this.id });
    this.articles = articles;
  }

  fetchFavorites() {
    return this.store.query('article', { favorited: this.id });
  }

  async follow() {
    await this.followOperation('follow');
  }

  async unfollow() {
    await this.followOperation('unfollow');
  }

  async followOperation(operation) {
    let response = await fetch(`${ENV.APP.apiHost}/profiles/${this.id}/follow`, {
      method: operation === 'follow' ? 'POST' : 'DELETE',
      headers: {
        Authorization: `Token ${this.session.token}`,
      },
    });
    let { profile } = await response.json();
    this.store.pushPayload({
      profiles: [Object.assign(profile, { id: profile.username })],
    });
  }
}
