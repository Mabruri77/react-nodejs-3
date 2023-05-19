import { useTheme } from "@emotion/react"
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  MenuItem,
  Rating,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material"
import React, { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { StateContext } from "../shared/context/StateContext"

const DetailProduct = () => {
  const { addCart } = useContext(StateContext)
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const { state } = useLocation()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  function selectChange(e) {
    setQty(e.target.value)
  }
  function addToCart() {
    const data = state
    data["qty"] = qty
    addCart(data)
    navigate("/cart")
  }
  return (
    <Stack direction={matches ? "row" : "column"} mt={2}>
      <Stack direction="column">
        <Container
          maxWidth={matches ? "md" : "sm"}
          component="img"
          src={state.image}
          alt={state.name}
        />
      </Stack>
      <Stack direction="column" justifyContent="center">
        <Container maxWidth={matches ? "xs" : "sm"}>
          <Typography variant="h4" fontWeight="bold">
            {state.name}
          </Typography>
          <Divider sx={{ borderBottomWidth: 5, mb: 1 }} />
          <Stack direction="row">
            <Rating name="half-rating-read" defaultValue={state.rating} precision={0.5} readOnly />
            <Typography variant="body1" color="grey">
              from {state.numReviews} reviews
            </Typography>
          </Stack>
          <Divider sx={{ borderBottomWidth: 5, mb: 1 }} />
          <Typography variant="body1">{state.description}</Typography>
          <Divider sx={{ borderBottomWidth: 5, mb: 1 }} />
          <Typography variant="body1">Price: ${state.price}</Typography>
          <Divider sx={{ borderBottomWidth: 5, mb: 1 }} />
          {state.countInStock > 0 ? (
            <>
              <Box sx={{ minWidth: 200 }}>
                <Typography>Quantity</Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={qty}
                    label={`${qty}`}
                    sx={{ color: "black" }}
                    onChange={selectChange}
                  >
                    {Array.from({ length: state.countInStock }, (_, i) => i).map((x) => (
                      <MenuItem value={x + 1} key={x + 1}>
                        {x + 1}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Button sx={{ mt: 2, width: "90%" }} onClick={addToCart}>
                  Add to Cart
                </Button>
              </Box>
            </>
          ) : (
            <Typography variant="h5">Out of Stock</Typography>
          )}
        </Container>
      </Stack>
    </Stack>
  )
}

export default DetailProduct
