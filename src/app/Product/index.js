import React from "react";
import { useService } from "../../API/Services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { QueryKeys } from "../../consts";
import Swal from "sweetalert2";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";

export const Product = () => {
  const { productService } = useService();
  const navigate = useNavigate();
  const [productsData, setProductsData] = React.useState([]);
  const queryClient = useQueryClient();

  const { isLoading } = useQuery(QueryKeys.getAllProducts, () => {
    productService
      .getAllProducts()
      .then(({ data }) => setProductsData(data))
      .catch(() =>
        Swal.fire("Error", "Xahiş olunur daha sonra yoxlayın", "error")
      );
  });

  const { isLoading: isDeleteLoading, mutateAsync: mutateDelete } = useMutation(
    (id) => productService.deleteProduct(id),
    {
      onSuccess: () =>
        queryClient.invalidateQueries([QueryKeys.getAllProducts]),
    }
  );

  const handleNavigation = () => navigate(ROUTES.PRODUCT.NEW_PRODUCT);
  const handleProductDetail = (id) =>
    navigate(ROUTES.PRODUCT.PRODUCT_DETAIL, { state: { id } });

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Mehsulu silmək istədiyinizdən əminsiniz ?",
      text: "Dəyişikliklər yaddaşda saxlanılmayacağ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hə,əminəm !",
      cancelButtonText: "Ləğv et",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateDelete(id)
          .then(() => {
            return Swal.fire({
              position: "center",
              icon: "success",
              title: "Mehsul Silindi",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            return Swal.fire({
              icon: "error",
              title: "Xəta baş verdi",
              text: "Mehsul silinmədi ! Daha sonra yenidən cəhd edin",
            });
          });
      } else return null;
    });
  };

  if (isLoading || isDeleteLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  let rowNum = 0;

  return (
    <div>
      <Text as="b" fontSize="3xl">
        Mehsullar
      </Text>
      <Flex>
        <Button colorScheme="blue" onClick={() => handleNavigation()}>
          Mehsul Yarat
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>N</Th>
              <Th>İd</Th>
              <Th>Adı</Th>
              <Th>Anbar Sayı</Th>
              <Th>Qiymət</Th>
            </Tr>
          </Thead>
          <Tbody>
            {productsData.length > 0 ? (
              productsData.map(
                ({ id, name, stockCount, salePrice, discountPercent }) => {
                  rowNum++;
                  return (
                    <Tr key={id}>
                      <Td>{rowNum}</Td>
                      <Td>{id}</Td>
                      <Td>{name}</Td>
                      <Td>{stockCount}</Td>
                      <Td>
                        {discountPercent > 0
                          ? salePrice - (salePrice * discountPercent) / 100
                          : salePrice}
                      </Td>
                      <Td>
                        <Button
                          colorScheme="green"
                          marginRight={"2"}
                          onClick={() => handleProductDetail(id)}
                        >
                          Detallı Baxış
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => handleDeleteProduct(id)}
                        >
                          Silmək
                        </Button>
                      </Td>
                    </Tr>
                  );
                }
              )
            ) : (
              <h1>Data Yoxdur . . .</h1>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
