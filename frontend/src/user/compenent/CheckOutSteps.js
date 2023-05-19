import React from "react"
import { Link } from "react-router-dom"
import { Box, Typography } from "@mui/material"

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-evenly", my: 2 }}>
      <span>
        {step1 ? (
          <Link to="/login" style={{ textDecoration: "none", color: "black", fontSize: 20 }}>
            Login
          </Link>
        ) : (
          <Typography variant="body1" color="text.secondary" fontSize={20}>
            Login
          </Typography>
        )}
      </span>
      <span>
        {step2 ? (
          <Link to="/shipping" style={{ textDecoration: "none", color: "black", fontSize: 20 }}>
            Shipping
          </Link>
        ) : (
          <Typography variant="body1" color="text.secondary" fontSize={20}>
            Shipping
          </Typography>
        )}
      </span>
      <span>
        {step3 ? (
          <Link to="/payment" style={{ textDecoration: "none", color: "black", fontSize: 20 }}>
            Payment
          </Link>
        ) : (
          <Typography variant="body1" color="text.secondary" fontSize={20}>
            Payment
          </Typography>
        )}
      </span>
      <span>
        {step4 ? (
          <Link to="/place-order" style={{ textDecoration: "none", color: "black", fontSize: 20 }}>
            Place Order
          </Link>
        ) : (
          <Typography variant="body1" color="text.secondary" fontSize={20}>
            Place Order
          </Typography>
        )}
      </span>
    </Box>
  )
}

export default CheckOutSteps
