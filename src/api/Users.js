class Users {
  constructor(api) {
    this.api = api;
  }

  async getAll(params = {}) {
    try {
      const response = await this.api.instance.get('/users', { params: params });
      const total = parseInt(response.headers["x-total-count"]);

      return { ok: true, users: response.data.users, status: response.status, total: total };
    } catch (error) {
      if (error.response) {
        const { status, statusText, data } = error.response;
        const message = String(status) + " " + statusText + ": " + data.errors.detail;

        return { ok: false, message: message, status: status }
      }

      return { ok: false, message: "Servers Offline. Please try again later." };
    }
  }

  async updateUserRoles(userId, roles) {
    try {
      const url = '/users/' + String(userId);
      await this.api.instance.patch(url, { roles: roles });

      return { ok: true };
    } catch (error) {
      if (error.response) {
        const { status, statusText, data } = error.response;
        const message = String(status) + " " + statusText + ": " + data.errors.detail;

        return { ok: false, message: message, status: status };
      }

      return { ok: false, message: "Servers Offline. Please try again later." };
    }
  }
}

export default Users;
