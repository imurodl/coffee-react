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
            <div className="info-banner-btn">
              <a href="/products">open the box</a>
            </div>
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
          >
            shop all coffee
          </Button>
        </Stack>
      </Container>
    </div>
  );
}
