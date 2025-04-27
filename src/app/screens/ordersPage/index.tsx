import { useState, useEffect, SyntheticEvent } from "react";
import {
  Box,
  Container,
  Stack,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

export default function OrdersPage() {
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 8,
    orderStatus: OrderStatus.PAUSE,
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const { authMember, orderBuilder } = useGlobals();

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => dispatch(setPausedOrders(data)))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => dispatch(setProcessOrders(data)))
      .catch((err) => console.log(err));

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => dispatch(setFinishedOrders(data)))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  const handleTabChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) history.push("/");

  return (
    <Box sx={{ bgcolor: "#f8f8ff", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontFamily="Raleway"
          fontSize="28px"
          fontWeight={600}
          letterSpacing="6px"
          textTransform="uppercase"
          color="#101020"
          textAlign="center"
          mb={5}
        >
          My Orders
        </Typography>

        <Grid container spacing={6}>
          {/* LEFT SIDE - ORDERS LIST */}
          <Grid item xs={12} md={7}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  textColor="inherit"
                  indicatorColor="secondary"
                  sx={{
                    "& .MuiTab-root": {
                      fontFamily: "Raleway",
                      fontWeight: 600,
                      fontSize: 14,
                      textTransform: "uppercase",
                    },
                  }}
                >
                  <Tab label="Paused" value="1" />
                  <Tab label="Processing" value="2" />
                  <Tab label="Finished" value="3" />
                </Tabs>
              </Box>
              <TabPanel value="1">
                <PausedOrders setValue={setValue} />
              </TabPanel>
              <TabPanel value="2">
                <ProcessOrders setValue={setValue} />
              </TabPanel>
              <TabPanel value="3">
                <FinishedOrders />
              </TabPanel>
            </TabContext>
          </Grid>

          {/* RIGHT SIDE - PAYMENT FORM */}
          <Grid item xs={12} md={5}>
            <Box
              p={4}
              bgcolor="#fff"
              borderRadius={4}
              boxShadow="0 4px 20px rgba(0,0,0,0.1)"
              display="flex"
              flexDirection="column"
              gap={3}
            >
              <Typography
                fontFamily="Raleway"
                fontWeight={600}
                fontSize={22}
                color="#101020"
                textAlign="center"
              >
                Payment Information
              </Typography>

              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Cardholder Name"
                  placeholder="Justin Robertson"
                  InputProps={{
                    startAdornment: <LocalAtmIcon sx={{ mr: 1 }} />,
                  }}
                />

                <TextField
                  fullWidth
                  label="Card Number"
                  placeholder="5243 4090 2002 7495"
                  InputProps={{
                    startAdornment: <CreditCardIcon sx={{ mr: 1 }} />,
                  }}
                />

                <Stack direction="row" spacing={2}>
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    placeholder="07/24"
                  />
                  <TextField fullWidth label="CVV" placeholder="010" />
                </Stack>
              </Stack>

              <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
                <img
                  src="/icons/visa-card.svg"
                  alt="Visa"
                  style={{ width: 50 }}
                />
                <img
                  src="/icons/master-card.svg"
                  alt="MasterCard"
                  style={{ width: 50 }}
                />
                <img
                  src="/icons/paypal-card.svg"
                  alt="Paypal"
                  style={{ width: 50 }}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
