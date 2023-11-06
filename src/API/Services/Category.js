import { HttpClient } from "../HTTPClients";

export class AdminCategoryService extends HttpClient {
  constructor() {
    // super("http://ahuproject-001-site1.atempurl.com");
    super("https://localhost:7094");
  }

  async getAllCategorys() {
    return await this.get(`api/category`);
  }

  async createNewCategory(body) {
    return await this.post(`api/category`, body);
  }

  async getCategoryById(id) {
    return await this.get(`api/category/${id}`);
  }

  async deleteCategory(id) {
    return await this.delete(`api/category/${id}`);
  }
}
