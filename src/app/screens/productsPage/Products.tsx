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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

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
    limit: 12,
    order: "createdAt",
    search: "",
  });
  const totalPages = Math.ceil(products.length / productSearch.limit);
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

  const searchAllHandler = () => {
    productSearch.page = 1;
    delete productSearch.productCollection;
    setProductSearch({ ...productSearch });
  };

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.limit = 8;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.limit = 8;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    productSearch.limit = 8;
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
              <Box className="top-text-title">shop</Box>
              <div className="spacer"></div>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  padding: "6px 12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  width: "350px",
                  maxWidth: "600px",
                  mx: "auto",
                }}
                className="search-bar"
              >
                <input
                  type="search"
                  name="singleSearch"
                  className="search-input"
                  placeholder="Type here..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchProductHandler();
                  }}
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    backgroundColor: "transparent",
                    fontSize: "16px",
                    fontFamily: "Raleway",
                    color: "#6F4E37",
                    paddingLeft: "10px",
                  }}
                />
                <Button
                  className="search-button"
                  variant="contained"
                  endIcon={<SearchIcon />}
                  onClick={searchProductHandler}
                  sx={{
                    border: "none",
                    background: "#101020",
                    color: "#db9457",
                    borderRadius: "5px",
                    textTransform: "none",
                    fontWeight: 600,
                    fontFamily: "Raleway",
                    "&:hover": {
                      background: "#DB9457",
                      color: "#101020",
                    },
                  }}
                >
                  Search
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
                  sx={{
                    color: productSearch.productCollection ? "#666" : "#fff",
                    background: productSearch.productCollection
                      ? "#fff"
                      : "#db9457",
                  }}
                  onClick={searchAllHandler}
                >
                  shop All
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    color:
                      productSearch.productCollection ===
                      ProductCollection.WHOLE_BEAN
                        ? "#fff"
                        : "#666",
                    background:
                      productSearch.productCollection ===
                      ProductCollection.WHOLE_BEAN
                        ? "#db9457"
                        : "#fff",
                  }}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.WHOLE_BEAN)
                  }
                >
                  WHOLE BEAN
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    color:
                      productSearch.productCollection ===
                      ProductCollection.GROUND
                        ? "#fff"
                        : "#666",
                    background:
                      productSearch.productCollection ===
                      ProductCollection.GROUND
                        ? "#db9457"
                        : "#fff",
                  }}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.GROUND)
                  }
                >
                  GROUND
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    color:
                      productSearch.productCollection ===
                      ProductCollection.DRINK
                        ? "#fff"
                        : "#666",
                    background:
                      productSearch.productCollection ===
                      ProductCollection.DRINK
                        ? "#db9457"
                        : "#fff",
                  }}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DRINK)
                  }
                >
                  DRINK
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    color:
                      productSearch.productCollection ===
                      ProductCollection.INSTANT
                        ? "#fff"
                        : "#666",
                    background:
                      productSearch.productCollection ===
                      ProductCollection.INSTANT
                        ? "#db9457"
                        : "#fff",
                  }}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.INSTANT)
                  }
                >
                  INSTANT
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    color:
                      productSearch.productCollection ===
                      ProductCollection.OTHER
                        ? "#fff"
                        : "#666",
                    background:
                      productSearch.productCollection ===
                      ProductCollection.OTHER
                        ? "#db9457"
                        : "#fff",
                  }}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.OTHER)
                  }
                >
                  Other
                </Button>
              </div>
            </Stack>

            <Stack
              className="product-wrapper"
              sx={{ display: products.length !== 0 ? "grid" : "flex" }}
            >
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
                          <ShoppingCartIcon />
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
              count={totalPages}
              page={productSearch.page}
              onChange={paginationHandler}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color="secondary"
                  sx={{
                    fontFamily: "Raleway",
                    fontSize: "13.6px",
                    fontWeight: 500,
                    "&.Mui-selected": {
                      fontWeight: 600,
                      fontSize: "14.2px",
                    },
                  }}
                />
              )}
              sx={{
                "& .MuiPagination-ul": {
                  justifyContent: "center",
                  gap: "8px",
                },
              }}
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
