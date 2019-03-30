import DS from 'ember-data';
const { Model, attr } = DS;

export default class UserModel extends Model {
  @attr('string') bio;
  @attr('string') image;
  @attr('boolean') following;
}
