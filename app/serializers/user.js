import ApplicationSerializer from './application';

export default class UserSerializer extends ApplicationSerializer {
  primaryKey = 'username';

  normalizeFindRecordResponse(store, primaryModelClass, payload) {
    // TODO - Figure out why just mutating payload to be { users: { ... }} and calling `super` doesn't work
    let profile = payload.profile;
    return {
      data: {
        type: 'user',
        id: profile.username,
        attributes: profile,
      },
    };
  }
}
