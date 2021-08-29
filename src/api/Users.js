class Users {
  constructor(api) {
    this.api = api;
  }

  async getAll(params = {}) {
    try {
      const response = await this.api.instance.get('/users', { params: params });

      return [true, response.data.users];
    } catch (error) {
      if (error.response) {
        const { status, statusText, data } = error.response;
        const message = String(status) + " " + statusText + ": " + data.errors.detail;

        return [false, message];
      }

      return [false, "Servers Offline. Please try again later."];
    }
  }
}

export default Users;
