import { ThemeProvider } from "@emotion/react";
import axios from "axios";
import { createContext, useContext, useState } from "react";

import obj from "./theme";


const AuthContext = createContext();

const { theme, dark } = obj;

export const AuthProvider = ({ children }) => {
  const [userData, setuserData] = useState(null);
  const [loading, setloading] = useState(false);
  const [mode, setmode] = useState(false);


  const [auth, setauth] = useState({ status: false, data: null });

  const resigter = async (data) => {
    try {
      const reg = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/register`,
        data
      );

      return reg;
    } catch (error) {
      return error;
    }
  };

  const login = async ({ username, password }) => {
    try {
      const log = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/login`, {
        username,
        password,
      });

      if (log.status == 200) {
        return log.data;
      }
    } catch (error) {
      return error;
    }
  };

  const data = {
    login,
    resigter,
    userData,
    setuserData,
    auth,
    setauth,
    setloading,
    loading,
    mode, setmode,
  };

  return (
    <AuthContext.Provider value={data}>
    <ThemeProvider theme={mode ? dark : theme}>


      {loading ? "loading" : children}
    </ThemeProvider>

    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
