import React from "react";
import { useService } from "../../API/Services";
import { useMutation, useQuery } from "react-query";
import { QueryKeys } from "../../consts";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";

const NewProduct = () => {
  const { categoryService, brandService, productService } = useService();
  const [categoryData, setCategoryData] = React.useState();
  const [brandData, setBrandData] = React.useState();
  const [productData, setProductData] = React.useState();
  const [productFile, setProductFile] = React.useState();
  const navigate = useNavigate();

  const { isLoading: isLoadingCategory } = useQuery(
    QueryKeys.getAllCategorys,
    () =>
      categoryService
        .getAllCategorys()
        .then(({ data }) => setCategoryData(data))
        .catch((err) => {
          Swal.fire("Error", "Daha sonra cehd edin !", "error");
          navigate(ROUTES.PRODUCT.HOME);
        })
  );
  const { isLoading: isLoadingBrand } = useQuery(QueryKeys.getAllBrands, () =>
    brandService
      .getAllBrands()
      .then(({ data }) => setBrandData(data))
      .catch((err) => {
        Swal.fire("Error", "Daha sonra cehd edin !", "error");
        navigate(ROUTES.PRODUCT.HOME);
      })
  );

  const handleOnChangeInput = ({ target: { value, name } }) =>
    setProductData((previous) => ({ ...previous, [name]: value }));

  const handleOnChangeFile = ({ target: { name, files } }) => {
    setProductFile((previous) => ({ ...previous, [name]: files }));
  };

  const handleOnSumbit = () => {
    mutateNewProduct(productData, productFile);
  };

  const { mutateAsync: mutateNewProduct } = useMutation((body, file) =>
    productService
      .createNewProduct(productData, productFile)
      .then(() => {
        Swal.fire("Mehsul", "Uğurla Yaradıldı", "success");
        navigate(ROUTES.PRODUCT.HOME);
      })
      .catch((err) => Swal.fire("Error", "Yeniden cehd edin", "error"))
  );

  if (isLoadingBrand || isLoadingCategory) return <Spinner />;

  return (
    <FormControl isRequired>
      <Text as="b" fontSize="3xl">
        Yeni Mehsul Yarat
      </Text>
      <FormLabel>Mehsul Adi</FormLabel>
      <Input onChange={(e) => handleOnChangeInput(e)} name="name" />
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box width={"45%"}>
          <FormLabel>Brend</FormLabel>
          <Select name="brandId" onChange={(e) => handleOnChangeInput(e)}>
            {brandData?.map(({ name, id }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Select>
        </Box>
        <Box width={"45%"}>
          <FormLabel>Kateqoriya</FormLabel>
          <Select name="categoryId" onChange={(e) => handleOnChangeInput(e)}>
            {categoryData?.map(({ name, id }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Select>
        </Box>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box width={"24%"}>
          <FormLabel>Satış Qiymeti</FormLabel>
          <Input
            onChange={(e) => handleOnChangeInput(e)}
            type="number"
            name="salePrice"
          />
        </Box>
        <Box width={"24%"}>
          <FormLabel>Alış Qiymeti</FormLabel>
          <Input
            onChange={(e) => handleOnChangeInput(e)}
            type="number"
            name="costPrice"
          />
        </Box>
        <Box width={"24%"}>
          <FormLabel>Endirim Faizi </FormLabel>
          <Input
            onChange={(e) => handleOnChangeInput(e)}
            type="number"
            name="discountPercent"
          />
        </Box>
        <Box width={"24%"}>
          <FormLabel>Stok sayı</FormLabel>
          <Input
            onChange={(e) => handleOnChangeInput(e)}
            type="number"
            name="stockCount"
          />
        </Box>
      </Box>
      <FormLabel>Açığlaması</FormLabel>
      <Input onChange={(e) => handleOnChangeInput(e)} name="description" />
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box width={"33%"}>
          <FormLabel>Ölçüsü</FormLabel>
          <Select name="size" onChange={(e) => handleOnChangeInput(e)}>
            <option value="Oversize">Oversize</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="2XL">2XL</option>
          </Select>
        </Box>
        <Box width={"33%"}>
          <FormLabel>Rəngi</FormLabel>
          <Select name="color" onChange={(e) => handleOnChangeInput(e)}>
            <option value="Colorful">Colorful</option>
            <option value="White">White</option>
            <option value="Orange">Orange</option>
            <option value="Yellow">Yellow</option>
            <option value="Green">Green</option>
            <option value="Gray">Gray</option>
            <option value="Black">Black</option>
            <option value="Purple">Purple</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
          </Select>
        </Box>
        <Box width={"33%"}>
          <FormLabel>İlkin Qiymətləndirilməsi </FormLabel>
          <Select name="rate" onChange={(e) => handleOnChangeInput(e)}>
            <option value="1">1★</option>
            <option value="2">2★★</option>
            <option value="3">3★★★</option>
            <option value="4">4★★★★</option>
            <option value="5">5★★★★★</option>
          </Select>
        </Box>
      </Box>
      <FormLabel>Başlıq Şəkili</FormLabel>
      <Input
        onChange={(e) => handleOnChangeFile(e)}
        type="file"
        name="posterImageFile"
      />
      <FormLabel>Başlıq Şəkili</FormLabel>
      <Input
        multiple
        onChange={(e) => handleOnChangeFile(e)}
        type="file"
        name="imageFiles"
      />
      <Button colorScheme="blue" onClick={handleOnSumbit}>
        Create
      </Button>
    </FormControl>
  );
};

export default NewProduct;
