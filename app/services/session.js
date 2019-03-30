import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SessionService extends Service {
  @service('store') store;

  @tracked token;

  token = null;
  STORAGE_KEY = 'realworld.ember-octane.token';

  get isLoggedIn() {
    if (this.token) {
      return true;
    }

    let storedToken = this.getStoredToken();
    if (storedToken) {
      this.token = storedToken;
      return true;
    }

    return false;
  }

  @action
  async register(username, email, password) {
    let user = this.store.createRecord('user', {
      username,
      email,
      password,
    });
    await user.save();
    localStorage.setItem(this.STORAGE_KEY);
    this.token = user.token;
  }

  @action
  async logIn(email, password) {
    // @patocallaghan - It would be nice to encapsulate some of this logic in the User model as a `static` class, but unsure how to access container and store from there
    let host = getOwner(this).lookup('adapter:application').host;
    let login = await fetch(`${host}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
          password,
        },
      }),
    });
    let userPayload = await login.json();
    this.store.pushPayload({
      users: [userPayload.user],
    });
    this.setToken(userPayload.user.token);
  }

  @action
  logOut() {
    this.removeToken();
  }

  getStoredToken() {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem(this.STORAGE_KEY, token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('realworld.ember-octane.token');
  }
}
