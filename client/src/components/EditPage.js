import {
  AppBar,
  Autocomplete,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Select,
  Slide,
  TextField,
  Toolbar,
  Typography,
  colors,
} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { ErrorMessage, Field, Formik } from "formik";
import React, { useState } from "react";

import { AddSkill, course, TamilNaduCity, IndianState } from "./rawData";

import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useTheme } from "@emotion/react";
import { useAuthContext } from "../Auth";
import axios from "axios";
import { useCookies } from "react-cookie";

function EditPage({ open, close }) {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const alltheme = useTheme();

  const { auth, setauth,setuserData } = useAuthContext();

  const isDarkMode = alltheme.palette.mode === "dark";
  const changeColor = isDarkMode ? "white" : "black";
  const changeBgColor = isDarkMode ? "#2A2A2A" : "rgba(244, 244, 244, 1)";

  const experienceLevels = [
    "select experience",
    "Beginner",
    "Intermediate",
    "Advanced",
  ];

  const experienceYear = [
    "select experience",
    "1 Year",
    "2-4 Year",
    "4-8 Year",
    "9-10 year",
    "10+ year",
  ];

  const [education, setEducation] = useState({ course: "", college: "" });
  const [expericence, setExperince] = useState({
    roll: "",
    company: "",
    expYear: "select experience",
    details: "",
  });
  const [skill, setskill] = useState({
    skill: "",
    exp: "select experience",
    details: "",
  });

  const [cookie, setCookie, removeCookie] = useCookies();

  const [discardOpen, setdiscardOpen] = useState(false);

  const [load, setload] = useState(false);

  const init = {
    name: auth.data.name || "",
    emoji: "",
    state: auth.data.address.state || "",
    city: auth.data.address.city || "",
    about: auth.data.about || "",

    contact: [],
    education: auth.data.education || [],
    skill: auth.data.skill || [],
    experience: auth.data.expericence || [],
    exp: "",
  };

  const valid = (e) => {
    let error = {};

    if (e.name === "") {
      error.name = "Name Required";
    }

    if (e.about === "") {
      error.about = "About Required";
    }

    if (e.state == null) {
      error.state = "state Requires";
    }
    if (e.city == null) {
      error.city = "City Requires";
    }

    return error;
  };

  const submit = async (e) => {
   
    const data = {
      name: e.name,
      about: e.about,
      education: e.education,
      experience: e.experience,
      skill: e.skill,
      address: { state: e.state, city: e.city },
    };

    try {
      setload(true);
      const update = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/updateuser`,
        data,
        { headers: { token: cookie.token } }
      );

      if (update.status === 200) {
        setauth({...auth,data:update.data})
        setuserData(update.data)
        close(false)
      }
      setload(false);
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => {
        close(false);
      }}

      //   TransitionComponent={Transition}
    >
      <Dialog
        open={discardOpen}
        onClose={() => {
          setdiscardOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Will closing it leave your content unchanged?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to close it to keep your content unchanged
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: isDarkMode ? "white" : "blue" }}
            onClick={() => {
              setdiscardOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{ color: isDarkMode ? "white" : "red" }}
            onClick={() => {
              close(false);
            }}
            autoFocus
          >
            Discard
          </Button>
        </DialogActions>
      </Dialog>

      
      <div className="w-full montserrat-font p-3 ">
        <Formik initialValues={init} validate={valid} onSubmit={submit}>
          {({
            values,
            handleSubmit,
            handleChange,
            setFieldValue,
            handleBlur,
          }) => (

<>
  
<AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              setdiscardOpen(true);
            }}
            aria-label="close"
          >
            <AiOutlineClose />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Edit Information
          </Typography>
          <Button
            disabled={load}
            autoFocus
            color="inherit"
            onClick={handleSubmit}
          > {load && <AiOutlineLoading3Quarters className="animate-spin mx-2"/>}
            save
          </Button>
        </Toolbar>
      </AppBar>

            <form
              onSubmit={handleSubmit}
              style={{
                backgroundColor: changeBgColor,
                boxShadow: "0px 1px 2px 1px rgba(0, 0, 0, 0.25)",
                color: changeColor,
              }}
              className="flex flex-col justify-center  rounded-md p-2"
            >
              <div className="grid gap-3 grid-cols-12">
                <div className="col-span-12  lg:col-span-6">
                  <label className="self-start  text-sm md:text-md ">
                    Name
                    <ErrorMessage
                      name="name"
                      render={(msg) => (
                        <h3 className="text-red-500 font-medium"> ({msg})</h3>
                      )}
                    />
                  </label>
                  <div className="flex flex-grow">
                    <Field
                      name="name"
                      className="flex-grow text-black rounded-sm h-9 px-2 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        console.log("emoji");
                      }}
                      name="emoji"
                      className="px-4  ml-1 rounded-sm bg-white"
                    >
                      ⚡
                    </button>
                  </div>

                  {/* About */}
                  <div className="my-3">
                    <label className=" self-start  text-sm md:text-md ">
                      About
                      <ErrorMessage
                        name="about"
                        onChange={handleChange}
                        render={(msg) => (
                          <h3 className="text-red-500 font-medium"> ({msg})</h3>
                        )}
                      />
                    </label>
                    <Field
                      as="textarea"
                      placeholder="About your self"
                      name="about"
                      className="h-28 text-black p-3 text-sm max-h-52 outline-none w-full rounded-sm "
                    />
                  </div>

                  {/* Address */}

                  <div>
                    <label className="self-start  text-sm md:text-md ">
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
                          id="free-solo-4-demo"
                          fullWidth
                          className=" mb-3 rounded-sm outline-none"
                          style={{ color: "black" }}
                          options={[
                            ...new Set(IndianState.map((option) => option)),
                          ]}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              sx={{
                                bgcolor: !isDarkMode && "white",
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    border: "none", // Remove the outline border
                                  },
                                },
                              }}
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

                    <label className="self-start  text-sm md:text-md ">
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
                          id="free-solo-5-demo"
                          fullWidth
                          options={[
                            ...new Set(TamilNaduCity.map((option) => option)),
                          ]}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select City"
                              sx={{
                                bgcolor: !isDarkMode && "white",
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    border: "none", // Remove the outline border
                                  },
                                },
                              }}
                              InputProps={{
                                ...params.InputProps,
                                type: "text",
                              }}
                            />
                          )}
                        />
                      )}
                    />
                  </div>
                  {/* Education */}

                  <div>
                    <label className="self-start text-sm md:text-md ">
                      Education
                    </label>

                    {values.education.length != 0 && (
                      <div className="w-full flex flex-wrap gap-4 bg-white mb-2 p-5 text-center text-black rounded-t-md">
                        <h3 className="text-center w-full text-xl">
                          Education
                        </h3>
                        <Divider
                          className="w-full"
                          style={{ color: "black" }}
                        />
                        {values.education.map((edu, index) => (
                          <div
                          key={index}
                            style={{
                              boxShadow: " 0px 1px 2px 1px rgba(0, 0, 0, 0.25)",
                            }}
                            className="w-full justify-center relative gap-2 p-2 flex flex-col text-black  rounded-sm bg-gray-100 text-center"
                          >
                            <h3 className=" font-semibold text-[20px]">
                              {edu.course}
                            </h3>{" "}
                            <h3 className="text-[13px] uppercase">
                              {edu.college}
                            </h3>
                            <AiOutlineClose
                              onClick={() => {
                                let updateEducation = values.education.filter(
                                  (item, insideIndex) => index !== insideIndex
                                );
                                setFieldValue("education", updateEducation);
                              }}
                              className="absolute cursor-pointer  right-3"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <Field
                      name="education"
                      placeholder="Add your course Name  ex :'computer science'"
                      value={education.course}
                      className="bg-white text-black border-b border-t montserrat-font rounded-sm  w-full h-12 py-7 px-3 outline-none"
                      onChange={(e) => {
                        setEducation((pre) => ({
                          ...pre,
                          course: e.target.value,
                        }));
                      }}
                    />

                    <Field
                      name="education"
                      placeholder=" University name and Passed Out year"
                      value={education.college}
                      className="bg-white text-black w-full h-12 rounded-b-sm px-3 outline-none"
                      onChange={(e) => {
                        setEducation((pre) => ({
                          ...pre,
                          college: e.target.value,
                        }));
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
                          setEducation({ course: "", college: "" });
                        }
                      }}
                      type="button"
                      className="w-full mb-1 rounded-b-md bg-[#008594] text-white h-12 "
                    >
                      Add Course
                    </button>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-6">
                  {/* Skill */}
                  <div>
                    <label className="self-start text-sm md:text-md ">
                      Add your Skill
                    </label>

                    {values.skill.length !== 0 && (
                      <div className="w-full flex flex-wrap gap-4 text-black bg-white p-5 mb-3 rounded-md">
                        <h3 className="text-center w-full text-xl">Skill's</h3>
                        <Divider
                          className="w-full"
                          style={{ color: "black" }}
                        />
                        {values.skill.map((item, index) => (
                          <div
                            style={{
                              boxShadow: " 0px 1px 2px 1px rgba(0, 0, 0, 0.25)",
                            }}
                            key={index}
                            className={`m-2 relative flex flex-col justify-center bg-gray-200 w-full text-black p-3 rounded-sm `}
                          >
                            <h3 className="text-[19px] font-bold">
                              {item.skill}
                            </h3>
                            <h3 className="text-[13px] font-semibold">
                              {item.exp}
                            </h3>
                            <h3 className="text-[10px] ">{item.details}</h3>

                            <AiOutlineClose
                              onClick={() => {
                                let updateskill = values.skill.filter(
                                  (item, insideIndex) => index !== insideIndex
                                );
                                setFieldValue("skill", updateskill);
                              }}
                              className="absolute right-3 cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <Field
                      name="skill"
                      placeholder="Add your Skill"
                      value={skill.skill}
                      className="bg-white text-black border-b w-full h-12 rounded-t-md px-3 outline-none"
                      onChange={(e) => {
                        setskill((pre) => ({
                          ...pre,
                          skill: e.target.value,
                        }));
                      }}
                    />

                    <Select
                      name="exp"
                      placeholder="select"
                      value={skill.exp}
                      style={{ color: "black", backgroundColor: "white" }}
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

                    <Field
                      name="skill"
                      as="textarea"
                      placeholder="About your skill (optional)"
                      value={skill.details}
                      className="bg-white text-black w-full  h-16 max-h-32 py-4 rounded-sm px-3 outline-none"
                      onChange={(e) => {
                        setskill((pre) => ({
                          ...pre,
                          details: e.target.value,
                        }));
                      }}
                    />

                    <button
                      onClick={() => {
                        if (skill.skill === "") {
                          // setskillerror("skill required");
                        } else if (
                          skill.exp === "" ||
                          skill.exp === "select experience"
                        ) {
                          // setskillerror("experience required");
                        } else {
                          // setskillerror("");
                          values.skill.push(skill);
                          setskill({
                            skill: "",
                            exp: "select experience",
                            details: "",
                          });
                        }
                      }}
                      type="button"
                      className="w-full mb-3 rounded-b-md text-white bg-[#008594] h-12 "
                    >
                      Add skill
                    </button>
                  </div>

                  {/* Experience */}

                  <div>
                    <label className="self-start  text-sm md:text-md ">
                      Add Experience
                    </label>

                    {values.experience.length !== 0 && (
                      <div className="w-full flex flex-wrap gap-4 text-black bg-white p-5 mb-3 rounded-md">
                        <h3 className="text-center w-full text-xl">
                          Experience
                        </h3>
                        <Divider
                          className="w-full"
                          style={{ color: "black" }}
                        />
                        {values.experience.map((item, index) => (
                          <div
                            style={{
                              boxShadow: " 0px 1px 2px 1px rgba(0, 0, 0, 0.25)",
                            }}
                            key={index}
                            className={`m-2 relative flex flex-col justify-center bg-gray-200 w-full text-black p-3 rounded-sm `}
                          >
                            <h3 className="text-[19px] font-bold">
                              {item.roll}
                            </h3>
                            <h3 className="text-[13px] font-semibold">
                              {item.company} -{" "}
                              <span className="font-medium">
                                {item.expYear}
                              </span>
                            </h3>
                            <h3 className="text-[10px] ">{item.details}</h3>

                            <AiOutlineClose
                              onClick={() => {
                                let updateskill = values.experience.filter(
                                  (item, insideIndex) => index !== insideIndex
                                );
                                setFieldValue("experience", updateskill);
                              }}
                              className="absolute right-3 cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <Field
                      name="expericence"
                      placeholder="Add Your Roll"
                      value={expericence.roll}
                      className="bg-white text-black border-b w-full h-12 rounded-t-md px-3 outline-none"
                      onChange={(e) => {
                        setExperince((pre) => ({
                          ...pre,
                          roll: e.target.value,
                        }));
                      }}
                    />

                    <Field
                      name="expericence"
                      placeholder="Add Company Name"
                      value={expericence.company}
                      className="bg-white text-black border-b w-full h-12 rounded-t-md px-3 outline-none"
                      onChange={(e) => {
                        setExperince((pre) => ({
                          ...pre,
                          company: e.target.value,
                        }));
                      }}
                    />

                    <Select
                      name="exp"
                      placeholder="select"
                      value={expericence.expYear}
                      className=""
                      fullWidth
                      style={{ color: "black", backgroundColor: "white" }}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        setExperince({
                          ...expericence,
                          expYear: e.target.value,
                        });
                      }}
                    >
                      {experienceYear.map((level) => (
                        <MenuItem key={level} value={level}>
                          {level}
                        </MenuItem>
                      ))}
                    </Select>

                    <Field
                      name="expericence"
                      as="textarea"
                      placeholder="About your Job description "
                      value={expericence.details}
                      className="bg-white text-black w-full  h-16 max-h-32 py-4 rounded-sm px-3 outline-none"
                      onChange={(e) => {
                        setExperince((pre) => ({
                          ...pre,
                          details: e.target.value,
                        }));
                      }}
                    />

                    <button
                      onClick={() => {
                        if (expericence.roll === "") {
                          // setskillerror("skill required");
                          console.log("roll req");
                        } else if (
                          expericence.expYear === "" ||
                          expericence.expYear === "select experience"
                        ) {
                          // setskillerror("experience required");
                          console.log("exp req");
                        } else if (expericence.company === "") {
                          console.log("Company name required");
                        } else if (expericence.details === "") {
                          console.log("detais required");
                        } else {
                          // setskillerror("");
                          values.experience.push(expericence);
                          setExperince({
                            roll: "",
                            expYear: "select experience",
                            details: "",
                            company: "",
                          });
                        }
                      }}
                      type="button"
                      className="w-full mb-3 rounded-b-md text-white bg-[#008594] h-12 "
                    >
                      Add Experience
                    </button>
                  </div>
                </div>
              </div>

              <button
              disabled={load}
                type="submit"
                className={`bg-orange-500 flex justify-center items-center h-12 font-bold w-full text-white rounded-sm  ${load ? "text-gray-400":"text-white"}`}
              >
               {load && <AiOutlineLoading3Quarters className="animate-spin mx-2"/>} Save and change{" "}
              </button>
            </form>
</>
          )}
        </Formik>
      </div>
    </Dialog>
  );
}

export default EditPage;
