import { useTheme } from "@emotion/react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  TextField,
  Typography,
} from "@mui/material";
import React, { lazy, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Banner from "../asset/banner.jpeg";
import { AiTwotoneEdit } from "react-icons/ai";
import { ImSpinner3, ImFilesEmpty } from "react-icons/im";
import { FaGithub } from "react-icons/fa";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { ErrorMessage, Field, Formik } from "formik";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useAuthContext } from "../Auth";

function Project() {
  const alltheme = useTheme();

  const { userData, setuserData, auth } = useAuthContext();

  const [addProject, setaddProject] = useState(false);
  const [load, setload] = useState(false);
  const [miniload, setminiload] = useState(false);
  const profRef = useRef(null);
  const [projectImg, setprojectImg] = useState(Banner);

  const secondary = alltheme.palette.secondary.main;
  const primary = alltheme.palette.primary.main;

  const isDarkMode = alltheme.palette.mode === "dark";
  const changeColor = isDarkMode ? "white" : "black";
  const changeBgColor = isDarkMode ? "#2A2A2A" : "rgba(244, 244, 244, 1)";

  const [cookie, setCookie, removeCookie] = useCookies();

  const base64convert = (file) => {
    return new Promise((resolve, reject) => {
      if (file) {
        // You can handle the selected image file here
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.onerror = (e) => {
          reject(e);
        };
      }
    });
  };

  const imageChange = async (event) => {
    const file = event.target.files[0];

    base64convert(file)
      .then((res) => {
        setprojectImg(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const valid = (e) => {
    let error = {};

    if (e.title == "") {
      error.title = "Required Title";
    }
    if (e.description == "") {
      error.description = "Required description";
    }

    if (projectImg === Banner) {
      error.img = "Image Required";
    }

    return error;
  };

  const uploadProject = async (e) => {
    try {
      setload(true);
      await axios
        .post(
          `http://localhost:8000/api/project/addproject`,
          {
            imageBase64: projectImg,
            title: e.title,
            description: e.description,
          },
          { headers: { token: cookie.token } }
        )
        .then((res) => {
          console.log(res);
          setuserData({ ...userData, project: res.data });
          setaddProject(false);
          setload(false);
        });
    } catch (error) {
      setload(false);

      console.log(error);
    }
  };

  const filterProjectDelete = (uid) => {
    const { project } = userData;

    const filterArray = project.filter((item) => item.uid !== uid);
    setuserData({ ...userData, project: filterArray });
  };

  const deleteProject = async ({ uid, title }) => {
    try {
      setminiload(true);
      const result = await axios.post(
        `http://localhost:8000/api/project/delete`,
        { uid, title },
        { headers: { token: cookie.token } }
      );

      if (result.status === 200) {
        filterProjectDelete(uid);
      }
      setminiload(false);
    } catch (error) {
      console.log(error);
      setminiload(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: primary }}
      className="min-h-[calc(92vh-5px)]"
    >
      {/* Screen  */}

      {miniload && (
        <div className="w-full h-full bg-black/50 top-0 fixed text-white gap-2 flex justify-center items-center z-50">
          <ImSpinner3 className="animate-spin" /> <h4> Deleting....</h4>
        </div>
      )}

      {userData.project.length === 0 && (
        <div
          style={{ color: changeColor }}
          className="w-full font-semibold flex gap-5 flex-col h-[50vh] items-center  justify-center"
        >
          <ImFilesEmpty className="text-[20vh]" />
          <h3>No Project Available</h3>
        </div>
      )}
      <div className="grid grid-cols-12 ">
        {userData.project.map((item, index) => (
          <div key={index} className="relative lg:max-h-[36vh] col-span-12 lg:col-span-3 p-6">
            {auth.status && auth.data.username === userData.username && (
              <div className="absolute top-6 bg-black/30 p-2 rounded-full right-6 text-xl z-40 cursor-pointer text-white">
                <AiFillDelete
                  onClick={() => {
                    deleteProject({ title: item.title, uid: item.uid });
                  }}
                />
              </div>
            )}

            {/* <div className="absolute bg-black/30 p-3 rounded-full top-6 left-6 text-xl z-50 cursor-pointer text-white">
              <AiFillEdit />
            </div> */}

            <img
              src={item.img}
              alt=""
              loading="lazy"
              className="w-full shadow-2xl h-full object-cover rounded"
            />
            <div className="absolute z-20 bg-black/50 cursor-pointer transition duration-500 opacity-0 hover:opacity-100 p-3 top-6 bottom-6 left-6 right-6 rounded ">
              <h3 className="text-[10px] text-center flex items-center h-full text-white">
                <span>
                  {`${item.description} `}{" "}
                  <span className="underline text-sm">visit</span>{" "}
                </span>
              </h3>
            </div>

            <div className="absolute bg-gradient-to-t from-black/70 p-3 bottom-6 left-6 right-6 rounded ">
              <h3 className="text-2xl flex items-end  full text-white">
                {item.title}
              </h3>

              <div className="absolute bottom-3 text-2xl z-40 right-3 cursor-pointer text-white">
                <FaGithub />
              </div>
            </div>

            {/* <h5>deepan</h5> */}
          </div>
        ))}

        <div></div>
      </div>

      {auth.status && auth.data.username === userData.username && (
        <div className="bottom-10 z-30 right-10  fixed ">
          <button
            onClick={() => {
              setaddProject(true);
            }}
            style={{ backgroundColor: changeColor, color: changeBgColor }}
            className="w-[7vh]  rounded-md h-[7vh]"
          >
            <AddIcon />
          </button>
        </div>
      )}

      <Dialog
        open={addProject}
        onClose={() => {
          setaddProject(false);
        }}
        fullWidth
      >
        <Formik
          initialValues={{
            img: "",
            title: "",
            description: "",
            link: "",
            github: "",
          }}
          validate={valid}
          onSubmit={uploadProject}
        >
          {({ handleSubmit, handleChange }) => (
            <form action="" onSubmit={handleSubmit}>
              <DialogContent
                sx={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  color: "black",
                  gap: 1,
                }}
              >
                <div className="h-[18vh]  w-[30vh] relative">
                  <div
                    onClick={() => {
                      if (profRef.current) {
                        profRef.current.click();
                      }
                    }}
                    className="h-full overflow-hidden text-white  flex justify-center opacity-0 hover:opacity-100 items-center transition duration-500 bg-black/0 hover:bg-black/60 cursor-pointer absolute rounded-md w-full"
                  >
                    Upload image
                  </div>
                  <img
                    src={projectImg}
                    className="h-full w-full overflow-hidden rounded-md object-cover"
                    alt=""
                  />

                  <ErrorMessage
                    name="img"
                    render={(msg) => (
                      <h3 className="text-red-500 font-medium"> ({msg})</h3>
                    )}
                  />
                </div>

                <input
                  accept="image/*"
                  onChange={imageChange}
                  className="hidden "
                  ref={profRef}
                  type="file"
                />

                <label
                  className="self-start mt-4 text-sm flex md:text-md text-black"
                  style={{ color: changeColor }}
                >
                  {" "}
                  Project Title
                  <ErrorMessage
                    name="title"
                    render={(msg) => (
                      <h3 className="text-red-500 font-medium"> ({msg})</h3>
                    )}
                  />
                </label>

                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  placeholder="Title"
                  className="rounded-md outline-none px-3 w-full h-12 bg-gray-200"
                />

                <label
                  className="self-start mt-4 text-sm flex md:text-md "
                  style={{ color: changeColor }}
                >
                  {" "}
                  Description
                  <ErrorMessage
                    name="description"
                    render={(msg) => (
                      <h3 className="text-red-500 font-medium"> ({msg})</h3>
                    )}
                  />
                </label>

                <Field
                  type="text"
                  name="description"
                  as="textarea"
                  placeholder="Description"
                  className="rounded-md outline-none px-3 w-full pt-2 h-20 max-h-36 bg-gray-200"
                />

                <label
                  className="self-start mt-4 text-sm flex md:text-md "
                  style={{ color: changeColor }}
                >
                  {" "}
                  Link
                </label>

                <input
                  type="text"
                  name="link"
                  onChange={handleChange}
                  placeholder="Link (optional)"
                  className="rounded-md outline-none px-3 w-full h-12 bg-gray-200"
                />

                <label
                  className="self-start mt-4 text-sm flex md:text-md "
                  style={{ color: changeColor }}
                >
                  {" "}
                  Github Link
                </label>

                <input
                  type="text"
                  name="github"
                  onChange={handleChange}
                  placeholder="GitHub (optional)"
                  className="rounded-md outline-none px-3 w-full h-12 bg-gray-200"
                />

                <button
                  disabled={load}
                  type="submit"
                  className="w-full  flex justify-center items-center gap-3 rounded-md h-12 mt-4 bg-green-500 text-white"
                >
                  Upload {load && <BiLoaderCircle className="animate-spin" />}
                </button>
              </DialogContent>
            </form>
          )}
        </Formik>
      </Dialog>

      {/* <div className="fixed top-0 w-full h-full bg-black/40">

</div> */}
    </div>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    des: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus delectus provident, facilis eaque nulla eveniet doloribus. Eligendi, nostrum impedit sed dolor laborum voluptas voluptatum iure nam optio architecto magnam tempora.",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    des: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus delectus provident, facilis eaque nulla eveniet doloribus. Eligendi, nostrum impedit sed dolor laborum voluptas voluptatum iure nam optio architecto magnam tempora.",
  },
];

export default Project;
