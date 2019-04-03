import Service from '@ember/service';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ENV from 'realworld-starter-kit/config/environment';

export default class SessionService extends Service {
  @service('store') store;

  @tracked token;
  @tracked user;

  token = null;
  user = null;
  STORAGE_KEY = 'realworld.ember-octane.token';

  initSession() {
    let storedToken = this.getStoredToken();
    if (storedToken) {
      this.token = storedToken;
      return this.fetchUser();
    }
  }

  get isLoggedIn() {
    return !!this.token;
  }

  @action
  async register(username, email, password) {
    let user = this.store.createRecord('user', {
      username,
      email,
      password,
    });
    try {
      await user.save();
      this.setToken(user.token);
    } catch {
      // Registration returned errors
    } finally {
      this.user = user;
    }
    return user;
  }

  @action
  async logIn(email, password) {
    // @patocallaghan - It would be nice to encapsulate some of this logic in the User model as a `static` class, but unsure how to access container and store from there
    let login = await fetch(`${ENV.APP.apiHost}/users/login`, {
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
    if (userPayload.errors) {
      let errors = this.processLoginErrors(userPayload.errors);
      return { errors };
    } else {
      this.store.pushPayload({
        users: [userPayload.user],
      });
      this.setToken(userPayload.user.token);
      this.user = this.store.peekRecord('user', userPayload.user.id);
      return this.user;
    }
  }

  @action
  logOut() {
    this.removeToken();
  }

  async fetchUser() {
    let response = await fetch(`${ENV.APP.apiHost}/user`, {
      headers: {
        Authorization: `Token ${this.token}`,
      },
    });
    let { user } = await response.json();
    this.store.pushPayload({
      users: [user],
    });
    this.user = this.store.peekRecord('user', user.id);
    return this.user;
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

  processLoginErrors(errors) {
    let loginErrors = [];
    let errorKeys = Object.keys(errors);
    errorKeys.forEach(attribute => {
      errors[attribute].forEach(message => {
        loginErrors.push(`${attribute} ${message}`);
      });
    });
    return loginErrors;
  }
}
