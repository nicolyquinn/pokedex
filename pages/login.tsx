import React, { useState } from "react";
import PageLayout from "@/sections/PageLayout";
import Login from "@/components/Login";
import Signup from "@/components/SignUp";
import { Stack, Switch, Typography } from "@mui/material";
import Image from "next/image";
import PokeballGif from "@/public/assets/pokeball-loader.gif";

const LoginPage = () => {
  const [loginPage, setLoginPage] = useState(true);

  const toggleLoginPage = () => {
    setLoginPage((prevState) => !prevState);
  };

  return (
    <PageLayout pageTitle="Login">
      <div className="content flex justify-center items-center bg-white bg-opacity-50 rounded-lg">
        <div className="w-fit bg-teal-50 py-10 px-12 rounded-lg flex flex-col justify-center items-center ">
          <Image src={PokeballGif} alt="pokeball gif" height={80} />
          <h2 className="text-teal-800 mt-4">POKEDEX</h2>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography className="text-sm">Sign Up</Typography>
            <Switch
              defaultChecked
              onClick={toggleLoginPage}
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography className="text-sm">Login</Typography>
          </Stack>
          {loginPage ? (
            <div className="flex flex-col justify-center items-center mt-4">
              <div>Already have an account</div>
              <Login />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center mt-4">
              <div>Sign Up with a new account</div>
              <Signup />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
