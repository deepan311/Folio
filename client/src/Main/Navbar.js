import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import ProfilePic from "../asset/ProfilePic.jpg";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../Auth";
import { CgProfile } from "react-icons/cg";
import { useCookies } from "react-cookie";
import styled from "@emotion/styled";
import PersonIcon from "@mui/icons-material/Person";

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openProfile, setopenProfile] = useState(null);

  const { userData, auth, setauth, setuserData, mode, setmode } =
    useAuthContext();
  const navigate = useNavigate();

  const params = useParams();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const [menuItems, setmenuItems] = useState([
    {
      title: `${" Home"}`,
      icon: PersonIcon,
      link: `/${userData.username}`,
    },
    { title: "Project", icon: FactCheckIcon, link: "project" },
    { title: "Skill", icon: TaskAltIcon, link: "skill" },
  ]);

  const alltheme = useTheme();
  const [cookie, setCookie, removeCookie] = useCookies();

  const secondary = alltheme.palette.secondary.main;
  const primary = alltheme.palette.primary.main;

  const smallScreen = { xs: "flex", md: "none" };
  const largeScreen = { xs: "none", md: "flex" };

  

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => {
              setMenuOpen(true);
            }}
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, display: smallScreen, color: { secondary } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            color={secondary}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: { xs: "center", md: "start" } }}
          >
            {(userData.name + "⚡") || (
              <h3 className="text-[15px] font-bold">{userData.name} ⚡</h3>
            )}
          </Typography>

          <div className="hidden md:block">
            <ListItem
              onClick={() => {}}
              sx={{ borderRadius: 2, paddingX: 2, gap: 3 }}
              button
            >
              <MaterialUISwitch
                checked={mode}
                onChange={() => {
                  setmode(!mode);
                }}
              />
            </ListItem>
          </div>

          {menuItems.map((item, index) => (
            <Box key={index}>
              <ListItem
                onClick={() => {
                  navigate(item.link);
                  if (item.title === "My Profile") {
                    window.location.reload();
                  }
                }}
                sx={{
                  borderRadius: 2,
                  paddingX: 2,
                  gap: 1,
                  display: largeScreen,
                  color: secondary,
                }}
                button
                key={index}
              >
                <item.icon fontSize="small" />
                <ListItemText>
                  <Typography variant="body2" style={{ fontSize: "14px" }}>
                    {item.title}
                  </Typography>
                </ListItemText>
              </ListItem>
            </Box>
          ))}

          <Drawer
            sx={{ display: smallScreen }}
            anchor="left"
            open={isMenuOpen}
            onClose={toggleMenu}
          >
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                paddingY: 2,
              }}
            >
              {userData.name + "⚡"}
            </Typography>
            <List sx={{ height: "100%" }}>
              {menuItems.map((item, index) => (
                <div key={index}>
                  <Divider light />

                  <ListItem
                    onClick={() => {
                      navigate(item.link);
                    }}
                    sx={{ borderRadius: 2, paddingX: 5, gap: 3 }}
                    button
                    key={index}
                  >
                    <item.icon />
                    <ListItemText primary={item.title} />
                  </ListItem>
                </div>
              ))}
              <ListItem
                onClick={() => {}}
                sx={{ borderRadius: 2, paddingX: 5, gap: 3 }}
                button
              >
                Mode
                <MaterialUISwitch
                  checked={mode}
                  onChange={() => {
                    setmode(!mode);
                  }}
                />
              </ListItem>
            </List>
          </Drawer>

          {cookie.token && auth.status ? (
            <div>
              <img
                src={auth.data.profilepic || ProfilePic}
                onClick={(e) => {
                  setopenProfile(e.currentTarget);
                }}
                alt=""
                aria-controls="dropdown-menu"
                className="md:mx-3 h-10 cursor-pointer   rounded-full"
              />

              <Menu
                id="dropdown-menu"
                anchorEl={openProfile}
                open={Boolean(openProfile)}
                onClose={() => {
                  setopenProfile(null);
                }}
              >
                <MenuItem
                  onClick={(e) => {
                    navigate(`/${auth.data.username}`);

                    window.location.reload();
                  }}
                >
                  My Profile
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    removeCookie("token");
                    setauth({ status: false, data: null });
                    navigate("/login");
                    setuserData(null);
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Link
              to="/register"
              className="font-semibold bg-black/10 rounded-sm p-2"
            >
              Create your Folio
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
