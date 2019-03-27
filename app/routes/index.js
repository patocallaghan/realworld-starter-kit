import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  queryParams = {
    author: {
      refreshModel: true,
    },
    page: {
      refreshModel: true,
    },
    tag: {
      refreshModel: true,
    },
  };

  model({ page, author, tag }) {
    let NUMBER_OF_ARTICLES = 10;
    let offset = (parseInt(page, 10) - 1) * NUMBER_OF_ARTICLES;
    return this.store.query('article', {
      limit: NUMBER_OF_ARTICLES,
      offset,
      tag,
      author,
    });
  }
}
