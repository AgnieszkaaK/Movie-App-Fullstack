
import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Link as RouterLink, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/authContext";
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const AppHeader = () => {
  const { isAuthenticated, userName, signout } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const movieMenuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Top Rated", path: "/movies/top-rated" },
    { label: "Trending This Week", path: "/movies/trending/week" },
    { label: "Popular!", path: "/movies/popular" },
    { label: "Playlist", path: "/movies/playlist" },
  ];

  const authOptions = isAuthenticated
    ? [
        { label: "Profile", path: "/profile" },
      ]
    : [
        { label: "Profile", path: "/profile" },
        { label: "Login", path: "/login" },
        { label: "Signup", path: "/signup" },
      ];

  const allOptions = [...movieMenuOptions, ...authOptions];

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#E8A0BF" }}>
        <Toolbar>
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            color="inherit"
            underline="none"
            sx={{ fontFamily: "Poppins", fontWeight: "bold", mr: 2 }}
          >
            🎬 TMDB Client
          </Typography>

          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontStyle: "italic",
              fontFamily: "Poppins",
            }}
          >
            All you ever wanted to know about Movies!
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                open={open}
                onClose={handleMenuClose}
              >
                {allOptions.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                    {opt.label}
                  </MenuItem>
                ))}

                {isAuthenticated ? (
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      signout();
                    }}
                  >
                    Sign out
                  </MenuItem>
                ) : null}
              </Menu>
            </>
          ) : (
            <>
              {allOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  component={RouterLink}
                  to={opt.path}
                  sx={{ fontWeight: "bold", fontFamily: "Poppins" }}
                >
                  {opt.label}
                </Button>
              ))}

              {isAuthenticated ? (
                <Box sx={{ ml: 2, display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2">Welcome {userName}!</Typography>
                  <Button color="inherit" onClick={signout}>
                    Sign out
                  </Button>
                </Box>
              ) : (
                <Box sx={{ ml: 2, display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2">You are not logged in</Typography>
                </Box>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>

      <Offset />
    </>
  );
};

export default AppHeader;
