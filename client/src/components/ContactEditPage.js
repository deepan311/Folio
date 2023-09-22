import axios from "axios";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useAuthContext } from "../Auth";
import { BiExit } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function ContactEditPage({ data, close }) {
  const [cookie, setCookie, removeCookie] = useCookies();
  const { setauth, setuserData } = useAuthContext();
  const [load, setload] = useState(false);

  const init = {
    email: data.email || "",
    phone: data.contact.phone || "",
    linkedin: data.contact.linkedin || "",
    github: data.contact.github || "",
  };

  //   const init = {
  //     email: data.email || "deepan",
  //     phone: "",
  //     linkedin: "",
  //     github: "",
  //   };

  const submit = async (e) => {
    const data = {
      email: e.email,
      phone: e.phone,
      linkedin: e.linkedin,
      github: e.github,
    };

    try {
        setload(true)
      const update = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/updateconect`,
        data,
        { headers: { token: cookie.token } }
      );

      if (update.status === 200) {
        close(false);
        setauth((pre) => ({ ...pre, data: { ...pre.data, contact: data } }));
        setuserData((pre) => ({ ...pre, contact: data }));
      }
      setload(false)
    } catch (error) {
        setload(false)
      console.log(error);
    }
  };

  return (
    <div className="bg-white w-11/12 text-black md:w-1/4 p-3 flex flex-col rounded-lg justify-center relative  ">
      <BiExit
        onClick={() => {
          close(false);
        }}
        className="absolute top-2 right-2 bg text-xl cursor-pointer mx-4"
      />
      <h3 className="text-center text-xl font-bold">Edit Contact</h3>
      <Formik initialValues={init} onSubmit={submit}>
        {({ handleSubmit, handleChange }) => (
          <form action="" onSubmit={handleSubmit}>
            <label className="self-start text-sm mx-1 flex mt-4 md:text-md text-black">
              {" "}
              Email can't editable
            </label>
            <Field
              name="email"
              disabled
              type="text"
              className="w-full h-10 rounded-md outline-none px-3 bg-gray-300"
              placeholder="Email"
            />

            <label className="self-start mx-1  text-sm flex mt-4 md:text-md text-black">
              {" "}
              Phone Number
            </label>
            <Field
              name="phone"
              type="text"
              className="w-full h-10 rounded-md outline-none px-3 bg-gray-200"
              placeholder="Phone Number"
            />

            <label className="self-start mx-1  text-sm flex mt-4 md:text-md text-black">
              {" "}
              Linked In link
            </label>
            <Field
              type="text"
              name="linkedin"
              className="w-full h-10 rounded-md outline-none px-3 bg-gray-200"
              placeholder="Linked In"
            />
            <label className="self-start mx-1  text-sm flex mt-4 md:text-md text-black">
              {" "}
              GitHub Link
            </label>
            <Field
              type="text"
              name="github"
              className="w-full h-10 rounded-md outline-none px-3 bg-gray-200"
              placeholder="GitGub Link"
            />

            {load && <div className="w-full p-3 flex justify-center"><AiOutlineLoading3Quarters className="animate-spin"/></div> }

            <button
            disabled={load}
              type="submit"
              className="w-full h-10 rounded-md my-3 bg-orange-600 text-white"
            >
              Update
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default ContactEditPage;
