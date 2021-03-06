import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class LoginFormComponent extends Component {
  @tracked email;
  @tracked password;
  @tracked user;
  @tracked loginErrors;

  @service('session') session;
  @service('router') router;

  email = '';
  password = '';
  user = null;
  loginErrors = [];

  @action
  async submit(e) {
    e.preventDefault();
    this.loginErrors = [];
    this.user = await this.session.logIn(this.email, this.password);
    if (this.user.errors.length) {
      this.loginErrors = this.user.errors;
    } else {
      this.router.transitionTo('index');
    }
  }
}
