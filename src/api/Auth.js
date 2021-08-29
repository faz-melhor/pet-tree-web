import jwt_decode from 'jwt-decode';
class Auth {
  constructor(api) {
    this.api = api;
  }

  async signin(email, password) {
    try {
      const response = await this.api.instance.post('/auth', { email: email, password: password });

      const token = response.data.token;
      const user = jwt_decode(token);

      if (user.roles.includes("admin")) {
        localStorage.setItem('token', token);

        return [true, ""]
      } else {
        const message = "401 Unauthorized: You are not an admin";

        return [false, message];
      }
    } catch (error) {
      if (error.response) {
        const { status, statusText, data } = error.response;
        const message = String(status) + " " + statusText + ": " + data.errors.detail;

        return [false, message];
      }

      return [false, "Servers Offline. Please try again later."];
    }
  }

  signout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return this.getToken() !== null;
  }
}

export default Auth;
