import React from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { SignUpContainer } from "./sign-up-form.styles";
import { signUpSchema } from "../../lib/yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toastify } from "../../lib/toast";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async ({ name, email, password }) => {
    let result = await fetch("http://localhost:4000/api/v1/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.success) {
      localStorage.setItem("token", result.token);
      toastify("Welcome", "success");
      navigate("/");
      window.location.reload(true);
      reset();
    } else {
      toastify("User already exists ! Try to Log In", "error");
    }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Display Name"
          type="text"
          name="name"
          register={{ ...register("name") }}
          errorMessage={errors.name?.message}
        />

        <FormInput
          label="Email"
          type="text"
          name="email"
          register={{ ...register("email") }}
          errorMessage={errors.email?.message}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          register={{ ...register("password") }}
          errorMessage={errors.password?.message}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          register={{ ...register("confirmPassword") }}
          errorMessage={errors.confirmPassword?.message}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
