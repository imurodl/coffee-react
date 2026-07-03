import React from "react";
import { Box, Typography } from "@mui/material";
import Divider from "./divider";
import { brand, fonts } from "../MaterialTheme/tokens";

/** Shared section heading: eyebrow subtitle + title + accent divider. */
export default function SectionHeader({
  subtitle,
  title,
}: {
  subtitle: string;
  title: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 1.5,
      }}
    >
      <Typography
        sx={{
          textTransform: "uppercase",
          letterSpacing: "3px",
          fontSize: 14,
          fontWeight: 600,
          color: brand.orange,
        }}
      >
        {subtitle}
      </Typography>
      <Typography
        component="h2"
        sx={{
          fontFamily: fonts.heading,
          fontWeight: 700,
          fontSize: { xs: 32, md: 44 },
          lineHeight: 1.1,
          color: brand.dark,
        }}
      >
        {title}
      </Typography>
      <Divider width="2" height="40" bg={brand.orange} />
    </Box>
  );
}
