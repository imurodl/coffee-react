import React from "react";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { retrieveFinishedOrders } from "./selector";

/** REDUX SLICE & SELECTOR */
const finishedOrderRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

/** HANDLERS **/

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrderRetriever);

  return (
    <TabPanel value="3">
      <Stack>
        {finishedOrders.map((order: Order) => {
          return (
            <Box className="order-main-box" key={order._id}>
              <Box className="order-box-scroll">
                {order?.orderItems?.map((orderItem: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => orderItem.productId === ele._id
                  )[0];
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box className="orders-name-price" key={orderItem._id}>
                      <img src={imagePath} alt="" className="order-dish-img" />
                      <p className="title-dish">{product.productName}</p>
                      <Box className="price-box">
                        <p>{orderItem.itemPrice}</p>
                        <img src="/icons/close.svg" alt="" />
                        <p>{orderItem.itemQuantity}</p>
                        <img src="/icons/pause.svg" alt="" />
                        <p style={{ marginLeft: "15px" }}>
                          {orderItem.itemQuantity * orderItem.itemPrice}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className="total-price-box">
                <Box className="box-total">
                  <p>Product price</p>
                  <p>{order.orderTotal - order.orderDelivery}</p>
                  <img
                    src="/icons/plus.svg"
                    alt=""
                    style={{ marginLeft: "20px" }}
                  />
                  <p>Delivery cost</p>
                  <p>{order.orderDelivery}</p>
                  <img
                    src="/icons/pause.svg"
                    alt=""
                    style={{ marginLeft: "20px" }}
                  />
                  <p>Total</p>
                  <p>{order.orderTotal}</p>
                </Box>
              </Box>
            </Box>
          );
        })}
        {!finishedOrders ||
          (finishedOrders.length === 0 && (
            <Box display="flex" justifyContent="center">
              <img
                src="/icons/noimage-list.svg"
                alt=""
                style={{ width: 300, height: 300 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
