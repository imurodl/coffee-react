import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { brand, fonts } from "../MaterialTheme/tokens";

/** The recurring bordered, uppercase brand CTA button. */
export default function CtaButton({ sx, children, ...rest }: ButtonProps) {
  return (
    <Button
      disableElevation
      {...rest}
      sx={{
        border: `1px solid ${brand.orange}`,
        color: brand.dark,
        fontFamily: fonts.body,
        fontWeight: 600,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        borderRadius: 0,
        px: 4,
        py: 1.4,
        transition: "background-color .2s ease, color .2s ease",
        "&:hover": { backgroundColor: brand.orange, color: "#fff" },
        ...sx,
      }}
    >
      {children}
    </Button>
  );
}
