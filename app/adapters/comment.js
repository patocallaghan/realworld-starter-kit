import ApplicationAdapter from './application';

export default class AuthorAdapter extends ApplicationAdapter {
  urlForQuery(query) {
    return `${this.host}/articles/${query.article_id}/comments`;
  }
}
