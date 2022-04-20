import React from "react";

const loginInitialValues = {
  username: "",
  password: "",
};

const registerInitialValues = {
  email: "",
  username: "",
  password: "",
};

export default function useForm(callBack) {
  const [loginValues, setLoginValues] = React.useState(loginInitialValues);
  const [registerValues, setRegisterValues] = React.useState(
    registerInitialValues
  );
  const [show, setShow] = React.useState(false);

  const handleInputChange = (e) => {
    setLoginValues({
      ...loginValues,
      [e.target.name]: e.target.value,
    });

    setRegisterValues({
      ...registerValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    callBack();
  };

  const handleShowPassword = () => {
    setShow(!show);
  };
  return {
    handleInputChange,
    handleSubmit,
    loginValues,
    registerValues,
    handleShowPassword,
    show,
  };
}
