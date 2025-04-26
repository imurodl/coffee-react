import React, { useEffect, useState } from "react";
import { Container, Stack, Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { setChosenProduct, setProducts, setRestaurant } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { Member } from "../../../lib/types/member";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import {
  retrieveChosenProduct,
  retrieveProducts,
  retrieveRestaurant,
} from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import { ProductCollection } from "../../../lib/enums/product.enums";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

/** REDUC SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
  setRelatedProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const restaurantRetriever = createSelector(
  retrieveRestaurant,
  (restaurant) => ({
    restaurant,
  })
);
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);
const relatedProductsRetriever = createSelector(
  retrieveProducts,
  (relatedProducts) => ({
    relatedProducts,
  })
);

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd } = props;
  const { setChosenProduct } = actionDispatch(useDispatch());
  const { setRestaurant } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { restaurant } = useSelector(restaurantRetriever);
  const { productId } = useParams<{ productId: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { setRelatedProducts } = actionDispatch(useDispatch());
  const { relatedProducts } = useSelector(relatedProductsRetriever);
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();

    // First load main product
    product
      .getProduct(productId)
      .then((data) => {
        setChosenProduct(data);
      })
      .catch((err) => console.log(err));

    // Load restaurant info
    const member = new MemberService();
    member
      .getRestaurant()
      .then((data) => setRestaurant(data))
      .catch((err) => console.log(err));
  }, [productId]);

  /* HANDLERS */
  const choseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  useEffect(() => {
    if (!chosenProduct) return;

    const product = new ProductService();
    const searchInput = {
      page: 1,
      limit: 4,
      order: "productViews",
      productCollection: chosenProduct.productCollection,
      search: "",
    };

    product
      .getProducts(searchInput)
      .then((data) => setRelatedProducts(data))
      .catch((err) => console.log(err));
  }, [chosenProduct]);

  if (!chosenProduct) return null;
  return (
    <div className="chosen-product">
      <Container>
        <Box className={"title"}>Product Detail</Box>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={8}
          alignItems="flex-start"
          justifyContent="space-evenly"
          sx={{ mt: { xs: 4, md: 8 } }}
        >
          {/* Left: Image Gallery */}
          <Stack spacing={2} alignItems="center">
            <Box
              sx={{
                width: { xs: "320px", md: "500px" },
                height: { xs: "360px", md: "580px" },
                backgroundColor: "#f8f8ff",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 0 24px rgba(10,10,20,0.06)",
              }}
            >
              <img
                src={`${serverApi}/${chosenProduct.productImages[currentImageIndex]}`}
                alt="Main Product"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "16px",
                }}
              />
            </Box>

            {/* Thumbnails */}
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              justifyContent="center"
            >
              {chosenProduct.productImages.map((img, idx) => (
                <Box
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  sx={{
                    width: "70px",
                    height: "80px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    cursor: "pointer",
                    border:
                      idx === currentImageIndex
                        ? "2px solid #DB9457"
                        : "2px solid transparent",
                    transition: "border 0.3s ease",
                    backgroundColor: "#fff",
                    "&:hover": {
                      borderColor: "#DB9457",
                    },
                  }}
                >
                  <img
                    src={`${serverApi}/${img}`}
                    alt={`Thumbnail ${idx}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Stack>

          {/* Right: Product Details */}
          <Stack spacing={4} sx={{ maxWidth: "560px" }}>
            {/* Product Name */}
            <Typography
              fontFamily="Playfair Display"
              fontWeight={500}
              fontSize="35.7px"
              lineHeight="42.84px"
              color="#101020"
            >
              {chosenProduct.productName}
            </Typography>

            {/* Product Collection */}
            <Box>
              <Typography
                fontFamily="Raleway"
                fontWeight={600}
                fontSize="13px"
                letterSpacing="2px"
                textTransform="uppercase"
                color="#DB9457"
                mb={0.5}
              >
                Product Collection
              </Typography>
              <Typography
                fontFamily="Raleway"
                fontWeight={500}
                fontSize="15px"
                color="#3A3A3B"
                textTransform="capitalize"
              >
                {chosenProduct.productCollection.replace("_", " ")}
              </Typography>
            </Box>

            {/* Product Views */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <RemoveRedEyeIcon sx={{ color: "#DB9457", fontSize: "20px" }} />
              <Typography fontFamily="Raleway" fontSize="14px" color="#3A3A3B">
                {chosenProduct.productViews} views
              </Typography>
            </Stack>

            {/* Product Description */}
            <Box>
              <Typography
                fontFamily="Raleway"
                fontWeight={600}
                fontSize="13px"
                letterSpacing="2px"
                textTransform="uppercase"
                color="#DB9457"
                mb={0.5}
              >
                Product Description
              </Typography>
              <Typography
                fontFamily="Raleway"
                fontWeight={400}
                fontSize="17px"
                lineHeight="29.75px"
                color="#3A3A3B"
              >
                {chosenProduct.productDesc || "No description available."}
              </Typography>
            </Box>

            {/* Product Price */}
            <Typography
              fontFamily="Raleway"
              fontWeight={400}
              fontSize="26.4px"
              lineHeight="35.7px"
              color="#3A3A3B"
              mt={4}
            >
              ${chosenProduct.productPrice}
            </Typography>

            {/* Add to Basket Button */}
            <Button
              onClick={(e) => {
                onAdd({
                  _id: chosenProduct._id,
                  quantity: 1,
                  price: chosenProduct.productPrice,
                  image: chosenProduct.productImages[0],
                  name: chosenProduct.productName,
                });
                e.stopPropagation();
              }}
              sx={{
                display: "flex",
                height: "44px",
                width: "220px",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid #DB9457",
                backgroundColor: "transparent",
                color: "#242434",
                fontFamily: "Raleway",
                fontSize: "13.6px",
                fontWeight: "600",
                letterSpacing: "2px",
                textTransform: "uppercase",
                mt: 4,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "#DB9457",
                  color: "#fff",
                  borderColor: "#DB9457",
                },
              }}
            >
              Add to Basket
            </Button>
          </Stack>
        </Stack>
        <Box
          m={"48px 0 20px 0"}
          fontSize={"24px"}
          color={"#101020"}
          textAlign={"center"}
          fontFamily={"Raleway"}
          fontWeight={600}
          lineHeight={"33.6px"}
          letterSpacing={"6px"}
          textTransform={"uppercase"}
        >
          Related products
        </Box>
        <Stack className="related-products">
          {relatedProducts.length !== 0 ? (
            relatedProducts
              .filter((product) => product._id !== chosenProduct._id)
              .map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                const sizeVolume =
                  product.productCollection === ProductCollection.DRINK
                    ? product.productVolume + "l"
                    : product.productSize + " size";
                return (
                  <Stack
                    key={product._id}
                    className="product-card"
                    onClick={() => choseDishHandler(product._id)}
                  >
                    <Stack
                      className="product-img"
                      sx={{
                        backgroundImage: `url(${imagePath})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                      }}
                    >
                      <div className="product-sale">{sizeVolume}</div>
                    </Stack>
                    <Box className="product-desc">
                      <span className="product-title">
                        {product.productName}
                      </span>
                      <div className="product-desc">
                        <MonetizationOnIcon />
                        {product.productPrice}
                      </div>
                      <div className="text-hidden">SEE PRODUCT</div>
                    </Box>
                  </Stack>
                );
              })
          ) : (
            <Box className="no-data">Products are not available!</Box>
          )}
        </Stack>
      </Container>
    </div>
  );
}
