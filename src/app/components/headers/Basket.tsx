import React from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Divider,
  IconButton,
  Badge,
  Menu,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

export interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function Basket(props: BasketProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const history = useHistory();
  const itemsPrice = cartItems.reduce(
    (a: number, c: CartItem) => a + c.price * c.quantity,
    0
  );
  const shippingCost = itemsPrice < 100 ? 5 : 0;
  const totalPrice = (itemsPrice + shippingCost).toFixed(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const proceedOrderHandler = async () => {
    try {
      handleClose();
      if (!authMember) throw new Error(Messages.error2);

      const order = new OrderService();
      await order.createOrder(cartItems);

      onDeleteAll();
      setOrderBuilder(new Date());
      history.push("/orders");
    } catch (err) {
      sweetErrorHandling(err);
    }
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <Badge badgeContent={cartItems.length} color="secondary">
          <img src="/icons/shopping-cart.svg" alt="Cart" />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 2,
            borderRadius: 3,
            p: 2,
            minWidth: 350,
            boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
            fontFamily: "Raleway",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack spacing={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              sx={{
                color: "#3A3A3B",
                fontFamily: "Raleway",
                fontSize: "17px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "29px",
              }}
            >
              Your Cart
            </Typography>
            {cartItems.length > 0 && (
              <IconButton onClick={onDeleteAll} color="primary">
                <DeleteForeverIcon />
              </IconButton>
            )}
          </Box>

          <Divider />

          {cartItems.length === 0 ? (
            <Typography color="#777">Cart is empty.</Typography>
          ) : (
            cartItems.map((item: CartItem) => {
              const imagePath = `${serverApi}/${item.image}`;
              return (
                <Box key={item._id} display="flex" gap={2} alignItems="center">
                  <CancelIcon
                    sx={{ cursor: "pointer", color: "#6e4b3a" }}
                    onClick={() => onDelete(item)}
                  />
                  <img
                    src={imagePath}
                    alt={item.name}
                    style={{
                      width: 50,
                      height: 50,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                  <Box flex={1}>
                    <Typography fontWeight={500} fontSize={14}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price} x {item.quantity}
                    </Typography>
                  </Box>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Button
                      onClick={() => onRemove(item)}
                      sx={{
                        minWidth: 30,
                        fontSize: 16,
                        borderRadius: "999px",
                        padding: "2px 8px",
                        color: "#1e1e1e",
                        border: "1px solid #ccc",
                      }}
                    >
                      -
                    </Button>
                    <Button
                      onClick={() => onAdd(item)}
                      sx={{
                        minWidth: 30,
                        fontSize: 16,
                        borderRadius: "999px",
                        padding: "2px 8px",
                        color: "#fff",
                        backgroundColor: "#1e1e1e",
                        "&:hover": {
                          backgroundColor: "#6e4b3a",
                        },
                      }}
                    >
                      +
                    </Button>
                  </Stack>
                </Box>
              );
            })
          )}

          {cartItems.length > 0 && (
            <>
              <Divider />
              <Box display="flex" justifyContent="space-between">
                <Typography fontWeight={500}>Subtotal</Typography>
                <Typography>${itemsPrice.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography fontWeight={500}>Shipping</Typography>
                <Typography>${shippingCost.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography fontWeight={600}>Total</Typography>
                <Typography fontWeight={600}>${totalPrice}</Typography>
              </Box>
              <Button
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
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "29.75px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#DB9457",
                    color: "#FFFFFF",
                    borderColor: "#DB9457",
                  },
                }}
              >
                proceed to order
              </Button>
            </>
          )}
        </Stack>
      </Menu>
    </Box>
  );
}
