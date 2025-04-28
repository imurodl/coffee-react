import React, { useState } from "react";
import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import Divider from "../../components/divider";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFeaturedProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

/** REDUC SLICE & SELECTOR */
const featuredProductsRetriever = createSelector(
  retrieveFeaturedProducts,
  (featuredProducts) => ({ featuredProducts })
);

export default function FeaturedProducts() {
  const history = useHistory();
  const choseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  const { featuredProducts } = useSelector(featuredProductsRetriever);

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
            {featuredProducts.length !== 0 ? (
              featuredProducts.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <Box
                    className="card"
                    id={product._id}
                    onClick={() => choseDishHandler(product._id)}
                  >
                    <img src={imagePath} alt="" />
                    <p>{product?.productName}</p>
                    <div>$ {product?.productPrice}</div>
                    <div className="hidden">select options</div>
                  </Box>
                );
              })
            ) : (
              <Box className="no-data">Popular products are not available!</Box>
            )}
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
