import {
  Autocomplete,
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import React, { useState } from "react";
import logo from "../asset/white_logo.svg";
import ProfilePic from "../asset/ProfilePic.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IoCaretForwardSharp, IoCaretBack } from "react-icons/io5";
import { MdArrowBackIos } from "react-icons/md";
import { AddSkill, course, TamilNaduCity, IndianState } from "./rawData";
import { useNavigate } from "react-router-dom";
import { ImSpinner10 } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import axios from "axios";
import { useAuthContext } from "../Auth";
import { ImSpinner4 } from "react-icons/im";
import { useCookies } from "react-cookie";

function Register() {
  const [fromCount, setfromCount] = useState(0);
  const [skill, setskill] = useState({ skill: "", exp: "select experience" });
  const [education, seteducation] = useState({ course: null, college: null });
  const [skillerror, setskillerror] = useState("");
  const [usernameAPI, setusernameAPI] = useState(null);
  const [checkuserexist, setcheckuserexist] = useState({
    load: false,
    sucMsg: null,
    errMsg: null,
  });
  const [error, seterror] = useState(null);

  const [load, setload] = useState(false);

  const { resigter, login } = useAuthContext();

  const navigate = useNavigate();
  const [cookie, setcookies, removecookies] = useCookies();

  const experienceLevels = [
    "select experience",
    "Beginner",
    "Intermediate",
    "Advanced",
  ];

  const usernameValid = async (e) => {
    if (usernameAPI) {
      usernameAPI.cancel();
    }

    const token = axios.CancelToken.source();

    setcheckuserexist({ ...checkuserexist, load: true });

    const { name, value } = e.target;

    try {
      const userNameResult = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/userexist`,
        { username: value }
      );
      console.log(userNameResult);

      if (userNameResult.status === 200) {
        setcheckuserexist({
          load: false,
          sucMsg: userNameResult.data,
          errMsg: null,
        });
        return userNameResult.data;
      }
    } catch (error) {
      setcheckuserexist({
        load: false,
        sucMsg: null,
        errMsg: `${error.response.data} - ${value}` || "Somthing Wrong",
      });
      return error;
    }
  };

  const initvalue = {
    name: "",
    email: "",
    username: "",
    password: "",
    cPassword: "",
    about: "",
    skill: [],
    education: [],
    state: "",
    city: "",
    exp: "select experience",
  };

  const valid = async (e) => {
    let error = {};

    if (e.name === "") {
      error.name = "Name Required";
      setfromCount(0);
    }

    if (e.username == "") {
      error.username = "username Required";
      setfromCount(0);
    }

    if (e.email === "") {
      error.email = "email Required";
      setfromCount(0);
    }
    if (e.city === "") {
      error.city = "Enter City";
      setfromCount(0);
    }
    if (e.state === "") {
      error.state = "State Required";
      setfromCount(0);
    }
    if (e.password === "") {
      error.password = "Password is required";
      setfromCount(0);
    } else if (e.password.length < 8) {
      error.password = "Password must be at least 8 characters long";
      setfromCount(0);
    } else if (
      !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*()_+!])[A-Za-z\d@#$%^&*()_+!]{8,}/.test(
        e.password
      )
    ) {
      error.password =
        "Password must be strong (include uppercase, lowercase, digits, and special characters)";
      setfromCount(0);
    }
    if (e.cPassword === "") {
      error.cPassword = "Confirm Password is required";
      setfromCount(0);
    } else if (e.password !== e.cPassword) {
      error.cPassword = "Passwords do not match";
      setfromCount(0);
    }
    if (e.about === "") error.about = "Required about section";

    return error;
  };

  const sumbit = async (e) => {
    try {
      setload(true);

      const data = {
        email: e.email,
        name: e.name,
        username: e.username.toLowerCase(),
        password: e.password,
        about: e.about,
        address: { state: e.state, city: e.city },
      };

      console.log(e);

      if (e.skill.length > 0) {
        data.skill = e.skill;
      }
      if (e.education.length > 0) {
        data.education = e.education;
      }
  
      const result = await resigter(data);
      if (result.status == 200) {
        const log = await login({ username: e.username, password: e.password });

        if (log.response && log.response.status == 400) {
          seterror(log.response.data);
        } else {
          setcookies("token", log);
          navigate(`/${e.username.toLowerCase()}`);
        }
      } else {
        console.log(result);
        seterror(result.response.data || "somthing data");
        setload(false);
      }
      console.log(result);
    } catch (errror) {
      console.log(errror);
      setload(false);
    }
  };

  return (
    <div className="w-full min-h-[100vh] bg-slate-300 flex flex-col justify-center items-center">
      <Formik initialValues={initvalue} validate={valid} onSubmit={sumbit}>
        {({
          setFieldValue,
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldError,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="p-4 bg-green-500 rounded-md w-[90%] md:w-2/6 flex flex-col  items-center"
          >
            <img src={logo} className="w-16" alt="" />
            <h3
              onClick={() => {
                fromCount > 0 && setfromCount((pre) => pre - 1);
              }}
              className="self-start text-sm md:text-md bg-green-200 px-2 rounded mb-3 text-blue-900 flex items-center cursor-pointer "
            >
              {" "}
              {fromCount > 0 && (
                <>
                  <IoCaretBack /> back
                </>
              )}
            </h3>
            {fromCount == 0 && (
              <>
                <label className="self-start text-sm flex md:text-md text-white">
                  {" "}
                  Enter your Fullname *
                  <ErrorMessage
                    name="name"
                    render={(msg) => (
                      <h3 className="text-red-500 font-medium"> ({msg})</h3>
                    )}
                  />
                </label>
                <Field
                  type="text"
                  className=" h-12 outline-none w-full mb-3 rounded px-2"
                  placeholder="Enter Name"
                  name="name"
                />

                <label className="self-start text-sm flex md:text-md text-white">
                  {" "}
                  create a new username *
                  <ErrorMessage
                    name="username"
                    render={(msg) => (
                      <h3 className="text-red-500 mx-4 font-medium">
                        {" "}
                        ({msg})
                      </h3>
                    )}
                  />
                  {checkuserexist.sucMsg && (
                    <h3 className="text-yellow-100 mx-3 flex items-center">
                      User Name Available "{checkuserexist.sucMsg}" <TiTick />{" "}
                    </h3>
                  )}
                  {checkuserexist.errMsg && (
                    <h3 className="text-red-500 font-medium">
                      {" "}
                      ({checkuserexist.errMsg})
                    </h3>
                  )}
                </label>
                <div className="w-full relative flexitems-center">
                  <Field
                    onChange={(e) => {
                      handleChange(e);
                      usernameValid(e);
                    }}
                    type="text"
                    className=" h-12 outline-none w-full rounded px-2"
                    placeholder="Enter Name"
                    onBlur={handleBlur}
                    name="username"
                  />
                  {checkuserexist.load && (
                    <ImSpinner10 className=" absolute top-1 right-0 animate-spin self-start m-2 font-bold" />
                  )}
                </div>

                <label className="self-start flex text-sm mt-3   md:text-md text-white">
                  Enter your Valid Email *
                  <ErrorMessage
                    name="email"
                    render={(msg) => (
                      <h3 className="text-red-500 font-medium"> ({msg})</h3>
                    )}
                  />
                </label>
                <Field
                  type="text"
                  className=" h-12 outline-none w-full mb-3 rounded px-2"
                  placeholder="Enter Email"
                  name="email"
                />
                <label className="self-start  text-sm md:text-md text-white">
                  Create Unique password *{" "}
                  <ErrorMessage
                    name="password"
                    render={(msg) => (
                      <h3 className="text-red-500 text-sm font-medium ">
                        {" "}
                        ({msg})
                      </h3>
                    )}
                  />
                </label>
                <Field
                  type="password"
                  className=" h-12 outline-none w-full mb-3 rounded px-2"
                  placeholder="create Password"
                  name="password"
                />
                <label className="self-start  text-sm md:text-md text-white">
                  Conform you passoword *
                  <ErrorMessage
                    name="cPassword"
                    render={(msg) => (
                      <h3 className="text-red-500 font-medium"> ({msg})</h3>
                    )}
                  />
                </label>
                <Field
                  type="text"
                  className=" h-12 outline-none w-full mb-3 rounded px-2"
                  placeholder="conform Password"
                  name="cPassword"
                />
                <label className="self-start  text-sm md:text-md text-white">
                  Address
                  <ErrorMessage
                    name="state"
                    render={(msg) => (
                      <h3 className="text-red-500 font-medium"> ({msg})</h3>
                    )}
                  />
                </label>

                <Field
                  name="state"
                  component={({ field }) => (
                    <Autocomplete
                      freeSolo
                      {...field}
                      value={values.state}
                      onChange={(_, newValue) => {
                        setFieldValue("state", newValue);
                      }}
                      defaultValue={IndianState[22]}
                      id="free-solo-4-demo"
                      fullWidth
                      className="bg-white  mb-3 rounded-md"
                      options={[
                        ...new Set(IndianState.map((option) => option)),
                      ]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select State"
                          InputProps={{
                            ...params.InputProps,
                            type: "text",
                          }}
                        />
                      )}
                    />
                  )}
                />

                <label className="self-start  text-sm md:text-md text-white">
                  <ErrorMessage
                    name="city"
                    render={(msg) => (
                      <h3 className="text-red-500 font-medium"> ({msg})</h3>
                    )}
                  />
                </label>

                <Field
                  name="city"
                  component={({ field }) => (
                    <Autocomplete
                      freeSolo
                      {...field}
                      value={values.city}
                      onChange={(_, newValue) => {
                        setFieldValue("city", newValue);
                      }}
                      defaultValue={IndianState[22]}
                      id="free-solo-5-demo"
                      fullWidth
                      className="bg-white  mb-3 rounded-md"
                      options={[
                        ...new Set(TamilNaduCity.map((option) => option)),
                      ]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select City"
                          InputProps={{
                            ...params.InputProps,
                            type: "text",
                          }}
                        />
                      )}
                    />
                  )}
                />
              </>
            )}
            {fromCount == 1 && (
              <>
                <label className="self-start  text-sm md:text-md text-white">
                  About your self
                  <ErrorMessage
                    name="about"
                    render={(msg) => (
                      <h3 className="text-red-500 font-medium"> ({msg})</h3>
                    )}
                  />
                </label>
                <Field
                  type="text"
                  className=" h-20 max-h-32 outline-none w-full mb-3 rounded px-2"
                  placeholder="Tell about your self"
                  name="about"
                  as="textarea"
                />

                <label className="self-start text-sm md:text-md text-white">
                  Add your skill's and experience
                  {skillerror && (
                    <span className="text-red-800">({skillerror})</span>
                  )}
                </label>

                <Field
                  name="skill"
                  component={({ field, form }) => (
                    <Autocomplete
                      freeSolo
                      {...field}
                      id="free-solo-2-demo"
                      onChange={(_, newValue) => {
                        setskill({ ...skill, skill: newValue });
                      }}
                      fullWidth
                      className="bg-white rounded-t-md"
                      value={skill.skill}
                      options={[
                        ...new Set(AddSkill.map((option) => option.title)),
                      ]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Add skill"
                          InputProps={{
                            ...params.InputProps,
                            type: "text",
                          }}
                        />
                      )}
                    />
                  )}
                />

                <Select
                  name="exp"
                  placeholder="select"
                  value={skill.exp}
                  className="bg-white"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    setskill({ ...skill, exp: e.target.value });
                  }}
                >
                  {experienceLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>

                <button
                  onClick={() => {
                    if (skill.skill === "") {
                      setskillerror("skill required");
                    } else if (
                      skill.exp === "" ||
                      skill.exp === "select experience"
                    ) {
                      setskillerror("experience required");
                    } else {
                      setskillerror("");
                      values.skill.push(skill);
                      setskill({ skill: "", exp: "select experience" });
                    }
                  }}
                  type="button"
                  className="w-full mb-3 rounded-b-md bg-[#008594] h-12 text-white"
                >
                  Add skill
                </button>

                {values.skill.length != 0 && (
                  <div className="w-full flex flex-wrap gap-4 bg-white p-5 mt-3 rounded-md">
                    {values.skill.map((skill, index) => (
                      <Chip
                        onDelete={() => {
                          let updateskill = values.skill.filter(
                            (item, insideIndex) => index !== insideIndex
                          );
                          setFieldValue("skill", updateskill);
                        }}
                        key={index}
                        label={skill.skill}
                        className={`m-2 `}
                        sx={
                          skill.exp === "Beginner"
                            ? { backgroundColor: "rgba(0, 255, 0, 0.4)" } // Green for Beginner
                            : skill.exp === "Intermediate"
                            ? { backgroundColor: "rgba(255, 255, 0, 0.4)" } // Yellow for Intermediate
                            : skill.exp === "Advanced"
                            ? { backgroundColor: "rgba(255, 0, 0, 0.4)" } // Red for Advanced
                            : null // No background color for other cases
                        }
                      />
                    ))}
                  </div>
                )}

                <label className="self-start text-sm md:text-md text-white">
                  Add your Course
                </label>

                <Field
                  name="education"
                  component={({ field, form }) => (
                    <Autocomplete
                      freeSolo
                      {...field}
                      id="free-solo-3-demo"
                      onChange={(_, newValue) => {
                        seteducation({ ...education, course: newValue });
                      }}
                      fullWidth
                      className="bg-white   rounded-t-md"
                      value={education.course}
                      options={[
                        ...new Set(course.map((option) => option.title)),
                      ]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Add your education like 'computer science'"
                          InputProps={{
                            ...params.InputProps,
                            type: "text",
                          }}
                        />
                      )}
                    />
                  )}
                />

                <input
                  name="education"
                  placeholder="Add your college or school or University"
                  value={education.college}
                  className="bg-white w-full h-12 rounded-b-md px-3 outline-none"
                  onChange={(e) => {
                    seteducation({ ...education, college: e.target.value });
                  }}
                />

                <button
                  onClick={() => {
                    if (education.course === "") {
                      // setskillerror("skill required");
                    } else if (education.college === "") {
                      // setskillerror("experience required");
                    } else {
                      // setskillerror("");
                      values.education.push(education);
                      // setskill({ skill: "", exp: "select experience" });
                      seteducation({ course: "", college: "" });
                    }
                  }}
                  type="button"
                  className="w-full mb-3 rounded-b-md bg-[#008594] h-12 text-white"
                >
                  Add skill
                </button>

                {values.education.length != 0 && (
                  <div className="w-full flex flex-wrap gap-4 bg-white p-5 mt-3 rounded-md">
                    {values.education.map((edu, index) => (
                      <Chip
                        onDelete={() => {
                          let updateskill = values.education.filter(
                            (item, insideIndex) => index !== insideIndex
                          );
                          setFieldValue("education", updateskill);
                        }}
                        key={index}
                        sx={{ paddingY: 3 }}
                        label={
                          <div className="flex-col text-center">
                            <h3 className=" font-semibold">{edu.course}</h3>{" "}
                            <h3 className="text-[10px]">{edu.college}</h3>
                          </div>
                        }
                        className={` `}
                      />
                    ))}
                  </div>
                )}
              </>
            )}

            {error && <h3 className="text-red-500 font-medium"> {error}</h3>}
            <div className=" flex justify-between w-full">
              {fromCount < 1 && (
                <button
                  onClick={() => {
                    fromCount < 1 && setfromCount((pre) => pre + 1);
                  }}
                  className="   w-full bg-blue-500 text-white h-9 rounded"
                >
                  {" "}
                  Next
                </button>
              )}

              {fromCount > 0 && (
                <Button
                  startIcon={
                    load ? <ImSpinner4 className="animate-spin" /> : <></>
                  }
                  disabled={load}
                  sx={{
                    width: "100%",
                    backgroundColor: "#2F4858", // Background color
                    color: "white", // Text color

                    padding: "10px 20px", // Padding
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Box shadow
                    transition: "background-color 0.3s", // Transition for hover effect
                    marginY: "10px",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#2F4858", // Background color on hover
                    },
                  }}
                  type="submit"
                  className=" shadow-md  w-full text-white h-12 rounded"
                >
                  {" "}
                  Create
                </Button>
              )}
            </div>

            <div className="flex flex-col items-center">
              <h3>or </h3>
              <h3>
                Already have an Account{" "}
                <span
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="underline text-blue-900 cursor-pointer"
                >
                  login
                </span>{" "}
              </h3>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
