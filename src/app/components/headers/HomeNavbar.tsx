import {
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import React, { useEffect, useState } from "react";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { Logout } from "@mui/icons-material";
import { serverApi } from "../../../lib/config";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import Divider from "../divider";

export interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;
  const { authMember } = useGlobals();
  const [showTopAdd, setShowTopAdd] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopAdd(window.scrollY < 42);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack className="top-add">
          <Box className={"top-add-content"}>
            <Box sx={{ width: "32%" }} />

            <Box
              className="top-content-text"
              sx={{ width: "32%", textAlign: "center" }}
            >
              Free shipping on orders of $35+
            </Box>

            <Box
              sx={{
                width: "32%",
                display: "flex",
                justifyContent: "flex-end",
                gap: 1,
              }}
            >
              <FacebookIcon sx={{ color: "#fff" }} />
              <InstagramIcon sx={{ color: "#fff" }} />
              <TelegramIcon sx={{ color: "#fff" }} />
            </Box>
          </Box>
        </Stack>
        <Stack
          className="navbar-cover"
          sx={{
            position: "fixed",
            top: showTopAdd ? "42px" : "0px",
            left: 0,
            transition: "transform 0.1s ease-in-out, top 0.1s ease-in-out",
          }}
        >
          <Box
            component={"nav"}
            className="menu"
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              // padding: "1rem 2rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "4rem",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Box className={"hover-line"}>
                <NavLink to="/" activeClassName="underline">
                  Home
                </NavLink>
              </Box>
              <Box className={"hover-line"}>
                <NavLink to="/products" activeClassName="underline">
                  Products
                </NavLink>
              </Box>
              {authMember ? (
                <Box className={"hover-line"}>
                  <NavLink to="/orders" activeClassName="underline">
                    Orders
                  </NavLink>
                </Box>
              ) : null}
            </Box>

            <Box sx={{ justifySelf: "center" }}>
              <NavLink to="/">
                <img
                  height={"44px"}
                  src={"/img/amaya-logo.png"}
                  className="brand-logo"
                />
              </NavLink>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: "4rem",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              {authMember ? (
                <Box className={"hover-line"}>
                  <NavLink to="/member-page" activeClassName="underline">
                    My Page
                  </NavLink>
                </Box>
              ) : null}
              <Box className={"hover-line"}>
                <NavLink to="/help" activeClassName="underline">
                  Help
                </NavLink>
              </Box>
              {/* Basket */}
              <Basket
                cartItems={cartItems}
                onAdd={onAdd}
                onRemove={onRemove}
                onDelete={onDelete}
                onDeleteAll={onDeleteAll}
              />
              {!authMember ? (
                <Box>
                  <Button
                    // variant="contained"
                    className="login-button"
                    onClick={() => setLoginOpen(true)}
                  >
                    Login
                  </Button>
                </Box>
              ) : (
                <img
                  src={
                    authMember.memberImage
                      ? `${serverApi}/${authMember.memberImage}`
                      : "/icons/default-user.svg"
                  }
                  alt="user img"
                  className="user-avatar"
                  aria-haspopup={"true"}
                  onClick={handleLogoutClick}
                />
              )}

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClick={handleCloseLogout}
                onClose={handleCloseLogout}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleLogoutRequest}>
                  <ListItemIcon>
                    <Logout fontSize="small" style={{ color: "blue" }} />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Stack>
        <Stack className="header-frame">
          <Stack className="detail">
            <Box className="service-txt">exceptional quality</Box>
            <Box className="head-main-txt">
              It all began with a modest concept: Create amazing coffee
            </Box>
            <Divider width="40" height="2" bg="#DB9457" />
            <Box className="wel-txt">
              Our mission is to provide sustainably sourced, hand-picked quality
              coffee. Great coffee is our passion and we want to share it with
              you.
            </Box>
            <Box className="signup">
              {!authMember ? (
                <Button
                  // variant="contained"
                  className="signup-button"
                  onClick={() => setSignupOpen(true)}
                >
                  sign up
                </Button>
              ) : null}
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
