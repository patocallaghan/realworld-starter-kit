import DS from 'ember-data';
const { Model, attr } = DS;

export default class AuthorModel extends Model {
  @attr('string') bio;
  @attr('string') image;
  @attr('boolean') following;
}
