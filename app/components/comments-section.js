import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class CommentsSectionComponent extends Component {
  @tracked isLoading = false;

  constructor() {
    super(...arguments);
    this.loadComments();
  }

  async loadComments() {
    this.isLoading = true;
    let comments = await this.args.article.loadComments();
    this.args.article.set('comments', comments);
    this.isLoading = false;
  }
}
