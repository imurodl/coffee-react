import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Member } from "../../lib/types/member";
import { serverApi } from "../../lib/config";
import { brand } from "../MaterialTheme/tokens";

/** Top/active user card (avatar + nickname). */
export default function UserCard({ member }: { member: Member }) {
  const image = `${serverApi}/${member.memberImage}`;
  return (
    <Box
      sx={{
        border: `1px solid ${brand.border}`,
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "#fff",
      }}
    >
      <Box sx={{ aspectRatio: "1 / 1", overflow: "hidden" }}>
        <Box
          component="img"
          src={image}
          alt={member.memberNick}
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.onerror = null;
            img.src = "/img/amaya-logo.png";
          }}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>
      <Stack sx={{ py: 1.5, alignItems: "center" }}>
        <Typography sx={{ fontWeight: 600, color: brand.dark }}>
          {member.memberNick}
        </Typography>
      </Stack>
    </Box>
  );
}
