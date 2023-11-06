import { HttpClient } from "../HTTPClients";

export class AdminBrandService extends HttpClient {
  constructor() {
    // super("http://ahuproject-001-site1.atempurl.com");
    super("https://localhost:7094");
  }

  async getAllBrands() {
    return await this.get(`api/brand`);
  }

  async createNewBrand(body) {
    return await this.post(`api/brand`, body);
  }

  async getBrandById(id) {
    return await this.get(`api/brand/${id}`);
  }

  async deleteBrand(id) {
    return await this.delete(`api/brand/${id}`);
  }
}
