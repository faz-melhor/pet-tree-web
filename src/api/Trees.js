class Trees {
  constructor(api) {
    this.api = api;
  }

  async getAll(params = {}) {
    try {
      const response = await this.api.instance.get('/trees', { params: params });
      const total = parseInt(response.headers["x-total-count"]);

      return { ok: true, trees: response.data.trees, status: response.status, total: total };
    } catch (error) {
      if (error.response) {
        const { status, statusText, data } = error.response;
        const message = String(status) + " " + statusText + ": " + data.errors.detail;

        return { ok: false, message: message, status: status }
      }

      return { ok: false, message: "Servers Offline. Please try again later." };
    }
  }

  async updateTreeStatus(treeId, status) {
    try {
      const url = '/trees/' + String(treeId);
      await this.api.instance.patch(url, { status: status });

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

export default Trees;
