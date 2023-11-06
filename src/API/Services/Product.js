import { HttpClient } from "../HTTPClients";

export class AdminProductService extends HttpClient {
  constructor() {
    // super("http://ahuproject-001-site1.atempurl.com");
    super("https://localhost:7094");
  }

  async getAllProducts() {
    return await this.get(`api/product`);
  }

  async createNewProduct(body, file) {
    const formBody = new FormData();
    formBody.append("name", body.name);
    formBody.append("rate", body.rate);
    formBody.append("brandId", body.brandId);
    formBody.append("categoryId", body.categoryId);
    formBody.append("salePrice", body.salePrice);
    formBody.append("costPrice", body.costPrice);
    formBody.append("discountPercent", body.discountPercent);
    formBody.append("stockCount", body.stockCount);
    formBody.append("description", body.description);
    formBody.append("size", body.size);
    formBody.append("color", body.color);
    formBody.append("posterImageFile", file.posterImageFile[0]);
    for (let idx = 0; idx < file.imageFiles.length; idx++) {
      formBody.append("imageFiles", file.imageFiles[idx]);
    }

    return await this.post(`api/product`, formBody);
  }

  async getProductById(id) {
    return await this.get(`api/product/${id}`);
  }

  async deleteProduct(id) {
    return await this.delete(`api/product/${id}`);
  }
}
