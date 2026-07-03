import React, { useState } from "react";
import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import Divider from "../../components/divider";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFeaturedProducts } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import ProductGrid from "../../components/ProductGrid";
import SectionHeader from "../../components/SectionHeader";
import CtaButton from "../../components/CtaButton";

/** REDUC SLICE & SELECTOR */
const featuredProductsRetriever = createSelector(
  retrieveFeaturedProducts,
  (featuredProducts) => ({ featuredProducts })
);

export default function FeaturedProducts() {
  const navigate = useNavigate();
  const choseDishHandler = (id: string) => {
    navigate(`/products/${id}`);
  };

  const { featuredProducts } = useSelector(featuredProductsRetriever);

  return (
    <div className="static-frame">
      <Container>
        <Stack className="info">
          <SectionHeader subtitle="featured products" title="Our Coffee" />
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
              href="#/products"
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
          <Box sx={{ width: "100%", mt: { xs: 4, md: 6 } }}>
            {featuredProducts.length !== 0 ? (
              <ProductGrid>
                {featuredProducts.map((product: Product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onOpen={choseDishHandler}
                    showStock={false}
                  />
                ))}
              </ProductGrid>
            ) : (
              <Box className="no-data">Featured products are not available!</Box>
            )}
          </Box>
          <CtaButton LinkComponent={"a"} href="#/products" sx={{ mt: 4 }}>
            shop all coffee
          </CtaButton>
        </Stack>
      </Container>
    </div>
  );
}
