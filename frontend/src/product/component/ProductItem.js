import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material"
import { Container } from "@mui/system"
import React from "react"
import { Link, useNavigate } from "react-router-dom"

const ProductItem = ({ data }) => {
  const navigate = useNavigate()
  return (
    <Container maxWidth="xs" sx={{ mt: 2 }}>
      <Card raised={false}>
        <CardActionArea
          onClick={() => {
            navigate("/detail-product", {
              state: data,
            })
          }}
        >
          <CardMedia sx={{ height: 230 }} image={data.image} title={data.name} />
        </CardActionArea>
        <CardContent>
          <Typography
            variant="h6"
            fontWeight="bold"
            component={Link}
            to="/detail-product"
            state={data}
            sx={{ textDecoration: "none", color: "black" }}
          >
            {data.name}
          </Typography>
          <Box display="flex" mt={2}>
            <Rating name="half-rating-read" defaultValue={data.rating} precision={0.5} readOnly />
            <Typography variant="body1">{data.numReviews} reviews</Typography>
          </Box>
          <Typography variant="h5" fontWeight="bold">
            ${data.price}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}

export default ProductItem
