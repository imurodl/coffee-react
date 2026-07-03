import React from "react";
import { Container, Stack, Box, Typography } from "@mui/material";
import Divider from "../../components/divider";
import ProductCard from "../../components/ProductCard";
import ProductGrid from "../../components/ProductGrid";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enums";
import { useNavigate } from "react-router-dom";

/** REDUC SLICE & SELECTOR */
const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export default function NewDishes() {
  const navigate = useNavigate();
  const choseDishHandler = (id: string) => {
    navigate(`/products/${id}`);
  };

  const { newDishes } = useSelector(newDishesRetriever);

  return (
    <div className="new-products-frame">
      <Container>
        <Stack className="main">
          <Typography className="info-subt">fresh menu</Typography>
          <Typography className="info-title">Now Roasting</Typography>
          <Divider width="2" height="40" bg="#DB9457" />

          <Box sx={{ width: "100%", mt: { xs: 4, md: 6 } }}>
            {newDishes.length !== 0 ? (
              <ProductGrid>
                {newDishes.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onOpen={choseDishHandler}
                    showStock={false}
                  />
                ))}
              </ProductGrid>
            ) : (
              <Box className="no-data">New products are not available!</Box>
            )}
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
