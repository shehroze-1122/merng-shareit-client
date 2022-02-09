import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import gql from "graphql-tag";

import { authContext } from "../context/AuthContextProvider";
import Error from "../components/Error";

const LOGIN_USER = gql`
  mutation loginUser($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      id
      username
      createdAt
      email
      token
    }
  }
`;
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const context = useContext(authContext);

  const [error, setError] = useState({});

  const navigate = useNavigate();

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update: (_, { data: { login: userData } }) => {
      context.login(userData);
      setError({});
      navigate("/");
    },
    onError: (err) => {
      setError(err.graphQLErrors[0].extensions.errors);
    },
  });

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    loginUser({
      variables: {
        loginInput: formData,
      },
    });
  };

  return (
    <Form
      style={{ maxWidth: "400px", margin: "auto", marginTop: "80px" }}
      loading={loading}
    >
      <h1
        style={{ textAlign: "center", fontSize: "2.5rem", margin: "20px 0px" }}
      >
        LOGIN
      </h1>
      <Form.Input
        fluid
        label="Username"
        name="username"
        placeholder="Enter username"
        type="text"
        onChange={onChange}
        value={formData.username}
        error={error.username ? true : false}
        size="large"
        className="input-field"
      />

      <Form.Input
        fluid
        label="Password"
        name="password"
        placeholder="Enter password"
        type="password"
        onChange={onChange}
        value={formData.password}
        error={error.password ? true : false}
        size="large"
        className="input-field"
      />

      <Button
        primary
        type="submit"
        content="Submit"
        onClick={onSubmit}
        size="large"
        className="submit-button"
      />
      {Object.keys(error).length ? <Error error={error} /> : null}
    </Form>
  );
};

export default Login;
