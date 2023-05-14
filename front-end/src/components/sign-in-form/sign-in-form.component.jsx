import React from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { toastify } from "../../lib/toast";
import { logInSchema } from "../../lib/yup";

import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";

const SignInForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(logInSchema),
  });

  const onSubmit = async ({ email, password }) => {
    console.log({ email, password });
    let result = await fetch("http://localhost:4000/api/v1/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.success) {
      toastify(result.message, "success");
      navigate("/");
      reset();
    } else {
      toastify("Incorrect email or password.", "error");
    }
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Email"
          type="text"
          register={{ ...register("email") }}
          errorMessage={errors.email?.message}
          name="email"
        />

        <FormInput
          label="Password"
          type="password"
          register={{ ...register("password") }}
          errorMessage={errors.password?.message}
          name="password"
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
