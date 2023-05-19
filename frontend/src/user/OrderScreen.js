import { useTheme } from "@emotion/react"
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { Container, Stack } from "@mui/system"
import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useHttpHook } from "../shared/hooks/HttpHook"
import CheckOutSteps from "./compenent/CheckOutSteps"
import OrderItem from "./compenent/OrderItem"
import { StateContext } from "../shared/context/StateContext"

const OrderScreen = () => {
  const [data, setData] = useState({})
  const { sendRequest, isLoading } = useHttpHook()
  const auth = useContext(StateContext)
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))

  const submitHandler = async () => {}

  const params = useParams()

  useEffect(() => {
    const fetch = async () => {
      const data = await sendRequest(
        `http://localhost:5000/api/orders/${params.id}`,
        "GET",
        {},
        {
          Authorization: `Bearer ${auth.token}`,
        }
      )
      setData(data)
    }
    if (auth.token) fetch()
  }, [params.id, sendRequest, auth.token])

  return (
    <div>
      <CheckOutSteps step1 step2 step3 step4 />
      {data.shippingAddress ? (
        <Stack direction={matches ? "row" : "column"}>
          <Container maxWidth="md">
            <Typography variant="h4">Shipping</Typography>
            <Typography variant="body1">
              Name: {data.user.name} <a href={`mailto:${data.user.email}`}>{data.user.email}</a>
            </Typography>
            <Typography variant="body1">
              Address:{" "}
              {`${data.shippingAddress.address} -  ${data.shippingAddress.city} - ${data.shippingAddress.postalCode} - ${data.shippingAddress.country}`}
            </Typography>
            {data.isDelivered ? (
              <Alert severity="success">Order is success delivered</Alert>
            ) : (
              <Alert severity="warning">Order is not delivered</Alert>
            )}
            <Divider sx={{ borderBottomWidth: 7, mt: 2 }} />
            <Typography variant="h4" mt={2}>
              Payment Method
            </Typography>
            <Typography variant="body1"> Method: {data.paymentMethod}</Typography>
            {data.isPaid ? (
              <Alert severity="success">Order is success paid</Alert>
            ) : (
              <Alert severity="warning">Order is not paid</Alert>
            )}
            <Divider sx={{ borderBottomWidth: 7, mt: 2 }} />
            <Typography variant="h4" mt={2}>
              Order Item
            </Typography>
            <List sx={{ mt: 2 }}>
              {data.orderItems.map((data) => {
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
                  Shipping:
                </Typography>
                <Typography variant="body 2" color="inherit" noWrap>
                  ${data.shippingPrice.toFixed(2)}
                </Typography>
              </Box>
              <Divider sx={{ borderBottomWidth: 5, my: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Typography variant="title" color="inherit" noWrap>
                  Tax:
                </Typography>
                <Typography variant="body 2" color="inherit" noWrap>
                  ${data.taxPrice.toFixed(2)}
                </Typography>
              </Box>
              <Divider sx={{ borderBottomWidth: 5, my: 2 }} />
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Typography variant="title" color="inherit" noWrap>
                  Total:
                </Typography>
                <Typography variant="body 2" color="inherit" noWrap>
                  ${data.totalPrice.toFixed(2)}
                </Typography>
              </Box>

              <Button sx={{ width: "100%" }} onClick={submitHandler}>
                {isLoading ? <CircularProgress color="inherit" size={30} /> : "Place Order"}
              </Button>
            </Box>
          </Container>
        </Stack>
      ) : (
        <></>
      )}
    </div>
  )
}

export default OrderScreen
