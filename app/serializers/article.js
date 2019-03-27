import DS from 'ember-data';
const { EmbeddedRecordsMixin, RESTSerializer } = DS;

export default class ArticleSerializer extends RESTSerializer.extend(EmbeddedRecordsMixin) {
  primaryKey = 'slug';

  attrs = {
    author: { embedded: 'always' },
  };
}
