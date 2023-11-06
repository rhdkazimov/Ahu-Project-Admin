import React from "react";
import { Button, Input } from "@chakra-ui/react";
import "./index.scss";
import { useService } from "../../API/Services";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";
import { useMutation } from "react-query";

const initialValue = {
  email: null,
  password: null,
};

export const Login = () => {
  const [loginData, setLoginData] = React.useState(initialValue);
  const [isError, setIsError] = React.useState(false);
  const { userAuthService } = useService();
  const navigate = useNavigate();

  const handleOnChangeInput = ({ target: { value, name } }) =>
    setLoginData((previous) => ({ ...previous, [name]: value }));

  const { mutateAsync: mutateAdminLogin } = useMutation((requestBody) => {
    userAuthService
      .loginUser(requestBody)
      .then(() => navigate(ROUTES.ADMIN.HOME))
      .catch(() => setIsError(true));
  });

  const handleSumbitLoginData = () => mutateAdminLogin(loginData);

  return (
    <div className="loginBox">
      <div className="inputArea">
        {isError && (
          <span className="error">Username or Password is wrong</span>
        )}
        <Input
          onChange={(e) => handleOnChangeInput(e)}
          name="email"
          placeholder="email"
          type="text"
        />
        <Input
          onChange={(e) => handleOnChangeInput(e)}
          name="password"
          placeholder="Password"
          type="password"
        />
        <Button onClick={handleSumbitLoginData}>Daxil Ol</Button>
      </div>
      <div className="imgArea">
        <img
          src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?w=2000"
          alt="img"
        />
      </div>
    </div>
  );
};
