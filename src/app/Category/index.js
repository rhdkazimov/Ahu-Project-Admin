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

export const Category = () => {
  const { categoryService } = useService();
  const navigate = useNavigate();
  const [categorysData, setCategorysData] = React.useState([]);
  const queryClient = useQueryClient();

  const { isLoading } = useQuery(QueryKeys.getAllCategorys, () => {
    categoryService
      .getAllCategorys()
      .then(({ data }) => setCategorysData(data))
      .catch(() =>
        Swal.fire("Error", "Xahiş olunur daha sonra yoxlayın", "error")
      );
  });

  const { isLoading: isDeleteLoading, mutateAsync: mutateDelete } = useMutation(
    (id) => categoryService.deleteCategory(id),
    {
      onSuccess: () =>
        queryClient.invalidateQueries([QueryKeys.getAllCategorys]),
    }
  );

  const handleNavigation = () => navigate(ROUTES.CATEGORY.NEW_CATEGORY);

  const handleDeleteCategory = (id) => {
    Swal.fire({
      title: "Category silmək istədiyinizdən əminsiniz ?",
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
              title: "Category Silindi",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            return Swal.fire({
              icon: "error",
              title: "Xəta baş verdi",
              text: "Category silinmədi ! Daha sonra yenidən cəhd edin",
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
        Kateqorıyalar
      </Text>
      <Flex>
        <Button colorScheme="blue" onClick={() => handleNavigation()}>
          Category Yarat
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>N</Th>
              <Th>İd</Th>
              <Th>Adı</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categorysData.length > 0 ? (
              categorysData.map(({ id, name }) => {
                rowNum++;
                return (
                  <Tr key={id}>
                    <Td>{rowNum}</Td>
                    <Td>{id}</Td>
                    <Td>{name}</Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        onClick={() => handleDeleteCategory(id)}
                      >
                        Silmək
                      </Button>
                    </Td>
                  </Tr>
                );
              })
            ) : (
              <h1>Data Yoxdur . . .</h1>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
