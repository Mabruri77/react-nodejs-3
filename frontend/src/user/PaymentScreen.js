import { Box, Button, Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import CheckOutSteps from "./compenent/CheckOutSteps"

const PaymentScreen = () => {
  const navigate = useNavigate()
  const submitHandler = () => {
    const paymentMethod = document.getElementById("paypal").value
    localStorage.setItem("paymentMethod", paymentMethod)
    navigate("/place-order")
  }
  return (
    <div>
      <CheckOutSteps step1 step2 step3 />
      <Typography textAlign="center" variant="h3" mt={4}>
        Payment Method
      </Typography>
      <Box display="flex" justifyContent="center">
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked value="PayPal" id="paypal" />}
            label="Paypal or Credit Card"
          />
          <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
        </FormGroup>
      </Box>
      <Box textAlign="center">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ alignSelf: "center", mt: 2, width: "20%" }}
          onClick={submitHandler}
        >
          Continue
        </Button>
      </Box>
    </div>
  )
}

export default PaymentScreen
