import ApplicationSerializer from './application';

export default class AuthorSerializer extends ApplicationSerializer {
  primaryKey = 'username';

  normalizeFindRecordResponse(store, primaryModelClass, payload) {
    // TODO - Figure out why just mutating payload to be { authors: { ... }} and calling `super` doesn't work
    let profile = payload.profile;
    return {
      data: {
        type: 'author',
        id: profile.username,
        attributes: profile,
      },
    };
  }
}
