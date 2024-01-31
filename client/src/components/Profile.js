import { Button, Container, Divider } from "@mui/material";
import React, { lazy, useEffect, useRef, useState } from "react";
import ProfilePic from "../asset/ProfilePic.jpg";
import Banner from "../asset/banner.jpeg";
import { VscDebugBreakpointData } from "react-icons/vsc";
import { ImSpinner3 } from "react-icons/im";
import {
  BsTelephoneFill,
  BsLinkedin,
  BsFillBookmarkPlusFill,
} from "react-icons/bs";
import { BiBookAdd } from "react-icons/bi";
import { AiFillFileAdd, AiFillGithub } from "react-icons/ai";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@emotion/react";
import EditPage from "./EditPage";
import { useAuthContext } from "../Auth";

import { useCookies } from "react-cookie";
import axios from "axios";
import ContactEditPage from "./ContactEditPage";
import Contact from "./Contact";

function Profile() {
  const navigate = useNavigate();

  const { userData, auth, setauth } = useAuthContext();

  const [cookie, setCookie, removeCookie] = useCookies();

  const profRef = useRef(null);
  const banRef = useRef(null);

  const [proImg, setproImg] = useState(userData.profilepic || ProfilePic);
  const [bannerImg, setBannerImg] = useState(userData.bannerpic || Banner);
  const [view, setview] = useState(true);
  const [profilePicLoad, setprofilePicLoad] = useState(false);
  const [bannerPicLoad, setbannerPicLoad] = useState(false);

  const [MainEdit, setMainEdit] = useState(false);
  const [editContact, seteditContact] = useState(false);

  var { username } = useParams();

  username = username.toLowerCase();

  const alltheme = useTheme();
  const secondary = alltheme.palette.secondary.main;
  const primary = alltheme.palette.primary.main;
  const isDarkMode = alltheme.palette.mode === "dark";
  const changeColor = isDarkMode ? "white" : "black";
  const changeBgColor = isDarkMode ? "#2A2A2A" : "rgba(244, 244, 244, 1)";


  

  useEffect(() => {
    if (auth.status) {
      if (auth.data.username === username) {
        setview(false);
      }
    }
  }, [auth.status]);

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

 

  const proImgChange = async (event) => {
    const file = event.target.files[0];
    base64convert(file)
      .then(async (res) => {
        setprofilePicLoad(true);
        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/user/uploadprofile`,
            { base64Data: res },
            {
              headers: { token: cookie.token },
            }
          )
          .then((res) => {
            setprofilePicLoad(false);
            setproImg(res.data);
          })
          .catch((err) => {
            console.log(err);
            setprofilePicLoad(false);
          });
      })
      .catch((err) => {
        setprofilePicLoad(false);

        console.log(err);
      });
  };

  const BanImgChange = (event) => {
    const file = event.target.files[0];

    base64convert(file)
      .then(async (res) => {
        setbannerPicLoad(true);
        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/user/uploadbanner`,
            { base64Data: res },
            {
              headers: { token: cookie.token },
            }
          )
          .then((res) => {
            setbannerPicLoad(false);
            setBannerImg(res.data);
          })
          .catch((err) => {
            console.log(err);
            setbannerPicLoad(false);
          });
      })
      .catch((err) => {
        setbannerPicLoad(false);

        console.log(err);
      });
  };

  return (
    <>
      <Container className="montserrat-font">
        <div className="w-full  bg-cover bg-no-repeat h-[16vh] md:h-[30vh]  relative my-4 rounded-md">
          <img
            src={bannerImg}
            className="h-full overflow-hidden rounded-md w-full object-cover"
            alt=""
          />
          {!view && (
            <div
              onClick={() => {
                if (banRef.current) {
                  banRef.current.click();
                }
              }}
              className="h-full absolute top-0 text-white transition duration-300 opacity-0 hover:opacity-100 overflow-hidden rounded-md w-full bg-black/60 cursor-pointer flex justify-center items-center"
            >
              Change Banner <AiTwotoneEdit />
            </div>
          )}
          {bannerPicLoad && (
            <h3 className="absolute w-full h-full rounded-md top-0  bg-black/70 flex justify-center items-center text-white">
              <ImSpinner3 className=" text-2xl animate-spin z-30" />
              Changing...
            </h3>
          )}

          <input
            accept="image/*"
            onChange={BanImgChange}
            className="hidden "
            ref={banRef}
            type="file"
          />

          <div
            style={{ color: changeColor }}
            className="absolute bottom-[-12vh] md:bottom-[-17vh] left-8  md:left-24 flex flex-col items-center"
          >
            {!view && (
              <div
                onClick={() => {
                  if (profRef.current) {
                    profRef.current.click();
                  }
                }}
                className="md:w-[25vh] h-[14vh] bg-black/60 cursor-pointer flex justify-center items-center text-white transition duration-600 opacity-0 z-10 hover:opacity-100 absolute w-[14vh] md:h-[25vh] rounded-full "
              >
                Change <AiTwotoneEdit />
              </div>
            )}

            <input
              accept="image/*"
              onChange={proImgChange}
              className="hidden"
              ref={profRef}
              type="file"
            />
            {profilePicLoad && (
              <h3 className="absolute w-[14vh] md:h-[25vh] md:w-[25vh] h-[14vh] rounded-full   bg-black/70 flex justify-center items-center">
                <ImSpinner3 className="text-white text-3xl animate-spin z-30" />
              </h3>
            )}

            <img
              src={proImg}
              className="md:w-[25vh] object-cover h-[14vh] bg-gray-400 w-[14vh] md:h-[25vh] rounded-full "
              onLoad={lazy}
              style={{ boxShadow: "0px 1px 2px 1px rgba(0, 0, 0, 0.10)" }}
            />

            <h3 className="font-bold text-[21px] montserrat-font md:text-2xl">
              {userData.name}
            </h3>
            <h3 className="font-bold text-[10px] montserrat-font">
              {userData.address.city} , {userData.address.state}
            </h3>
          </div>

          {!view && (
            <div
              onClick={() => {
                setMainEdit(true);
              }}
              style={{ boxShadow: "0px 1px 2px 1px rgba(0, 0, 0, 0.25)" }}
              className="absolute cursor-pointer right-0 text-sm flex justify-center items-center text-white rounded-full bottom-[-7vh] px-12  h-9 bg-black/70"
            >
              Edit <AiTwotoneEdit />
            </div>
          )}
        </div>

        {/* =========== */}

        <div className="grid grid-cols-12 mb-4 montserrat-font gap-4 mt-[13vh] md:mt-[20vh] ">
          <div
            style={{
              boxShadow: "0px 1px 2px 1px rgba(0, 0, 0, 0.25)",
              backgroundColor: changeBgColor,
            }}
            className=" col-span-12 p-7 md:col-span-8 order-2 md:order-1 grid grid-cols-12 w-full rounded-md"
          >
            <div
              style={{ color: changeColor }}
              className=" col-span-12 lg:col-span-6"
            >
              <h3 className="text-2xl font-bold my-2">Education</h3>
              <Divider sx={{ marginRight: 3 }} />

              {userData.education.length === 0 && view && (
                <div className="my-4 flex h-full flex-col items-center justify-center">
                  <BsFillBookmarkPlusFill className="text-gray-500 text-[6vh] md:text-[10vh]" />
                  <h3 className="text-sm">No Education</h3>
                </div>
              )}

              {userData.education.map((item, index) => (
                <div key={index} className=" flex items-center my-4">
                  <VscDebugBreakpointData className="text-2xl flex mx-4" />
                  <div>
                    <h3 className="text-xl font-semibold">{item.course}</h3>
                    <h3 className="text-sm">{item.college}</h3>
                  </div>
                </div>
              ))}

              {userData.education.length === 0 && !view && (
                <div className="cursor-pointer  h-full flex flex-col items-center justify-center">
                  <BsFillBookmarkPlusFill className="text-gray-500 text-[6vh] md:text-[10vh]" />
                  <h3 className="text-sm">Add Education</h3>
                </div>
              )}
            </div>

            {/* ============ */}
            <div
              style={{ color: changeColor }}
              className="col-span-12 lg:col-span-6"
            >
              <h3 className="text-2xl font-bold my-2">Skill</h3>
              <Divider sx={{ marginRight: 3 }} />
              {userData.skill.map((item, index) => (
                <div key={index} className=" flex items-center my-4">
                  <VscDebugBreakpointData className="text-2xl flex mx-4" />
                  <div>
                    <h3 className="text-xl font-semibold">{item.skill}</h3>
                    <h3 className="text-sm"> {item.exp} </h3>
                  </div>
                </div>
              ))}

              {userData.skill.length === 0 && view && (
                <div className=" h-full flex flex-col items-center justify-center">
                  <AiFillFileAdd className="text-gray-500 text-[6vh] md:text-[10vh]" />
                  <h3 className="text-sm">No Skill</h3>
                </div>
              )}

              {userData.skill.length === 0 && !view && (
                <div className="cursor-pointer h-full flex flex-col items-center justify-center">
                  <AiFillFileAdd className="text-gray-500 text-[6vh] md:text-[10vh]" />
                  <h3 className="text-sm">Add Skill</h3>
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              boxShadow: "0px 1px 2px 1px rgba(0, 0, 0, 0.25)",
              color: changeColor,
              backgroundColor: changeBgColor,
            }}
            className=" rounded-md p-7 order-1 md:order-2 col-span-12  md:col-span-4"
          >
            <div className="">
              <h3 className="text-2xl font-bold my-2">About</h3>
              <Divider sx={{ marginRight: 3 }} />
              <h4 className="text-xs my-3 tracking-tighter">
                {userData.about}
              </h4>
            </div>

            <div className="">
              <h3 className="text-2xl font-bold my-2">contact</h3>
              <Divider sx={{ marginRight: 3 }} />
              <div className="text-xs my-3 tracking-tighter">
              {/* ===========Contact ============== */}
               <Contact data={userData.contact} email={userData.email} />
                {!view && (
                  <button
                    onClick={() => {
                      seteditContact(true);
                    }}
                    className="w-full bg-gray-400/50 py-2 gap-3 flex items-center justify-center rounded-full"
                  >
                    {" "}
                    Edit <AiTwotoneEdit />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =========== */}

        <div style={{ color: changeColor }}>
          <h3 className="text-3xl font-semibold my-2">Experience</h3>
          <Divider sx={{ marginRight: 2 }} />
          <div
            style={{
              boxShadow: " 0px 1px 2px 1px rgba(0, 0, 0, 0.25)",
              backgroundColor: changeBgColor,
            }}
            className="w-full p-7  my-4 rounded-md"
          >
            {userData.experience.length !== 0 ? (
              userData.experience.map((item, index) => (
                <div key={index} className="my-2">
                  <h3 className="text-3xl font-medium">{item.roll}</h3>
                  <h3 className="text-sm mb-3 font-semibold">
                    {item.company}{" "}
                    <span className="text-xs font-medium">
                      {item.expYear} EXP
                    </span>{" "}
                  </h3>
                  <h4 className="text-xs">{item.details}</h4>

                  <Divider sx={{ marginTop: 2 }} />
                </div>
              ))
            ) : view ? (
              <div className=" flex flex-col items-center justify-center">
                <BiBookAdd className="text-gray-500 text-[13vh]" />
                <h3 className="text-sm">No Experience</h3>
              </div>
            ) : (
              <div className="cursor-pointer flex flex-col items-center justify-center">
                <BiBookAdd className="text-gray-500 text-[13vh]" />
                <h3 className="text-sm">Add Experience</h3>
              </div>
            )}
          </div>
        </div>

        <div style={{ color: changeColor }}>
          <h3 className="text-3xl font-semibold my-2">Project</h3>
          <Divider sx={{ marginRight: 2 }} />
          <div
            style={{
              boxShadow: " 0px 1px 2px 1px rgba(0, 0, 0, 0.25)",
              backgroundColor: changeBgColor,
            }}
            className="w-full p-7 gap-3 flex flex-col lg:flex-row mt-2 rounded-md"
          >
            <Button
              onClick={() => {
                navigate("project");
              }}
              sx={{
                flexGrow: "2",
                marginY: 2,
                backgroundColor: "rgba(242, 145, 93, 0.8)",
                paddingX: 5,
                color: "white",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                borderRadius: "20px",
                "&:hover": { bgcolor: "rgba(242, 160, 116, 0.8)" },
              }}
            >
              View Project
            </Button>
            {/* <Button
              sx={{
                flexGrow: "2",
                marginY: 2,
                backgroundColor: "rgba(62, 206, 206, 0.8)",
                paddingX: 5,
                color: "black",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                borderRadius: "20px",
                "&:hover": { bgcolor: "rgba(62, 206, 206, 1)" },
              }}
            >
              Add Project
            </Button> */}
          </div>
        </div>
      </Container>

      {MainEdit && (
        <div className="fixed top-0 h-screen w-full bg-black/60 left-0 flex justify-center items-center">
          <EditPage open={MainEdit} close={setMainEdit} />
        </div>
      )}

      {editContact && (
        <div className="fixed top-0 z-50 h-screen w-full bg-black/60 left-0 flex justify-center items-center">
          <ContactEditPage
            data={auth.status && auth.data}
            close={seteditContact}
          />
        </div>
      )}
    </>
  );
}

export default Profile;
