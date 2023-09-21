import React from "react";

import logo from "./asset/logo.svg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


function InterFace() {

  const navigate = useNavigate()
  return (
    <div className="h-[100vh] w-full bg-white flex flex-col items-center ">
      <img src={logo} className="w-[50vh]  pr-4" alt="" />

      <div className="w-1/2 flex-col text-center justify-center">
        <button  onClick={()=>{navigate('/register')}} className="bg-slate-800 hover:shadow-2xl hover:bg-slate-900 px-7 text-white py-2 rounded-full">
          Get Started
        </button>{" "}
        
        <h4 className="text-[12px]">or</h4>
        <h4 className="text-[12px]">Already Have an Account</h4>
        <Button onClick={()=>{navigate('/login')}} sx={{marginY:2,backgroundColor:"blueviolet",paddingX:5 ,color:"white" , borderRadius:"20px","&:hover":{bgcolor:"blueviolet"} }} >
          Login
        </Button>
      </div>
      
    </div>
  );
}

export default InterFace;
