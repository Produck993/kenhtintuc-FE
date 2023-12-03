import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SearchIconWrapper, StyledInputBase } from "../../utils/search";
import SearchIcon from "@mui/icons-material/Search";
import { AccountCircle } from "@mui/icons-material";
import { Fab } from "@mui/material";
function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let [headerData, setHeaderData] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  //Get API
  const getDataCate = () => {
    axios
      .get(`http://localhost:1337/api/title-types`)
      .then((res) => {
        setHeaderData(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setSearchTerm('')
    setAnchorEl(null);
    handleMobileMenuClose();

  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleKeyDown = (event) => {
    // Kiểm tra nếu người dùng nhấn phím Enter
    if (event.key === 'Enter') {
      navigate(`/search/${searchTerm}`)
    }
  };


  const menuId = "primary-search-account-menu";
  useEffect(() => {
    getDataCate();
  }, []);
  return (
    <AppBar position="static" sx={{ bgcolor: "#A70E1A" }}>
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ bgcolor: "#A70E1A" }}>
          <img
            src="https://png2.cleanpng.com/sh/1095daf767e0d7f270d7fb8c07ed9b11/L0KzQYq3VcAzN5RAgJH0aYP2gLBuTfxwb5CygdDvb4LwccXwjB4ufJZogND4bHBqiX79hfN1d6MyfARqcHjsc8S0kv96aZ15RadsY3K4RobrUME4P2o2RqQBNkO2SYi6UcU2Pmk3UakDOUCzRnB3jvc=/kisspng-logo-information-technology-vector-graphics-royalt-5ccb565d017791.266339731556829789006.png"
            style={{ width: "10%", height: "10%" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <div onClick={() => navigate(`/`)}> Kênh công nghệ</div>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {headerData.map((page) => (
                <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <div
                      onClick={() =>
                        navigate(`/${page.attributes.slug}`, {
                          state: page?.id,
                        })
                      }
                    >
                      {page?.attributes?.name}
                    </div>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {headerData.map((page) => (
              <Button
                key={page.id}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <div onClick={() => navigate(`/${page.attributes.slug}`)}>
                  {page?.attributes?.name}
                </div>
              </Button>
            ))}
          </Box>
          <SearchIcon onClick={handleProfileMenuOpen} />
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "ceenter",
              horizontal: "center",
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              value={searchTerm}
            />
            
          </Search>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
