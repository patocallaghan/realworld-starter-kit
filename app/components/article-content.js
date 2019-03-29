import Component from '@glimmer/component';
import marked from 'marked';
import { htmlSafe } from '@ember/string';

export default class ArticleContentComponent extends Component {
  get safeMarkup() {
    let markup = marked(this.args.article.body, { sanitize: true });
    return htmlSafe(markup);
  }
}
