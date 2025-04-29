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

  /** HANDLERS **/
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
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <Badge badgeContent={cartItems.length} color="secondary">
          <ShoppingCartIcon />
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
            minWidth: 360,
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
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
                color: "#222",
                fontFamily: "Raleway",
                fontWeight: 700,
                fontSize: "18px",
              }}
            >
              Your Cart
            </Typography>
            {cartItems.length > 0 && (
              <IconButton onClick={onDeleteAll} size="small" color="error">
                <DeleteForeverIcon />
              </IconButton>
            )}
          </Box>

          <Divider />

          {cartItems.length === 0 ? (
            <Typography color="text.secondary" textAlign="center" py={4}>
              Your cart is empty.
            </Typography>
          ) : (
            cartItems.map((item: CartItem) => {
              const imagePath = `${serverApi}/${item.image}`;
              return (
                <Box
                  key={item._id}
                  display="flex"
                  alignItems="center"
                  gap={1.5}
                  py={1}
                >
                  <IconButton
                    onClick={() => onDelete(item)}
                    size="small"
                    sx={{ color: "#6e4b3a" }}
                  >
                    <CancelIcon fontSize="small" />
                  </IconButton>

                  <img
                    src={imagePath}
                    alt={item.name}
                    style={{
                      width: 45,
                      height: 45,
                      objectFit: "cover",
                      borderRadius: 8,
                      flexShrink: 0,
                    }}
                  />

                  <Box flex={1}>
                    <Typography fontWeight={500} fontSize="14px">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${item.price} × {item.quantity}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Button
                      onClick={() => onRemove(item)}
                      size="small"
                      sx={{
                        minWidth: 28,
                        height: 28,
                        borderRadius: "50%",
                        fontSize: 16,
                        color: "#333",
                        border: "1px solid #ccc",
                        padding: 0,
                      }}
                    >
                      -
                    </Button>
                    <Button
                      onClick={() => onAdd(item)}
                      size="small"
                      sx={{
                        minWidth: 28,
                        height: 28,
                        borderRadius: "50%",
                        fontSize: 16,
                        color: "#fff",
                        backgroundColor: "#1e1e1e",
                        "&:hover": {
                          backgroundColor: "#6e4b3a",
                        },
                        padding: 0,
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
              <Stack spacing={1}>
                <Box display="flex" justifyContent="space-between">
                  <Typography color="text.secondary">Subtotal</Typography>
                  <Typography>${itemsPrice.toFixed(2)}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography color="text.secondary">Shipping</Typography>
                  <Typography>${shippingCost.toFixed(2)}</Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mt={1}
                  fontWeight="bold"
                >
                  <Typography fontWeight={600}>Total</Typography>
                  <Typography fontWeight={600}>${totalPrice}</Typography>
                </Box>
              </Stack>

              <Button
                onClick={proceedOrderHandler}
                startIcon={<ShoppingCartIcon />}
                variant={"contained"}
                sx={{
                  display: "flex",
                  height: "44px",
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
