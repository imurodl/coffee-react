// First: PausedOrders.tsx
import React from "react";
import { Box, Stack, Button } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi, Messages } from "../../../lib/config";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";

const pausedOrderRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

interface OrdersProps {
  setValue: (value: string) => void;
}

export default function PausedOrders({ setValue }: OrdersProps) {
  const { pausedOrders } = useSelector(pausedOrderRetriever);
  const { authMember, setOrderBuilder } = useGlobals();

  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.DELETE,
      };
      const confirmation = window.confirm("Do you want to cancel this order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date());
      }
    } catch (err) {
      sweetErrorHandling(err);
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.PROCESS,
      };
      const confirmation = window.confirm("Do you want to proceed this order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      sweetErrorHandling(err);
    }
  };

  return (
    <TabPanel value="1">
      <Stack spacing={3}>
        {pausedOrders.length > 0 ? (
          pausedOrders.map((order: Order) => (
            <Box
              key={order._id}
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: "white",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              }}
            >
              <Stack spacing={2}>
                {order.orderItems.map((orderItem: OrderItem) => {
                  const product = order.productData.find(
                    (ele: Product) => ele._id === orderItem.productId
                  );
                  if (!product) return null;
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box
                      key={orderItem._id}
                      display="flex"
                      alignItems="center"
                      gap={2}
                    >
                      <img
                        src={imagePath}
                        alt=""
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 8,
                          objectFit: "cover",
                        }}
                      />
                      <Box>
                        <Box fontWeight={600}>{product.productName}</Box>
                        <Box fontSize={14} color="gray">
                          {orderItem.itemQuantity} x ${orderItem.itemPrice}
                        </Box>
                      </Box>
                    </Box>
                  );
                })}

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box fontWeight={700} fontSize={16}>
                    Total: ${order.orderTotal}
                  </Box>
                  <Stack direction="row" spacing={2}>
                    <Button
                      value={order._id}
                      onClick={deleteOrderHandler}
                      sx={{
                        display: "flex",
                        height: "43.75px",
                        padding: "13px 40px 14.75px 40px",
                        justifyContent: "center",
                        alignItems: "center",
                        flexShrink: 0,
                        border: "2px solid #DB9457",
                        backgroundColor: "transparent",
                        color: "#242434",
                        fontFamily: "Raleway",
                        fontSize: "13.6px",
                        fontWeight: 500,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#DB9457",
                          color: "#fff",
                        },
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      value={order._id}
                      onClick={processOrderHandler}
                      sx={{
                        display: "flex",
                        height: "43.75px",
                        padding: "13px 40px 14.75px 40px",
                        justifyContent: "center",
                        alignItems: "center",
                        flexShrink: 0,
                        border: "2px solid #DB9457",
                        backgroundColor: "transparent",
                        color: "#242434",
                        fontFamily: "Raleway",
                        fontSize: "13.6px",
                        fontWeight: 500,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#DB9457",
                          color: "#fff",
                        },
                      }}
                    >
                      Pay Now
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          ))
        ) : (
          <Box display="flex" justifyContent="center">
            <img
              src="/icons/noimage-list.svg"
              alt="no orders"
              style={{ width: 300, height: 300 }}
            />
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
