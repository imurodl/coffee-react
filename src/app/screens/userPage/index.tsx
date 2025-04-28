import React, { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  TextField,
  Avatar,
  IconButton,
} from "@mui/material";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverApi, Messages } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MemberService from "../../services/MemberService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { MemberUpdateInput } from "../../../lib/types/member";
import { T } from "../../../lib/types/common";

export default function UserPage() {
  const { authMember, setAuthMember } = useGlobals();
  const history = useHistory();

  if (!authMember) history.push("/");

  const [img, setImg] = useState<string>(
    authMember?.memberImage
      ? `${serverApi}/${authMember.memberImage}`
      : "/icons/default-user.svg"
  );
  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
    {
      memberNick: authMember?.memberNick,
      memberPhone: authMember?.memberPhone,
      memberAddress: authMember?.memberAddress,
      memberDesc: authMember?.memberDesc,
      memberImage: authMember?.memberImage,
    }
  );

  /** HANDLERS */
  const handleChange = (e: T) => {
    const { name, value } = e.target;
    setMemberUpdateInput({ ...memberUpdateInput, [name]: value });
  };

  const handleImgChange = (e: T) => {
    const file = e.target.files[0];
    const validateImgTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!validateImgTypes.includes(file?.type)) {
      sweetErrorHandling(Messages.error5);
      return;
    }
    if (file) {
      setMemberUpdateInput({ ...memberUpdateInput, memberImage: file });
      setImg(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      const { memberNick, memberPhone, memberAddress, memberDesc } =
        memberUpdateInput;
      if (!memberNick || !memberPhone || !memberAddress || !memberDesc) {
        throw new Error(Messages.error3);
      }

      const member = new MemberService();
      const result = await member.updateMember(memberUpdateInput);
      setAuthMember(result);

      await sweetTopSmallSuccessAlert("Modified successfully", 1000);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err);
    }
  };

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
          My Profile
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={5}
          alignItems="flex-start"
        >
          {/* LEFT - PROFILE SUMMARY */}
          <Box
            flex={1}
            p={4}
            bgcolor="white"
            borderRadius={5}
            boxShadow="0px 4px 18px rgba(0, 0, 0, 0.08)"
            textAlign="center"
          >
            <Avatar
              src={img}
              sx={{
                width: 160,
                height: 160,
                mx: "auto",
                mb: 2,
                boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
              }}
            />
            <Typography
              fontFamily="Raleway"
              fontWeight={700}
              fontSize={24}
              color="#101020"
            >
              {authMember?.memberNick}
            </Typography>
            <Typography
              fontFamily="Raleway"
              fontSize={15}
              color="#777"
              mt={0.5}
            >
              {authMember?.memberType === MemberType.RESTAURANT
                ? "Restaurant"
                : "Regular User"}
            </Typography>
            <Typography
              fontFamily="Raleway"
              fontSize={15}
              color="#777"
              mt={0.5}
            >
              {authMember?.memberAddress || "No address provided"}
            </Typography>

            <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
              {[
                <FacebookIcon />,
                <InstagramIcon />,
                <TelegramIcon />,
                <YouTubeIcon />,
              ].map((icon, index) => (
                <IconButton
                  key={index}
                  sx={{
                    transition: "0.3s",
                    "&:hover": { transform: "scale(1.2)", color: "#db9457" },
                  }}
                >
                  {icon}
                </IconButton>
              ))}
            </Stack>

            <Typography
              mt={3}
              fontFamily="Raleway"
              fontSize={15}
              color="#3A3A3B"
              maxWidth={280}
              mx="auto"
            >
              {authMember?.memberDesc || "No description provided."}
            </Typography>
          </Box>

          {/* RIGHT - PROFILE EDIT FORM */}
          <Box
            flex={2}
            p={5}
            bgcolor="white"
            borderRadius={5}
            boxShadow="0px 4px 18px rgba(0, 0, 0, 0.08)"
          >
            <Typography
              fontFamily="Raleway"
              fontWeight={700}
              fontSize={22}
              mb={4}
              color="#101020"
            >
              Edit Your Details
            </Typography>

            <Stack spacing={3.5}>
              <Button
                component="label"
                startIcon={<CloudDownloadIcon />}
                sx={{
                  alignSelf: "flex-start",
                  border: "2px solid #DB9457",
                  color: "#242434",
                  fontFamily: "Raleway",
                  fontSize: "13.6px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  transition: "all 0.3s",
                  ":hover": {
                    bgcolor: "#DB9457",
                    color: "white",
                  },
                }}
              >
                Upload Image
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImgChange}
                />
              </Button>

              <TextField
                fullWidth
                label="Username"
                name="memberNick"
                value={memberUpdateInput.memberNick || ""}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Phone"
                name="memberPhone"
                value={memberUpdateInput.memberPhone || ""}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Address"
                name="memberAddress"
                value={memberUpdateInput.memberAddress || ""}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Description"
                multiline
                minRows={3}
                name="memberDesc"
                value={memberUpdateInput.memberDesc || ""}
                onChange={handleChange}
              />

              <Button
                variant="contained"
                onClick={handleSave}
                sx={{
                  mt: 2,
                  height: "44px",
                  bgcolor: "#101020",
                  color: "#DB9457",
                  fontFamily: "Raleway",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  letterSpacing: "2px",
                  ":hover": {
                    bgcolor: "#DB9457",
                    color: "#101020",
                  },
                }}
              >
                Save Changes
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
