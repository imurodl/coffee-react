import React from "react";
import { Container, Stack, Box, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import Divider from "../../components/divider";
import { useNavigate } from "react-router-dom";

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
        <Stack className="popular-section">
          <Typography className="info-subt">spotlight</Typography>
          <Typography className="info-title">Popular Products</Typography>
          <Divider width="2" height="40" bg="#DB9457" />
          <Stack className="cards-frame">
            {popularDishes.length !== 0 ? (
              popularDishes.map((ele: Product) => {
                const imagePath = `${serverApi}/${ele.productImages[0]}`;
                return (
                  <Box
                    key={ele._id}
                    className={"card"}
                    onClick={() => choseDishHandler(ele._id)}
                  >
                    <img
                      src={imagePath}
                      alt={ele.productName}
                      loading="lazy"
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <Box
                      className="card-cover"
                      sx={{ position: "absolute", inset: 0 }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        p: 2,
                      }}
                    >
                      <Stack
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        sx={{ mb: 1 }}
                      >
                        <Typography
                          sx={{
                            color: "#fff",
                            fontSize: "18px",
                            fontWeight: 600,
                          }}
                        >
                          {ele.productName}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            color: "rgba(255,255,255,0.85)",
                            alignItems: "center",
                            display: "flex",
                          }}
                        >
                          {ele.productViews}
                          <VisibilityIcon
                            sx={{ fontSize: 22, marginLeft: "5px" }}
                          />
                        </Typography>
                      </Stack>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.75,
                          pt: 1.5,
                          borderTop: "1px solid rgba(255,255,255,0.3)",
                          color: "rgba(255,255,255,0.85)",
                        }}
                      >
                        <DescriptionOutlinedIcon sx={{ fontSize: 20 }} />
                        <Typography sx={{ color: "inherit", fontSize: "14px" }}>
                          {ele.productDesc?.slice(0, 20)}...
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box className="no-data">Popular products are not available!</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
