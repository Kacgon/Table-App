import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Product } from "../models/product";
import { useState } from "react";

export function ProductDetailsComponent({
  productInfo,
}: {
  productInfo: Product | null;
}) {
  const [imgIndex, setImgIndex] = useState(0);

  function changeDisplayedImg() {
    setImgIndex(imgIndex < 2 && imgIndex >= 0 ? imgIndex + 1 : imgIndex - 1);
  }

  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "15px",
        }}
      >
        <Card
          sx={{
            maxWidth: 330,
            marginBottom: "10px",
            backgroundColor: "#ebebeb",
            border: "#d1d1d1 solid",
            borderRadius: "5px",
          }}
        >
          <CardActionArea>
            {productInfo?.images?.length !== 1 ? (
              <>
                <CardMedia
                  component="img"
                  height="340"
                  image={productInfo?.images[imgIndex]}
                  onClick={changeDisplayedImg}
                  alt={productInfo?.title}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    paddingBottom: "5px",
                  }}
                >
                  <Typography sx={{ color: "gray", fontWeight: "600" }}>
                    Click to change image
                  </Typography>
                </Box>
              </>
            ) : (
              <CardMedia
                component="img"
                height="340"
                image={productInfo?.images[imgIndex]}
                alt={productInfo?.title}
              />
            )}
            <Divider
              sx={{ backgroundColor: "orange", borderBottomWidth: "thin" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {productInfo?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {productInfo?.description}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: "900", fontStyle: "italic" }}
                color="text.secondary"
              >
                Rating: {productInfo?.rating}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: "900", fontStyle: "italic" }}
              >
                {productInfo?.price}$
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
}
