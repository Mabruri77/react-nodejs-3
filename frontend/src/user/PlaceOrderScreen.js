import { useTheme } from "@emotion/react"
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { Container, Stack } from "@mui/system"
import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { StateContext } from "../shared/context/StateContext"
import { useHttpHook } from "../shared/hooks/HttpHook"
import CheckOutSteps from "./compenent/CheckOutSteps"
import OrderItem from "./compenent/OrderItem"

const PlaceOrderScreen = () => {
  const navigate = useNavigate()
  const { sendRequest, isLoading } = useHttpHook()
  const auth = useContext(StateContext)
  const shipping = JSON.parse(localStorage.getItem("shipping"))
  const carts = JSON.parse(localStorage.getItem("cartItems"))
  const paymentMethod = localStorage.getItem("paymentMethod")
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  let totalPrice = carts.reduce((acc, item) => acc + item.price * item.qty, 0)
  const shippingPrice = totalPrice > 100 ? 0 : 100
  const tax = 0.15 * totalPrice
  const total = totalPrice + shippingPrice + tax
  const submitHandler = async () => {
    try {
      const order = await sendRequest("http://localhost:5000/api/orders", "POST", {
        user: auth.userData._id,
        orderItems: carts,
        paymentMethod,
        shippingPrice,
        taxPrice: tax,
        totalPrice: total,
        shippingAddress: shipping,
      })
      console.log(order)
      navigate(`/order/${order._id}`)
      console.log(carts)
    } catch (error) {}
  }
  return (
    <div>
      <CheckOutSteps step1 step2 step3 step4 />
      <Stack direction={matches ? "row" : "column"}>
        <Container maxWidth="md">
          <Typography variant="h4">Shipping</Typography>
          <Typography variant="body1">
            Address: {shipping.address}, {shipping.city}, {shipping.postalCode}, {shipping.country}
          </Typography>
          <Divider sx={{ borderBottomWidth: 7, mt: 2 }} />
          <Typography variant="h4" mt={2}>
            Payment Method
          </Typography>
          <Typography variant="body1"> Method: {paymentMethod}</Typography>
          <Divider sx={{ borderBottomWidth: 7, mt: 2 }} />
          <Typography variant="h4" mt={2}>
            Order Item
          </Typography>
          <List sx={{ mt: 2 }}>
            {carts.map((data) => {
              return <OrderItem data={data} key={data._id} />
            })}
          </List>
        </Container>
        <Container maxWidth="sm">
          <Box sx={{ border: "1px solid" }}>
            <Typography variant="h5" fontWeight="bold" sx={{ textAlign: "center" }}>
              ORDER SUMMARY
            </Typography>
            <Divider sx={{ borderBottomWidth: 5, my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Typography variant="title" color="inherit" noWrap>
                Items:
              </Typography>
              <Typography variant="body 2" color="inherit" noWrap>
                ${totalPrice.toFixed(2)}
              </Typography>
            </Box>
            <Divider sx={{ borderBottomWidth: 5, my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Typography variant="title" color="inherit" noWrap>
                Shipping:
              </Typography>
              <Typography variant="body 2" color="inherit" noWrap>
                ${shippingPrice.toFixed(2)}
              </Typography>
            </Box>
            <Divider sx={{ borderBottomWidth: 5, my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Typography variant="title" color="inherit" noWrap>
                Tax:
              </Typography>
              <Typography variant="body 2" color="inherit" noWrap>
                ${tax.toFixed(2)}
              </Typography>
            </Box>
            <Divider sx={{ borderBottomWidth: 5, my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Typography variant="title" color="inherit" noWrap>
                Total:
              </Typography>
              <Typography variant="body 2" color="inherit" noWrap>
                ${total.toFixed(2)}
              </Typography>
            </Box>

            <Button sx={{ width: "100%" }} onClick={submitHandler}>
              {isLoading ? <CircularProgress color="inherit" size={30} /> : "Place Order"}
            </Button>
          </Box>
        </Container>
      </Stack>
    </div>
  )
}

export default PlaceOrderScreen
