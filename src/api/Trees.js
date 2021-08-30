class Trees {
  constructor(api) {
    this.api = api;
  }

  async getAll(params = {}) {
    try {
      const response = await this.api.instance.get('/trees', { params: params });

      return [true, response.data.trees, response.status];
    } catch (error) {
      if (error.response) {
        const { status, statusText, data } = error.response;
        const message = String(status) + " " + statusText + ": " + data.errors.detail;

        return [false, message, status];
      }

      return [false, "Servers Offline. Please try again later."];
    }
  }

  async updateTreeStatus(treeId, status) {
    try {
      const url = '/trees/' + String(treeId);
      await this.api.instance.patch(url, { status: status });

      return [true, "", status];
    } catch (error) {
      if (error.response) {
        const { status, statusText, data } = error.response;
        const message = String(status) + " " + statusText + ": " + data.errors.detail;

        return [false, message, status];
      }

      return [false, "Servers Offline. Please try again later."];
    }
  }
}

export default Trees;
