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

const postDetails = {
  description: "",
};

export default function useForm(callBack, data) {
  const [loginValues, setLoginValues] = React.useState(loginInitialValues);
  const [registerValues, setRegisterValues] = React.useState(
    registerInitialValues
  );
  const [postValues, setPostValues] = React.useState(postDetails);
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

    setPostValues({
      ...postValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    callBack();
    handleFormClear();
  };

  const handleShowPassword = () => {
    setShow(!show);
  };

  const handleFormClear = () => {
    setPostValues(postDetails);
    setLoginValues(loginInitialValues);
    setRegisterValues(registerInitialValues);
  };
  return {
    handleInputChange,
    handleSubmit,
    loginValues,
    registerValues,
    handleShowPassword,
    handleFormClear,
    postValues,
    show,
  };
}
