import DS from 'ember-data';
const { RESTAdapter } = DS;

export default class ApplicationAdapter extends RESTAdapter {
  host = 'https://conduit.productionready.io/api';
}
