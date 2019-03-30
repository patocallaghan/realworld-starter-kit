import DS from 'ember-data';
const { Model, attr, belongsTo, hasMany } = DS;
import { tracked } from '@glimmer/tracking';
import marked from 'marked';
import { htmlSafe } from '@ember/string';

export default class ArticleModel extends Model {
  @tracked body;

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
}
