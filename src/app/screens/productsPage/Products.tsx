import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Dispatch } from "@reduxjs/toolkit";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { setProducts } from "./slice";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enums";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

/** REDUC SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.WHOLE_BEAN,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS */

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const choseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="products">
      <Container>
        <Stack alignItems={"center"}>
          <Stack className="avatar-big-box">
            <Stack className="top-text">
              <Box className="top-text-title">Burak Restaurant</Box>
              <div className="spacer"></div>
              <Stack className="search-bar">
                <input
                  type={"search"}
                  name={"singleSearch"}
                  className={"search-input"}
                  placeholder={"Type here"}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") searchProductHandler();
                  }}
                />
                <Button
                  className="search-button"
                  variant="contained"
                  endIcon={<SearchIcon />}
                  onClick={searchProductHandler}
                >
                  SEARCH
                </Button>
              </Stack>
            </Stack>
          </Stack>
          <Stack className="dishes-filter-section">
            <Stack className="dishes-filter-box">
              <Button
                variant="contained"
                className="order"
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>
              <Button
                variant="contained"
                className="order"
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>
              <Button
                variant="contained"
                className="order"
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
          </Stack>
          <Stack className="list-category-section">
            <Stack className="product-category">
              <div className="category-main">
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.OTHER
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.OTHER)
                  }
                >
                  Other
                </Button>
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection ===
                    ProductCollection.INSTANT
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.INSTANT)
                  }
                >
                  Dessert
                </Button>
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.DRINK
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DRINK)
                  }
                >
                  Drink
                </Button>
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection ===
                    ProductCollection.WHOLE_BEAN
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.WHOLE_BEAN)
                  }
                >
                  Dish
                </Button>
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.GROUND
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.GROUND)
                  }
                >
                  Dish
                </Button>
              </div>
            </Stack>

            <Stack className="product-wrapper">
              {products.length !== 0 ? (
                products.map((product: Product) => {
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
                        <Button
                          className="shop-btn"
                          onClick={(e) => {
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              price: product.productPrice,
                              image: product.productImages[0],
                              name: product.productName,
                            });
                            e.stopPropagation();
                          }}
                        >
                          <img
                            src="/icons/shopping-cart.svg"
                            alt=""
                            style={{ display: "flex" }}
                          />
                        </Button>
                        <Button className="view-btn" sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className="product-desc">
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <div className="product-desc">
                          <MonetizationOnIcon />
                          {product.productPrice}
                        </div>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </Stack>
          </Stack>
          <Stack className="pagination-section">
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              }
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color="secondary"
                />
              )}
              onChange={paginationHandler}
            />
          </Stack>
        </Stack>
      </Container>
      <div className="brands-logo">
        <Container className="family-brands">
          <Box className="category-title">our family brands</Box>
          <Stack className="brand-list">
            <Box className="review-box">
              <img src="/img/gurme.webp" alt="" />
            </Box>
            <Box className="review-box">
              <img src="/img/seafood.webp" alt="" />
            </Box>
            <Box className="review-box">
              <img src="/img/sweets.webp" alt="" />
            </Box>
            <Box className="review-box">
              <img src="/img/doner.webp" alt="" />
            </Box>
          </Stack>
        </Container>
      </div>
      <div className="address">
        <Container>
          <Stack className="address-area">
            <Box className="title">Our address</Box>
            <iframe
              style={{ marginTop: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1630.90707688153!2d129.1601690511344!3d35.16125539637475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35688d5dbec08845%3A0xca3c2cb61605b2f2!2z67aA7IKw6rSR7Jet7IucIO2VtOyatOuMgOq1rCDspJHrj5kgMTM5My01Nw!5e0!3m2!1sko!2skr!4v1737156968503!5m2!1sko!2skr"
              width="1320"
              height="500"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
