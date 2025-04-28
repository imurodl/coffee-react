import React from "react";
import { Container, Stack, Box } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enums";
import { useHistory } from "react-router-dom";

/** REDUC SLICE & SELECTOR */
const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export default function NewDishes() {
  const history = useHistory();
  const choseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  const { newDishes } = useSelector(newDishesRetriever);

  return (
    <div className="new-products-frame">
      <Container>
        <Stack className="main">
          <Typography className="info-subt">fresh menu</Typography>
          <Typography className="info-title">Now Roasting</Typography>
          <Divider width="2" height="40" bg="#DB9457" />

          <Stack className="cards-wrapper">
            {newDishes.length !== 0 ? (
              newDishes.map((product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                const sizeVolume =
                  product.productCollection === ProductCollection.DRINK
                    ? `${product.productVolume}L`
                    : `${product.productSize} size`;

                return (
                  <Box
                    key={product._id}
                    className="card"
                    onClick={() => choseDishHandler(product._id)}
                  >
                    <div className="badge">{sizeVolume}</div>
                    <img src={imagePath} alt="" />
                    <p className="product-name">{product.productName}</p>
                    <p className="product-price">${product.productPrice}</p>

                    <div className="hidden">see product</div>
                  </Box>
                );
              })
            ) : (
              <Box className="no-data">New products are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
