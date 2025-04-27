import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Stack,
  TextField,
} from "@mui/material";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";
import { OrderUpdateInput } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { Messages } from "../../../lib/config";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";

interface PaymentModalProps {
  open: boolean;
  orderId: string | null;
  onClose: () => void;
  refreshOrders: () => void;
}

const steps = ["Shipping Address", "Payment Details", "Review Your Order"];

export default function PaymentModal({
  open,
  orderId,
  onClose,
  refreshOrders,
}: PaymentModalProps) {
  const { authMember } = useGlobals();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleConfirmPayment();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleConfirmPayment = async () => {
    try {
      if (!authMember || !orderId) throw new Error(Messages.error2);

      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const order = new OrderService();
      await order.updateOrder(input);

      await sweetTopSmallSuccessAlert("Order confirmed!", 1000);
      refreshOrders();
      onClose();
      setActiveStep(0);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent sx={{ py: 4 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box mt={4}>
          {activeStep === 0 && (
            <Stack spacing={2}>
              <Typography variant="h6">Shipping Address</Typography>
              <TextField
                fullWidth
                label="Full Name"
                defaultValue={authMember?.memberNick}
              />
              <TextField
                fullWidth
                label="Address"
                defaultValue={authMember?.memberAddress}
              />
            </Stack>
          )}

          {activeStep === 1 && (
            <Stack spacing={2}>
              <Typography variant="h6">Payment Details</Typography>
              <TextField
                fullWidth
                label="Card Number"
                placeholder="XXXX XXXX XXXX XXXX"
              />
              <Stack direction="row" spacing={2}>
                <TextField label="Expiry Date" placeholder="MM/YY" fullWidth />
                <TextField label="CVV" placeholder="XXX" fullWidth />
              </Stack>
            </Stack>
          )}

          {activeStep === 2 && (
            <Stack spacing={2}>
              <Typography variant="h6">Review Your Order</Typography>
              <Typography>
                Your shipping address: {authMember?.memberAddress}
              </Typography>
              <Typography>Payment method: Credit Card</Typography>
            </Stack>
          )}
        </Box>

        <Stack direction="row" justifyContent="space-between" mt={4}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1 ? "Confirm" : "Next"}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
