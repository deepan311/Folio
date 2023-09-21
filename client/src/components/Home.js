import React, { useEffect, useState } from "react";
import Navbar from "../Main/Navbar";
import { Route, Routes, useParams } from "react-router-dom";
import Profile from "./Profile";
import Skill from "../Main/Skill";
import Project from "../Main/Project";
import { useAuthContext } from "../Auth";
import axios from "axios";
import { useCookies } from "react-cookie";

function Home() {
  const { username } = useParams();

  const { userData, setuserData ,auth,setauth,setloading} = useAuthContext();

  const [cookie, setCookie, removeCookie] = useCookies();
  

  const [load, setload] = useState(false);
  const [error, seterror] = useState({ status: false, msg: "" });

  const fetchData = async (username) => {
    username = username.toLowerCase()
    try {
      setload(true);

      const fetch = await axios.get(
        `http://localhost:8000/api/user/userdata/${username}`
      );

      if (fetch.status == 200) {
        setuserData(fetch.data);
        setload(false);
        seterror({ status: false, msg: "" });
      }
    } catch (error) {
      setload(false);
      seterror({
        status: true,
        msg: error.response.data || "Somthing Worng...",
      });
    }
  };
  useEffect(() => {
    if (userData === null) {
      if (error.status == false) {
        setload(true);

        fetchData(username);
      }
    }
  }, []);


  const verifyAdmin = async (token) => {
    setloading(true)
    try {
      const result = await axios.get(
        `http://localhost:8000/api/user/verifytoken`,
        { headers: { token } }
      );
      if (result.status == 200) {
        setauth({status:true,data:result.data})
        console.log(result)
      }
      setloading(false)
    } catch (error) {
      removeCookie("token");
      setloading(false)
    }
  };




  useEffect(() => {
    if(cookie.token && !auth.status){
      verifyAdmin(cookie.token)
    }
    
  }, []);


  if (load) {
    return <>Loading.........</>;
  }

  if (error.status) {
    return <>{error.msg}</>;
  }

  if (userData) {
    return (
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/skill" element={<Skill />} />
          <Route path="/project" element={<Project />} />
        </Routes>
      </div>
    );
  }
}

export default Home;
