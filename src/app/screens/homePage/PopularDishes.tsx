import React from "react";
import { Container, Stack, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useNavigate } from "react-router-dom";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import ProductGrid from "../../components/ProductGrid";
import ProductOverlayCard from "../../components/ProductOverlayCard";
import SectionHeader from "../../components/SectionHeader";

/** REDUC SLICE & SELECTOR */
const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);

export default function PopularDishes() {
  const navigate = useNavigate();
  const choseDishHandler = (id: string) => {
    navigate(`/products/${id}`);
  };

  const { popularDishes } = useSelector(popularDishesRetriever);

  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section" sx={{ alignItems: "center" }}>
          <SectionHeader subtitle="spotlight" title="Popular Products" />
          <Box sx={{ width: "100%", mt: { xs: 4, md: 6 } }}>
            {popularDishes.length !== 0 ? (
              <ProductGrid>
                {popularDishes.map((product: Product) => (
                  <ProductOverlayCard
                    key={product._id}
                    product={product}
                    onOpen={choseDishHandler}
                  />
                ))}
              </ProductGrid>
            ) : (
              <Box className="no-data">Popular products are not available!</Box>
            )}
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
