import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";

const Footers = styled("div")`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  background: #101020;
  background-size: cover;
`;

const socialIconSx = {
  color: "#fff",
  cursor: "pointer",
  "&:hover": { color: "#db9457", transition: "all 1s ease" },
};

export default function Footer() {
  return (
    <Footers>
      <Container>
        <Stack className="footer-table" flexDirection={"row"}>
          <Stack className="table">
            <Typography className="table-list-head">explore</Typography>
            <Stack className="table-list">
              <Link to="/">Home</Link>
              <Link to="/products">Shop Coffee</Link>
              <Link to="/help">Help &amp; Contact</Link>
            </Stack>
          </Stack>
          <Stack className="table">
            <Typography className="table-list-head">company</Typography>
            <Stack className="table-list">
              <Link to="/help">About Us</Link>
              <Link to="/help">FAQ</Link>
              <Link to="/help">Privacy Policy</Link>
            </Stack>
          </Stack>
          <Stack className="table table-last">
            <Typography className="table-list-head">follow along</Typography>
            <Stack
              flexDirection={"row"}
              paddingBottom={"30px"}
              gap={"24px"}
              width={"352px"}
              justifyContent={"center"}
            >
              <a
                href="https://facebook.com/amayacoffee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amaya on Facebook"
              >
                <FacebookIcon sx={socialIconSx} />
              </a>
              <a
                href="https://instagram.com/amayacoffee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amaya on Instagram"
              >
                <InstagramIcon sx={socialIconSx} />
              </a>
              <a
                href="https://t.me/amayacoffee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amaya on Telegram"
              >
                <TelegramIcon sx={socialIconSx} />
              </a>
            </Stack>
          </Stack>
        </Stack>
        <Stack className="footer-foot" flexDirection={"row"}>
          <Box sx={{ width: "33%" }} component={"div"}>
            <Typography component={"p"}>
              © {new Date().getFullYear()} Amaya Roasting Co. All Rights
              Reserved.
            </Typography>
          </Box>
          <Box sx={{ width: "33%", textAlign: "center" }}>
            <img
              src="/img/amaya-white.png"
              alt="Amaya Roasting Co."
              style={{ width: "96.36px" }}
            />
          </Box>
          <Box
            sx={{
              width: "33%",
              display: "flex",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
            component={"div"}
          >
            <Typography component={"p"}>because we love coffee</Typography>
          </Box>
        </Stack>
      </Container>
    </Footers>
  );
}
