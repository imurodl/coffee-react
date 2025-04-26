import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab, Stack, TextField, Typography, Box, Button } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import { T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import { LoginInput, MemberInput } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "12px",
    padding: theme.spacing(4),
    boxShadow: theme.shadows[10],
    width: "400px",
    outline: "none",
  },
}));

const ModalImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
`;

interface AuthenticationModalProps {
  signupOpen: boolean;
  loginOpen: boolean;
  handleSignupClose: () => void;
  handleLoginClose: () => void;
}

export default function AuthenticationModal(props: AuthenticationModalProps) {
  const { signupOpen, loginOpen, handleSignupClose, handleLoginClose } = props;
  const classes = useStyles();
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();

  /** HANDLERS **/
  const handleUserName = (e: T) => {
    setMemberNick(e.target.value);
  };

  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
  };

  const handlePassword = (e: T) => {
    setMemberPassword(e.target.value);
  };

  const handleConfirmPassword = (e: T) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordKeydown = (e: T) => {
    if (e.key === "Enter" && signupOpen) {
      handleSignupRequest().then();
    } else if (e.key === "Enter" && loginOpen) {
      handleLoginRequest().then();
    }
  };

  const handleSignupRequest = async () => {
    try {
      const isFulfill =
        memberNick !== "" && memberPhone !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      if (memberPassword !== confirmPassword) throw new Error(Messages.error6);

      const signupInput: MemberInput = {
        memberNick: memberNick,
        memberPhone: memberPhone,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.signup(signupInput);

      setAuthMember(result);
      handleSignupClose();
    } catch (err) {
      console.log(err);
      handleSignupClose();
      sweetErrorHandling(err).then();
    }
  };

  const handleLoginRequest = async () => {
    try {
      const isFulfill = memberNick !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick: memberNick,
        memberPassword: memberPassword,
      };

      const member = new MemberService();
      const result = await member.login(loginInput);

      setAuthMember(result);
      handleLoginClose();
    } catch (err) {
      console.log(err);
      handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div>
      {/* Signup Modal */}
      <Modal
        aria-labelledby="signup-modal-title"
        aria-describedby="signup-modal-description"
        className={classes.modal}
        open={signupOpen}
        onClose={handleSignupClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={signupOpen}>
          <Box className={classes.paper}>
            <ModalImage src="/img/amaya-hero.webp" alt="Signup Banner" />
            <Typography
              variant="h5"
              align="center"
              mb={2}
              fontFamily={"Raleway"}
              fontWeight={600}
              fontSize={"20px"}
              letterSpacing={2}
              textTransform={"uppercase"}
            >
              Create an Account
            </Typography>
            <Stack spacing={2}>
              <TextField
                id="signup-username"
                label="Username"
                variant="outlined"
                fullWidth
                value={memberNick}
                onChange={handleUserName}
              />
              <TextField
                id="signup-phone"
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={memberPhone}
                onChange={handlePhone}
              />
              <TextField
                id="signup-password"
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                value={memberPassword}
                onChange={handlePassword}
                // onKeyDown={handlePasswordKeydown}
              />
              <TextField
                id="signup-password-confirm"
                label="Confirm password"
                variant="outlined"
                fullWidth
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                onKeyDown={handlePasswordKeydown}
              />
              <Button
                // variant="extended"
                color="primary"
                onClick={handleSignupRequest}
                sx={{
                  mt: 2,
                  alignSelf: "center",
                  display: "flex",
                  height: "48px",
                  width: "60%",
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
                <LoginIcon sx={{ mr: 1 }} />
                sign up
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>

      {/* Login Modal */}
      <Modal
        aria-labelledby="login-modal-title"
        aria-describedby="login-modal-description"
        className={classes.modal}
        open={loginOpen}
        onClose={handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={loginOpen}>
          <Box className={classes.paper}>
            <ModalImage src="/img/amaya-hero.webp" alt="Login Banner" />
            <Typography
              variant="h5"
              align="center"
              mb={2}
              fontFamily={"Raleway"}
              fontWeight={600}
              fontSize={"20px"}
              letterSpacing={2}
              textTransform={"uppercase"}
            >
              Welcome Back
            </Typography>
            <Stack spacing={2}>
              <TextField
                id="login-username"
                label="Username"
                variant="outlined"
                fullWidth
                value={memberNick}
                onChange={handleUserName}
              />
              <TextField
                id="login-password"
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                value={memberPassword}
                onChange={handlePassword}
                onKeyDown={handlePasswordKeydown}
              />
              <Button
                color="primary"
                onClick={handleLoginRequest}
                sx={{
                  mt: 2,
                  alignSelf: "center",
                  display: "flex",
                  height: "48px",
                  width: "60%",
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
                <LoginIcon sx={{ mr: 1 }} />
                Login
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
