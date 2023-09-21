import { createTheme } from "@mui/material";


const theme = createTheme({



    palette:{
        primary:{
            main:"rgba(217, 162, 27, 0.04)"
        },
        secondary:{
            main:"#1B1B1B"
        }
    }
})

const dark = createTheme({
 
    palette: {
      mode:"dark",
      secondary:{
        main:"#fffff"
      },
      primary:{
        main:"#313131"
      }
    }
  
})

const obj ={theme,dark}



export default obj