import DS from 'ember-data';
const { RESTAdapter } = DS;
import { inject as service } from '@ember/service';

export default class ApplicationAdapter extends RESTAdapter {
  @service('session') session;

  host = 'https://conduit.productionready.io/api';

  headers = {
    Authorization: this.session.token ? `Token ${this.session.token}` : '',
  };
}
