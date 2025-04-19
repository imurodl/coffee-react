import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";

const Footers = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  background: #101020;
  background-size: cover;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <Stack className="footer-table" flexDirection={"row"}>
          <Stack className="table">
            <Typography className="table-list-head">about</Typography>
            <Stack className="table-list">
              <div>The Company</div>
              <div>Faq</div>
              <div>Privacy Policy</div>
            </Stack>
          </Stack>
          <Stack className="table">
            <Typography className="table-list-head">about</Typography>
            <Stack className="table-list">
              <div>The Company</div>
              <div>Faq</div>
              <div>Privacy Policy</div>
            </Stack>
          </Stack>
          <Stack className="table table-last">
            <Typography className="table-list-head">about</Typography>
            <Stack
              flexDirection={"row"}
              paddingBottom={"30px"}
              gap={"24px"}
              width={"352px"}
              justifyContent={"center"}
            >
              <FacebookIcon sx={{ color: "#fff" }} />
              <InstagramIcon sx={{ color: "#fff" }} />
              <TelegramIcon sx={{ color: "#fff" }} />
            </Stack>
          </Stack>
        </Stack>
        <Stack className="footer-foot" flexDirection={'row'}>
          <Box sx={{ width: "33%" }} component={"div"}>
            <Typography component={"p"}>
              © 2020 amaya. All Rights Reserved.
            </Typography>
          </Box>
          <Box sx={{ width: "33%", textAlign: "center" }}>
            <img
              src="/img/amaya-white.png"
              alt=""
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
