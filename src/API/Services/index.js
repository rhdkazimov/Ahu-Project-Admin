import { AdminAuthService } from "./Auth";
import { AdminBrandService } from "./Brand";
import { AdminCategoryService } from "./Category";
import { AdminProductService } from "./Product";

export const useService = () => {
  const services = {
    userAuthService: new AdminAuthService(),
    brandService: new AdminBrandService(),
    categoryService: new AdminCategoryService(),
    productService: new AdminProductService()
  };

  return services;
};
