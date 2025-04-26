import React, { useState } from "react";
import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import Divider from "../../components/divider";

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<number[]>([1, 2, 3]);
  return (
    <div className="static-frame">
      <Container>
        <Stack className="info">
          <Typography className="info-subt">featured products</Typography>
          <Typography className="info-title">Our Coffee</Typography>
          <Divider width="2" height="40" bg="#DB9457" />
          <Stack className="info-banner">
            <Typography className="info-banner-title">
              Trio Blend Box
            </Typography>
            <Typography className="info-banner-subt">
              This box contains all three of our delicious, ethically sourced
              coffee blends.
            </Typography>
            <Button
              LinkComponent={"a"}
              href="/products"
              sx={{
                marginTop: "45px",
                display: "flex",
                width: "240px",
                height: "43.75px",
                padding: "13px 40px 14.75px 40px",
                justifyContent: "center",
                alignItems: "center",
                flexShrink: 0,
                border: "none",
                backgroundColor: "#fff",
                color: "#101020",
                fontFamily: "Raleway",
                fontSize: "13.6px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "29.75px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                textAlign: "center",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#101020",
                  color: "#FFFFFF",
                  borderColor: "#DB9457",
                },
              }}
            >
              open the box
            </Button>
          </Stack>
          <Stack
            className="cards-wrapper"
            flexDirection={"row"}
            sx={{ mt: "48px" }}
          >
            {featuredProducts.map(() => {
              return (
                <Box className="card">
                  <img src="/img/coffee-featured.jpg" alt="" />
                  <p>Swiss Water Decaf</p>
                  <div>$19.00 - $27.00</div>
                </Box>
              );
            })}
          </Stack>
          <Button
            className="info-main-btn"
            LinkComponent={"a"}
            href="/products"
            sx={{
              display: "flex",
              width: "260px",
              height: "43.75px",
              padding: "13px 40px 14.75px 40px",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              border: "2px solid #DB9457",
              backgroundColor: "transparent",
              color: "#242434",
              fontFamily: "Raleway",
              fontSize: "13.6px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "29.75px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              textAlign: "center",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#DB9457",
                color: "#FFFFFF",
                borderColor: "#DB9457",
              },
            }}
          >
            shop all coffee
          </Button>
        </Stack>
      </Container>
    </div>
  );
}
