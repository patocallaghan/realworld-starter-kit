import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CommentsFormComponent extends Component {
  @tracked
  body = '';

  @action
  async addComment(e) {
    e.preventDefault();
    this.args.addComment(this.body);
    this.body = '';
  }
}
