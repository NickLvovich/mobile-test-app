// importing observables and decorate
import {decorate, observable, action, computed} from 'mobx';

class Store {
  email = '';
  password = '';
  userData = [];
  check_textInputChange = false;
  secureTextEntry = true;
  isValidUser = true;
  isValidPassword = true;
  data = [];

  updateUsername = (email) => {
    this.email = email;
  };
  updatePassword = (password) => {
    this.password = password;
  };

  fetchUser = (email, password) => {
    fetch('https://dev.addictivelearning.io/api/v1/login', {
      body: `email=${email}&password=${password}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Csrf-Token': 'wvui7jvLbEoXgRKtCwQWehrBxMB6cH4r5DNn9tGQ',
      },
      method: 'POST',
    })
      .then((response) => response.json())
      .then((userData) => this.setData(userData))
      .catch((error) => setError(error));
  };

  // observables can be modifies by an action only
  setData = (userData) => {
    this.userData = userData;
  };

  logout = async () => {
    await fetch('https://dev.addictivelearning.io/api/v1/logout', {
      headers: {
        Accept: 'application/json',
        'X-Csrf-Token': 'ooMHs8gf5QUOBQQqDnvJjQK48WDocQMfu3WQnUvb',
      },
      method: 'POST',
    })
      .then((response) => response.json())
      .then((responce) => console.log(responce))
      .catch((error) => error);
  };
}

// another way to decorate variables with observable
decorate(Store, {
  email: observable,
  password: observable,
  userData: observable,
  data: observable,
  fetchUser: action,
  check_textInputChange: observable,
  secureTextEntry: observable,
  isValidUser: observable,
  isValidPassword: observable,
});

// export class
export default new Store();
