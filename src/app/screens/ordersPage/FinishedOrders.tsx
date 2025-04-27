import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveFinishedOrders } from "./selector";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import moment from "moment";

// Selector
const finishedOrderRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrderRetriever);

  return (
    <Stack spacing={4}>
      {finishedOrders.length > 0 ? (
        finishedOrders.map((order: Order) => (
          <Box
            key={order._id}
            p={3}
            bgcolor="white"
            borderRadius={4}
            boxShadow="0 4px 20px rgba(0,0,0,0.08)"
          >
            <Stack spacing={2}>
              {order.orderItems.map((orderItem: OrderItem) => {
                const product: Product = order.productData.find(
                  (p: Product) => p._id === orderItem.productId
                )!;
                const imagePath = `${serverApi}/${product.productImages[0]}`;

                return (
                  <Stack
                    key={orderItem._id}
                    direction="row"
                    alignItems="center"
                    spacing={2}
                  >
                    <img
                      src={imagePath}
                      alt={product.productName}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 8,
                        objectFit: "cover",
                      }}
                    />
                    <Stack>
                      <Typography fontFamily="Raleway" fontWeight={600}>
                        {product.productName}
                      </Typography>
                      <Typography fontSize={14} color="text.secondary">
                        {orderItem.itemQuantity} x ${orderItem.itemPrice} ={" "}
                        <strong>
                          ${orderItem.itemQuantity * orderItem.itemPrice}
                        </strong>
                      </Typography>
                    </Stack>
                  </Stack>
                );
              })}

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mt={2}
              >
                <Box>
                  <Typography fontFamily="Raleway" fontWeight={600}>
                    Total Paid: ${order.orderTotal}
                  </Typography>
                  <Typography fontSize={13} color="text.secondary" mt={0.5}>
                    {moment(order.createdAt).format("YYYY-MM-DD HH:mm")}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    px: 3,
                    py: 1,
                    bgcolor: "#DB9457",
                    borderRadius: "30px",
                    color: "#fff",
                    fontFamily: "Raleway",
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Completed
                </Box>
              </Stack>
            </Stack>
          </Box>
        ))
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="300px"
        >
          <Typography color="text.secondary">
            No finished orders yet.
          </Typography>
        </Box>
      )}
    </Stack>
  );
}
