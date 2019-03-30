import DS from 'ember-data';
const { Model, attr } = DS;

export default class UserModel extends Model {
  @attr('string') bio;
  @attr('string') email;
  @attr('string') image;
  @attr('string') password;
  @attr('string') token;
  @attr('string') username;
  @attr('date') createdAt;
  @attr('date') updatedAt;
}
