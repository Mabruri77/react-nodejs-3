import { useTheme } from "@emotion/react"
import { Box, Button, Container, Divider, List, Typography, useMediaQuery } from "@mui/material"
import { Stack } from "@mui/system"
import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { StateContext } from "../shared/context/StateContext"
import CartItem from "./component/CartItem"
const ListCart = () => {
  const { cartItems, token } = useContext(StateContext)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const navigate = useNavigate()
  let total = 0
  let totalPrice = 0
  const submitHandler = () => {
    if (token) {
      navigate("/shipping")
    } else {
      navigate("/login?redirect=shipping")
    }
  }
  return (
    <Stack direction={matches ? "row" : "column"}>
      <Container maxWidth="md">
        <List sx={{ mt: 2 }}>
          {cartItems.map((data) => {
            total += data.qty
            totalPrice += data.qty * data.price
            return <CartItem data={data} key={data._id} />
          })}
        </List>
      </Container>
      <Container maxWidth="xs" sx={{ mt: 3 }}>
        <Box sx={{ border: "1px solid" }}>
          <Typography variant="h5" fontWeight="bold" sx={{ textAlign: "center" }}>
            SUBTOTAL {total} ITEMS
          </Typography>
          <Divider sx={{ borderBottomWidth: 5 }} />
          <Typography mt={2} ml={2} variant="h6" fontWeight="bold">
            Total Price = ${totalPrice.toFixed(2)}
          </Typography>
          <Button sx={{ width: "100%" }} onClick={submitHandler}>
            Proceed To CheckOut
          </Button>
        </Box>
      </Container>
    </Stack>
  )
}

export default ListCart
