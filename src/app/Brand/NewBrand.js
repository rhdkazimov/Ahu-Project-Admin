import { Button, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useService } from "../../API/Services";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";
import Swal from "sweetalert2";

const NewBrand = () => {
  const { brandService } = useService();
  const [newBrand, setNewBrand] = React.useState({});
  const navigate = useNavigate();

  const { mutateAsync: mutateNewBrand } = useMutation((body) =>
    brandService
      .createNewBrand(body)
      .then(() => {
        Swal.fire("Success", "Brend Elave Olundu", "success");
        navigate(ROUTES.BRAND.HOME);
      })
      .catch((err) => Swal.fire("Error", "Brend Yaradılmadı !", "error"))
  );

  const handleOnChangeInput = ({ target: { value, name } }) =>
    setNewBrand((previous) => ({ ...previous, [name]: value }));

  const handleSumbit = () => {
    mutateNewBrand(newBrand);
  };

  return (
    <>
      <FormLabel>Brend Adı</FormLabel>
      <Input
        type="text"
        name="name"
        onChange={(e) => handleOnChangeInput(e)}
        placeholder="Brend adı daxil edin"
      />
      <Button color={"blue"} onClick={() => handleSumbit()}>
        Yarat
      </Button>
    </>
  );
};

export default NewBrand;
