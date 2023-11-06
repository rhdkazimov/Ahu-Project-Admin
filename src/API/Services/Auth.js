import { HttpClient } from "../HTTPClients";

export class AdminAuthService extends HttpClient {
  constructor() {
    // super("http://ahuproject-001-site1.atempurl.com");
    super("https://localhost:7094");
  }

  async loginUser(body) {
    return await this.post(`api/auth/loginadmin`, body).then(({ data }) => {
      localStorage.setItem("tokenAdmin", data.token);
      localStorage.setItem("admin", JSON.stringify(data.user));
    });
  }

  async logout() {
    return await this.post("api/auth/logout").then(() => {
      localStorage.removeItem("tokenAdmin");
      localStorage.removeItem("admin");
    });
  }
}
