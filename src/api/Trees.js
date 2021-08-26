class Trees {
  constructor(api) {
    this.api = api;
  }

  async getAll(params = {}) {
    try {
      const response = await this.api.instance.get('/trees', { params: params });

      return [true, response.data.trees];
    } catch (error) {
      const { status, statusText, data } = error.response;
      const message = String(status) + " " + statusText + ": " + data.errors.detail;

      return [false, message];
    }
  }

  async updateTreeStatus(treeId, status) {
    try {
      const url = '/trees/' + String(treeId);
      await this.api.instance.patch(url, { status: status });

      return [true, ""];
    } catch (error) {
      const { status, statusText, data } = error.response;
      const message = String(status) + " " + statusText + ": " + data.errors.detail;

      return [false, message];
    }
  }
}

export default Trees;
