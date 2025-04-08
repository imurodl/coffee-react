import React from "react";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

/** REDUX SLICE & SELECTOR */
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

  /** HANDLERS **/
  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };
      const confirmation = window.confirm("Have you received your order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("3");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value="2">
      <Stack>
        {processOrders.map((order: Order) => {
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
                        <img src="/icons/close.svg" alt="" />
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
                <p className="data-compl">
                  {moment().format("YY-MM-DD HH:mm")}
                </p>
                <Button
                  value={order._id}
                  className="verify-button"
                  variant="contained"
                  onClick={finishOrderHandler}
                >
                  verify to fulfil
                </Button>
              </Box>
            </Box>
          );
        })}
        {!processOrders ||
          (processOrders.length === 0 && (
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
