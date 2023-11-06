import React from "react";
import { useService } from "../../API/Services";
import { useMutation, useQuery } from "react-query";
import { QueryKeys } from "../../consts";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";
import {
  Button,
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
      <FormLabel>Brend</FormLabel>
      <Select name="brandId" onChange={(e) => handleOnChangeInput(e)}>
        {brandData?.map(({ name, id }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </Select>
      <FormLabel>Kateqoriya</FormLabel>
      <Select name="categoryId" onChange={(e) => handleOnChangeInput(e)}>
        {categoryData?.map(({ name, id }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </Select>
      <FormLabel>Satış Qiymeti</FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        type="number"
        name="salePrice"
      />
      <FormLabel>Alış Qiymeti</FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        type="number"
        name="costPrice"
      />
      <FormLabel>Endirim Faizi </FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        type="number"
        name="discountPercent"
      />
      <FormLabel>Stok sayı</FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        type="number"
        name="stockCount"
      />
      <FormLabel>Açığlaması</FormLabel>
      <Input onChange={(e) => handleOnChangeInput(e)} name="description" />
      <FormLabel>Ölçüsü</FormLabel>
      <Input onChange={(e) => handleOnChangeInput(e)} name="size" />
      <FormLabel>Rəngi</FormLabel>
      <Input onChange={(e) => handleOnChangeInput(e)} name="color" />
      <FormLabel>İlkin Qiymətləndirilməsi </FormLabel>
      <Input
        onChange={(e) => handleOnChangeInput(e)}
        type="number"
        name="rate"
      />
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
