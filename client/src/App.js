import { Box } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import Navbar from "./Main/Navbar";
import { useTheme } from "@emotion/react";
import Project from "./Main/Project";
import Skill from "./Main/Skill";
import InterFace from "./InterFace";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { useAuthContext } from "./Auth";


function App() {

  const alltheme = useTheme();
  const secondary = alltheme.palette.secondary.main;
  const primary = alltheme.palette.primary.main;

  return (
    
    <Box bgcolor={primary} sx={{ height: "100%" }}>
      <Routes>
        <Route path="/" element={<InterFace />} />
        <Route path="/:username/*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Box>
    
  );
}

export default App;
