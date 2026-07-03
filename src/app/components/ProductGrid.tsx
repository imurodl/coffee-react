import React from "react";
import { Box, SxProps, Theme } from "@mui/material";

interface ProductGridProps {
  children: React.ReactNode;
  /** Columns per breakpoint. Default: 2 (mobile) / 3 (tablet) / 4 (desktop). */
  columns?: { xs?: number; sm?: number; md?: number; lg?: number };
  sx?: SxProps<Theme>;
}

const cols = (n?: number) => (n ? `repeat(${n}, 1fr)` : undefined);

/**
 * Responsive product grid. Replaces the fixed-width `.product-wrapper` /
 * `.cards-wrapper` containers so cards fluidly fill each cell at every width.
 */
export default function ProductGrid({
  children,
  columns = { xs: 2, sm: 3, md: 4 },
  sx,
}: ProductGridProps) {
  return (
    <Box
      sx={{
        display: "grid",
        width: "100%",
        gap: { xs: 2, sm: 2.5, md: 3 },
        gridTemplateColumns: {
          xs: cols(columns.xs) ?? "repeat(2, 1fr)",
          sm: cols(columns.sm),
          md: cols(columns.md),
          lg: cols(columns.lg),
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
