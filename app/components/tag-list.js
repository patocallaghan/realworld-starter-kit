import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class TagListComponent extends Component {
  @tracked tags = [];
  @tracked isLoading = false;

  constructor(owner, args) {
    super(owner, args);
    this.loadTags();
  }

  async loadTags() {
    this.isLoading = true;
    let response = await fetch('https://conduit.productionready.io/api/tags');
    let { tags } = await response.json();
    this.tags = tags;
    this.isLoading = false;
  }
}
