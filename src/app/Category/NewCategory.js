import { Button, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useService } from "../../API/Services";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";
import Swal from "sweetalert2";

const NewCategory = () => {
  const { categoryService } = useService();
  const [NewCategory, setNewCategory] = React.useState({});
  const navigate = useNavigate();

  const { mutateAsync: mutateNewCategory } = useMutation((body) =>
    categoryService
      .createNewCategory(body)
      .then(() => {
        Swal.fire("Success", "Kateqoriya Elave Olundu", "success");
        navigate(ROUTES.CATEGORY.HOME);
      })
      .catch((err) => Swal.fire("Error", "Kateqoriya Yaradılmadı !", "error"))
  );

  const handleOnChangeInput = ({ target: { value, name } }) =>
    setNewCategory((previous) => ({ ...previous, [name]: value }));

  const handleSumbit = () => {
    mutateNewCategory(NewCategory);
  };

  return (
    <>
      <FormLabel>Kateqoriya Adı</FormLabel>
      <Input
        type="text"
        name="name"
        onChange={(e) => handleOnChangeInput(e)}
        placeholder="Kateqoriya adı daxil edin"
      />
      <Button color={"blue"} onClick={() => handleSumbit()}>
        Yarat
      </Button>
    </>
  );
};

export default NewCategory;
