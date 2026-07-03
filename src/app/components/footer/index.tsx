import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import { brand } from "../../MaterialTheme/tokens";

const headSx = {
  color: brand.orange,
  textTransform: "uppercase" as const,
  letterSpacing: "2px",
  fontSize: 13,
  fontWeight: 600,
  mb: 2,
};

const linkSx = {
  color: "rgba(255,255,255,.72)",
  textDecoration: "none",
  fontSize: 15,
  transition: "color .2s ease",
  "&:hover": { color: "#fff" },
};

const socialSx = {
  color: "#fff",
  transition: "color .2s ease",
  "&:hover": { color: brand.orange },
};

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: brand.dark, color: "#fff", mt: 8 }}>
      <Container sx={{ py: { xs: 5, md: 8 } }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 4, sm: 2 }}
          justifyContent="space-between"
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          <Stack spacing={1.2} alignItems={{ xs: "center", sm: "flex-start" }}>
            <Typography sx={headSx}>explore</Typography>
            <Typography component={Link} to="/" sx={linkSx}>
              Home
            </Typography>
            <Typography component={Link} to="/products" sx={linkSx}>
              Shop Coffee
            </Typography>
            <Typography component={Link} to="/help" sx={linkSx}>
              Help &amp; Contact
            </Typography>
          </Stack>

          <Stack spacing={1.2} alignItems={{ xs: "center", sm: "flex-start" }}>
            <Typography sx={headSx}>company</Typography>
            <Typography component={Link} to="/help" sx={linkSx}>
              About Us
            </Typography>
            <Typography component={Link} to="/help" sx={linkSx}>
              FAQ
            </Typography>
            <Typography component={Link} to="/help" sx={linkSx}>
              Privacy Policy
            </Typography>
          </Stack>

          <Stack spacing={2} alignItems={{ xs: "center", sm: "flex-start" }}>
            <Typography sx={headSx}>follow along</Typography>
            <Stack direction="row" spacing={2.5}>
              <a
                href="https://facebook.com/amayacoffee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amaya on Facebook"
              >
                <FacebookIcon sx={socialSx} />
              </a>
              <a
                href="https://instagram.com/amayacoffee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amaya on Instagram"
              >
                <InstagramIcon sx={socialSx} />
              </a>
              <a
                href="https://t.me/amayacoffee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Amaya on Telegram"
              >
                <TelegramIcon sx={socialSx} />
              </a>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{
            mt: { xs: 4, md: 6 },
            pt: 3,
            borderTop: "1px solid rgba(255,255,255,.12)",
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
              color: "rgba(255,255,255,.6)",
              order: { xs: 2, md: 1 },
            }}
          >
            © {new Date().getFullYear()} Amaya Roasting Co. All Rights Reserved.
          </Typography>
          <Box
            component="img"
            src="/img/amaya-white.png"
            alt="Amaya Roasting Co."
            sx={{ width: 96, order: { xs: 1, md: 2 } }}
          />
          <Typography
            sx={{
              fontSize: 13,
              color: "rgba(255,255,255,.6)",
              order: 3,
            }}
          >
            because we love coffee
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
