import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import ENV from 'realworld-starter-kit/config/environment';

export default class TagListComponent extends Component {
  @tracked tags = [];
  @tracked isLoading = false;

  constructor() {
    super(...arguments);
    this.loadTags();
  }

  async loadTags() {
    this.isLoading = true;
    let response = await fetch(`${ENV.APP.apiHost}/tags`);
    let { tags } = await response.json();
    this.tags = tags;
    this.isLoading = false;
  }
}
