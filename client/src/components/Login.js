import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import logo from "../asset/logo.svg";
import { Navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ImSpinner4 } from "react-icons/im";

import { Formik, Field, ErrorMessage } from "formik";
import { useAuthContext } from "../Auth";
import axios from "axios";

function Login() {
  const alltheme = useTheme();

  const navigate = useNavigate();

  const [cookie, setcookies, removecookies] = useCookies();

  const secondary = alltheme.palette.secondary.main;
  const primary = alltheme.palette.primary.main;

  const { login, auth } = useAuthContext();

  const [error, seterror] = useState("");

  const [load, setload] = useState(false);

  const init = {
    username: "",
    password: "",
  };

  const valid = (e) => {
    let error = {};

    if (e.username === "") {
      error.username = "username required";
    }
    if (e.password === "") {
      error.password = "password required";
    }

    return error;
  };

  const submit = async (e) => {
    setload(true);

    const log = await login({ username: e.username, password: e.password });

    if (log.response && log.response.status == 400) {
      seterror(log.response.data);
    } else {
      setcookies("token", log);
      navigate(`/${e.username}`);
    }

    setload(false);
  };

  if (cookie.token) {
    return <Navigate to={`/deepan`} />;
  }

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          // justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <img src={logo} className="w-[20vh]" />
        <Box
          sx={{
            boxShadow: "5px 5px 14px -1px rgba(0,0,0,0.75)",
            "&:hover": {
              boxShadow: "1px 1px 5px -1px rgba(0,0,0,0.75)",
            },
          }}
          className="bg-slate-600 rounded-md"
          padding={3}
          width={{ xs: "90%", sm: "99%", md: "40%" }}
        >
          <Typography
            variant="h4"
            textAlign={"center"}
            color={"white"}
            fontSize={29}
          >
            Welcome back
          </Typography>
          <Divider color="white" sx={{ marginY: 1, marginX: 3 }}></Divider>

          <Formik onSubmit={submit} validate={valid} initialValues={init}>
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                {" "}
                <label className="self-start  text-sm md:text-md text-white">
                  <ErrorMessage
                    name="username"
                    render={(msg) => (
                      <h3 className="text-red-500 font-medium"> ({msg})</h3>
                    )}
                  />
                </label>
                <Field
                  name="username"
                  type="text"
                  className="w-full my-3  h-11 rounded-full px-3 outline-none"
                  placeholder="Username"
                />
                <label className="self-start  text-sm md:text-md text-white">
                  <ErrorMessage
                    name="password"
                    render={(msg) => (
                      <h3 className="text-red-500 font-medium"> ({msg})</h3>
                    )}
                  />
                </label>
                <Field
                  name="password"
                  type="password"
                  className="w-full my-3 h-11 rounded-full px-3 outline-none"
                  placeholder="Password"
                />
                {error && (
                  <h3 className="text-red-300 text-center font-medium">
                    {" "}
                    {error}
                  </h3>
                )}
                <Button
                  type="submit"
                  size="small"
                  disabled={load}
                  startIcon={
                    load ? <ImSpinner4 className="animate-spin" /> : <></>
                  }
                  sx={{
                    width: "100%",
                    backgroundColor: "rgba(229, 192, 62, 1)", // Background color
                    color: secondary, // Text color
                    borderRadius: "26px", // Border radius
                    padding: "10px 20px", // Padding
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Box shadow
                    transition: "background-color 0.3s", // Transition for hover effect
                    marginY: "10px",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "rgba(229, 192, 62, 88)", // Background color on hover
                    },
                  }}
                >
                  {" "}
                  Login
                </Button>
              </form>
            )}
          </Formik>

          <Box display={"flex"} alignItems={"center"}>
            <Divider
              color={"white"}
              sx={{ flexGrow: "10", marginX: "20px", marginY: "5px" }}
            />
            <Typography fontSize={"small"} color={"white"}>
              No have an Account
            </Typography>
            <Divider
              color={"white"}
              sx={{ flexGrow: "10", marginX: "20px", marginY: "5px" }}
            />
          </Box>
          <Button
            onClick={() => {
              navigate("/register");
            }}
            size="small"
            sx={{
              width: "100%",
              backgroundColor: "rgba(224, 241, 255, 1)", // Background color
              color: secondary, // Text color
              borderRadius: "26px", // Border radius
              padding: "10px 20px", // Padding
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Box shadow
              transition: "background-color 0.3s", // Transition for hover effect
              marginY: "10px",
              "&:hover": {
                backgroundColor: "rgba(224, 241, 255, 0.93)", // Background color on hover
              },
            }}
          >
            {" "}
            create your folio
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
