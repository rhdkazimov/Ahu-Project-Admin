import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./consts";
import { Login } from "../app/Auth";
import { NotFound } from "../app/components/NotFound";
import { ProtectedLoginRouter } from "../app/components/ProtectedLoginRouter";
import { ProtectedRouter } from "../app/components/ProtectedRouter";
import SidebarWithHeader from "../app/components/sidebar/SideBar";
import Dashboard from "../app/Admin";
import { Brand } from "../app/Brand";
import NewBrand from "../app/Brand/NewBrand";
import { Category } from "../app/Category";
import NewCategory from "../app/Category/NewCategory";
import { Product } from "../app/Product";
import ProductDetail from "../app/Product/ProductDetail.";
import NewProduct from "../app/Product/NewProduct";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={ROUTES.ADMIN.LOGIN}
        element={
          <ProtectedLoginRouter>
            <Login />
          </ProtectedLoginRouter>
        }
      />
      <Route
        path={ROUTES.ADMIN.HOME}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <Dashboard />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.BRAND.HOME}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <Brand />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.BRAND.NEW_BRAND}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <NewBrand />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.CATEGORY.HOME}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <Category />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.CATEGORY.NEW_CATEGORY}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <NewCategory />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.PRODUCT.HOME}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <Product />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.PRODUCT.PRODUCT_DETAIL}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <ProductDetail />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      <Route
        path={ROUTES.PRODUCT.NEW_PRODUCT}
        element={
          <ProtectedRouter>
            <SidebarWithHeader>
              <NewProduct />
            </SidebarWithHeader>
          </ProtectedRouter>
        }
      />
      {/* <Route
      //for deploy run
        path="*"
        element={
          <ProtectedLoginRouter>
            <Login />
          </ProtectedLoginRouter>
        }
      /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
