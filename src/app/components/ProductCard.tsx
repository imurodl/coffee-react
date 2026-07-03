import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Product } from "../../lib/types/product";
import { CartItem } from "../../lib/types/search";
import { ProductCollection } from "../../lib/enums/product.enums";
import { serverApi } from "../../lib/config";
import { brand, fonts } from "../MaterialTheme/tokens";

interface ProductCardProps {
  product: Product;
  onOpen: (id: string) => void;
  /** When provided, an always-visible add-to-cart button is shown. */
  onAdd?: (item: CartItem) => void;
  showViews?: boolean;
  showStock?: boolean;
}

/**
 * Reusable, responsive product card. Fills its grid cell, keeps a fixed image
 * aspect ratio, and shows the name/price/actions at rest (no hover dependency,
 * so it works on touch). Replaces the duplicated fixed-pixel card markup.
 */
export default function ProductCard({
  product,
  onOpen,
  onAdd,
  showViews = true,
  showStock = true,
}: ProductCardProps) {
  const image = `${serverApi}/${product.productImages?.[0] ?? ""}`;
  const sizeLabel =
    product.productCollection === ProductCollection.DRINK
      ? `${product.productVolume}L`
      : `${product.productSize} size`;
  const lowStock = product.productLeftCount <= 5;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd?.({
      _id: product._id,
      quantity: 1,
      price: product.productPrice,
      image: product.productImages?.[0] ?? "",
      name: product.productName,
    });
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "common.white",
        border: `1px solid ${brand.border}`,
        transition: "box-shadow .2s ease, transform .2s ease",
        "&:hover": {
          boxShadow: "0 12px 28px rgba(16,16,32,.12)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardActionArea
        onClick={() => onOpen(product._id)}
        aria-label={product.productName}
        sx={{ display: "block" }}
      >
        <Box sx={{ position: "relative", aspectRatio: "1 / 1", bgcolor: "#f2f2f7" }}>
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
            }}
          />
          <Chip
            label={sizeLabel}
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              bgcolor: brand.orange,
              color: "#fff",
              fontWeight: 600,
              letterSpacing: ".5px",
            }}
          />
          {showStock && (
            <Chip
              label={`${product.productLeftCount} left`}
              size="small"
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                color: "#fff",
                bgcolor: lowStock ? "error.main" : "rgba(16,16,32,.6)",
              }}
            />
          )}
        </Box>
      </CardActionArea>

      <CardContent
        sx={{
          p: 2,
          pb: "16px !important",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          flexGrow: 1,
        }}
      >
        <Typography
          component="h3"
          title={product.productName}
          sx={{
            fontFamily: fonts.heading,
            fontWeight: 600,
            fontSize: { xs: 16, md: 18 },
            color: brand.dark,
            lineHeight: 1.25,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.productName}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: "auto" }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 18, color: brand.dark }}>
            ${product.productPrice}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            {showViews && (
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.4}
                sx={{ color: "text.disabled" }}
              >
                <RemoveRedEyeIcon sx={{ fontSize: 18 }} />
                <Typography variant="caption">{product.productViews}</Typography>
              </Stack>
            )}
            {onAdd && (
              <IconButton
                onClick={handleAdd}
                aria-label={`Add ${product.productName} to cart`}
                size="small"
                sx={{
                  bgcolor: brand.orange,
                  color: "#fff",
                  "&:hover": { bgcolor: brand.orangeDark },
                }}
              >
                <ShoppingCartIcon sx={{ fontSize: 18 }} />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
