import React, { useEffect } from "react";
import FeaturedProducts from "./FeaturedProducts";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setFeaturedProducts,
  setNewDishes,
  setPopularDishes,
  setTopUsers,
} from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enums";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import "../../../css/home.css";

/** REDUC SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
  setFeaturedProducts: (data: Product[]) => dispatch(setFeaturedProducts(data)),
});

export default function HomePage() {
  const { setPopularDishes, setNewDishes, setTopUsers, setFeaturedProducts } =
    actionDispatch(useDispatch());
  // Selector: STORE => DATA

  useEffect(() => {
    // Bace=kend server data fetch => DATA
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.WHOLE_BEAN,
      })
      .then((data) => {
        setPopularDishes(data);
      })
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 3,
        order: "createdAt",
        productCollection: ProductCollection.WHOLE_BEAN,
        direction: 1,
      })
      .then((data) => {
        setFeaturedProducts(data);
      })
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
      })
      .then((data) => setNewDishes(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="homepage">
      <FeaturedProducts />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}

// slice: DATA => STORE
// setPopularDishes(result);
