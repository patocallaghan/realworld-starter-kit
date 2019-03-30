import ApplicationSerializer from './application';

export default class UserSerializer extends ApplicationSerializer {
  primaryKey = 'username';

  normalizeFindRecordResponse(store, primaryModelClass, payload) {
    // TODO - Figure out why just mutating payload to be { profiles: { ... }} and calling `super` doesn't work
    let profile = payload.profile;
    return {
      data: {
        type: 'profile',
        id: profile.username,
        attributes: profile,
      },
    };
  }
}
