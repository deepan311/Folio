import { useTheme } from "@emotion/react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useAuthContext } from "../Auth";

function Skill() {
    const theme = useTheme();

    const isDarkMode = theme.palette.mode === 'dark';

    const changeColor = isDarkMode ? "white" : "black"

    const  {userData} =useAuthContext()
    console.log(userData.skill)
  return (
    <Container className="min-h-[calc(91vh+3px)]" sx={{ padding: 5 }}>
      <Typography color={changeColor}  component="div" variant="h5">
        Skill
      </Typography>
      <Divider sx={{marginY:2}} />
      <Grid container spacing={5}>
        {userData.skill.map((item) => (
          <Grid item xs={12} md={6}>
            <Card sx={{ display: "flex", cursor: "pointer" ,position:'relative'}}>
            {/* <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" className="w-full absolute opacity-10 lg:hidden h-full object-cover" alt="" />
              <CardMedia
                component="img"
                sx={{ width: {xs:120 , md:140, },display:{xs:"none",md:"block"}}}
                image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                alt="Live from space album cover"
              /> */}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div"  variant="h5">
                    {item.skill}
                  </Typography>
                  <Typography component="div" fontSize={14} variant="h6">
                    {item.exp}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="h6"
                    fontSize={10}
                  >
                    {item.details && item.details   }
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Skill;
