import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Product } from "../../lib/types/product";
import { serverApi } from "../../lib/config";
import { fonts } from "../MaterialTheme/tokens";

/** Full-bleed image card with gradient overlay (used for Popular Products). */
export default function ProductOverlayCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (id: string) => void;
}) {
  const image = `${serverApi}/${product.productImages?.[0] ?? ""}`;
  return (
    <Box
      role="button"
      tabIndex={0}
      aria-label={product.productName}
      onClick={() => onOpen(product._id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(product._id);
        }
      }}
      sx={{
        position: "relative",
        aspectRatio: "3 / 4",
        borderRadius: 3,
        overflow: "hidden",
        cursor: "pointer",
        bgcolor: "#f2f2f7",
        "&:hover img": { transform: "scale(1.05)" },
      }}
    >
      <Box
        component="img"
        src={image}
        alt={product.productName}
        loading="lazy"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform .4s ease",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(16,16,32,.85) 0%, rgba(16,16,32,.15) 55%, rgba(16,16,32,0) 100%)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 1 }}
        >
          <Typography
            sx={{
              fontFamily: fonts.heading,
              color: "#fff",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            {product.productName}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{ color: "rgba(255,255,255,.85)" }}
          >
            <Typography sx={{ fontSize: 14 }}>{product.productViews}</Typography>
            <VisibilityIcon sx={{ fontSize: 20 }} />
          </Stack>
        </Stack>
        {product.productDesc && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              pt: 1.5,
              borderTop: "1px solid rgba(255,255,255,.3)",
              color: "rgba(255,255,255,.85)",
            }}
          >
            <DescriptionOutlinedIcon sx={{ fontSize: 18 }} />
            <Typography sx={{ fontSize: 13 }} noWrap>
              {product.productDesc.slice(0, 30)}
              {product.productDesc.length > 30 ? "…" : ""}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
