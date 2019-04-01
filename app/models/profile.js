import DS from 'ember-data';
import { tracked } from '@glimmer/tracking';
const { Model, attr, hasMany } = DS;

export default class UserModel extends Model {
  @tracked articles;

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
}
