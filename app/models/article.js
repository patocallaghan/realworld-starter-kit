import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default class ArticleModel extends Model {
  @attr('string') title;
  @attr('string') description;
  @attr('string') body;
  @attr('date') createdAt;
  @attr('date') updatedAt;
  @attr('boolean') favorited;
  @attr('number') favoritesCount;
  @attr() tagList;

  @belongsTo('author') author;
}
