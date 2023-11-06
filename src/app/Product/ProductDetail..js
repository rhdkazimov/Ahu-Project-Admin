import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useService } from "../../API/Services";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import { ROUTES } from "../../Routes/consts";
import ImageCarousel from "./ImageCarusel";

const ProductDetail = () => {
  const location = useLocation();
  const [productData, setProductData] = React.useState();
  const navigate = useNavigate();
  const { productService } = useService();
  const {} = useQuery([], () =>
    productService
      .getProductById(location.state.id)
      .then(({ data }) => setProductData(data))
      .catch((err) => {
        Swal.fire("Error", "Daha sonra yeniden cehd edin", "error");
        navigate(ROUTES.PRODUCT.HOME);
      })
  );

  if (!productData) return "Loading";

  return (
    <>
      <h1 className="boxHeader">Product Detail</h1>
      <Link className="returnBack" to={ROUTES.PRODUCT.HOME}>
        {"< Siyahıya Qayıt"}
      </Link>
      <div className="d-flex">
        <ImageCarousel
          posterImage={productData.posterImage}
          images={productData.productImages}
        />
        <div className="productDetailInfo">
          <h1>Name : {productData.name}</h1>
          <span>
            Sale Price : <span>${productData.salePrice}</span>
          </span>
          <div className="productDetailInfo-texts">
            <p>Cost Price : ${productData.costPrice} </p>
            <p>Discount Percent : {productData.discountPercent}% </p>
            <p>Description : {productData.description}</p>
            <p>Brand : {productData.brand?.name}</p>
            <p>Category : {productData.category?.name}</p>
            <p>Color : {productData.color}</p>
            <p>Size : {productData.size}</p>
            <p>Rate : {productData.rate}</p>
            <p>Stock Count : {productData.stockCount}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
