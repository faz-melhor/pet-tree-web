import axios from "axios";

import Trees from "./Trees";
import Users from "./Users";

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
  }
}

export default Api;
