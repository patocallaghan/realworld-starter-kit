import Controller from '@ember/controller';

export default class IndexController extends Controller {
  queryParams = ['tag', 'author', 'page'];
  tag = null;
  author = null;
  page = 1;
}
