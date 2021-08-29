import axios from "axios";

import Trees from "./Trees";
import Users from "./Users";
import Auth from "./Auth";

class Api {
  constructor(baseUrl) {
    this.instance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': "application/json",
      }
    });

    this.Trees = new Trees(this);
    this.Users = new Users(this);
    this.Auth = new Auth(this);

    this.instance.interceptors.request.use(async config => {
      const token = this.Auth.getToken();

      if (token && config.url !== "/auth") {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  }
}

export default Api;
