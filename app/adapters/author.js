import ApplicationAdapter from './application';

export default class AuthorAdapter extends ApplicationAdapter {
  pathForType() {
    return 'profiles';
  }
}
