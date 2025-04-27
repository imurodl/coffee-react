import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { retrieveProcessOrders } from "./selector";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi, Messages } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { T } from "../../../lib/types/common";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import moment from "moment";

// Use your existing selector properly
const processOrderRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);

interface OrdersProps {
  setValue: (value: string) => void;
}

export default function ProcessOrders({ setValue }: OrdersProps) {
  const { processOrders } = useSelector(processOrderRetriever);
  const { authMember, setOrderBuilder } = useGlobals();

  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirmation = window.confirm(
        "Confirm that you received the order?"
      );
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date());
        setValue("3");
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err);
    }
  };

  return (
    <Stack spacing={4}>
      {processOrders.length > 0 ? (
        processOrders.map((order: Order) => (
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
                    Total: ${order.orderTotal}
                  </Typography>
                  <Typography fontSize={13} color="text.secondary" mt={0.5}>
                    {moment(order.createdAt).format("YYYY-MM-DD HH:mm")}
                  </Typography>
                </Box>

                <Button
                  value={order._id}
                  onClick={finishOrderHandler}
                  sx={{
                    height: "43.75px",
                    px: "40px",
                    fontFamily: "Raleway",
                    fontSize: "13.6px",
                    fontWeight: 600,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    border: "2px solid #DB9457",
                    backgroundColor: "transparent",
                    color: "#242434",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#DB9457",
                      color: "#FFFFFF",
                      borderColor: "#DB9457",
                    },
                  }}
                >
                  Verify Received
                </Button>
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
            No processing orders yet.
          </Typography>
        </Box>
      )}
    </Stack>
  );
}
