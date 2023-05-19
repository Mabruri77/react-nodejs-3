import { Button, Container, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import CheckOutSteps from "./compenent/CheckOutSteps"
import { validationShipping } from "../shared/validationTextField"
import { useNavigate } from "react-router-dom"
const ShippingScreen = () => {
  let [initData, setInitData] = useState({})
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("shipping"))
    if (data) {
      setInitData(data)
    }
  }, [])
  const navigate = useNavigate()
  const [validation, setValidation] = useState({
    address: {
      error: false,
      message: "",
    },
    city: {
      error: false,
      message: "",
    },
    postalCode: {
      error: false,
      message: "",
    },
    country: {
      error: false,
      message: "",
    },
  })
  const submitHandler = () => {
    const body = {
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      postalCode: document.getElementById("postalCode").value,
      country: document.getElementById("country").value,
    }
    const { errorValidate, updatedValue } = validationShipping(
      body.address,
      body.city,
      body.postalCode,
      body.country
    )
    if (errorValidate) {
      setValidation(updatedValue)
    } else {
      localStorage.setItem("shipping", JSON.stringify(body))
      navigate("/payment")
    }
  }
  return (
    <>
      <CheckOutSteps step1 step2 />
      {initData.city ? (
        <Container maxWidth="xs">
          <span>
            <Typography variant="h6">Address</Typography>
            <TextField
              fullWidth
              id="address"
              name="address"
              error={validation.address.error}
              helperText={validation.address.message}
              defaultValue={initData.address}
            />
          </span>
          <span>
            <Typography variant="h6">City</Typography>
            <TextField
              fullWidth
              id="city"
              name="city"
              error={validation.city.error}
              helperText={validation.city.message}
              defaultValue={initData.city}
            />
          </span>
          <span>
            <Typography variant="h6">Postal code</Typography>
            <TextField
              type="number"
              fullWidth
              id="postalCode"
              name="postalCode"
              error={validation.postalCode.error}
              helperText={validation.postalCode.message}
              defaultValue={initData.postalCode}
            />
          </span>
          <span>
            <Typography variant="h6">Country</Typography>
            <TextField
              fullWidth
              id="country"
              name="country"
              error={validation.country.error}
              helperText={validation.country.message}
              defaultValue={initData.country}
            />
          </span>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ alignSelf: "center", mt: 2, width: "100%" }}
            onClick={submitHandler}
          >
            Continue
          </Button>
        </Container>
      ) : (
        <div>
          <Container maxWidth="xs">
            <span>
              <Typography variant="h6">Address</Typography>
              <TextField
                fullWidth
                id="address"
                name="address"
                error={validation.address.error}
                helperText={validation.address.message}
              />
            </span>
            <span>
              <Typography variant="h6">City</Typography>
              <TextField
                fullWidth
                id="city"
                name="city"
                error={validation.city.error}
                helperText={validation.city.message}
              />
            </span>
            <span>
              <Typography variant="h6">Postal code</Typography>
              <TextField
                type="number"
                fullWidth
                id="postalCode"
                name="postalCode"
                error={validation.postalCode.error}
                helperText={validation.postalCode.message}
              />
            </span>
            <span>
              <Typography variant="h6">Country</Typography>
              <TextField
                fullWidth
                id="country"
                name="country"
                error={validation.country.error}
                helperText={validation.country.message}
              />
            </span>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ alignSelf: "center", mt: 2, width: "100%" }}
              onClick={submitHandler}
            >
              Continue
            </Button>
          </Container>
        </div>
      )}
    </>
  )
}

export default ShippingScreen
