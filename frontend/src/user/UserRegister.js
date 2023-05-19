import React, { useState } from "react"
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

import { validationRegister } from "../shared/validationTextField"
import { useHttpHook } from "../shared/hooks/HttpHook"
const UserRegister = () => {
  const navigate = useNavigate()
  const { sendRequest, isLoading } = useHttpHook()
  const [validation, setValidation] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
    name: {
      error: false,
      message: "",
    },
    confirmPassword: {
      error: false,
      message: "",
    },
  })
  const submitHandler = async (e) => {
    e.preventDefault()

    const body = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      confirmPassword: document.getElementById("confirmPassword").value,
    }
    const { errorValidate, updatedValue } = validationRegister(
      body.name,
      body.email,
      body.password,
      body.confirmPassword
    )
    if (errorValidate) {
      setValidation(updatedValue)
    } else {
      setValidation(updatedValue)
      try {
        await sendRequest("http://localhost:5000/api/users/register", "post", body)
        navigate("/login")
      } catch (error) {}
    }
  }
  return (
    <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
      <Container maxWidth="sm">
        <Card elevation={4}>
          <Typography variant="h3" sx={{ textAlign: "center" }} fontWeight="bold">
            Register
          </Typography>
          <Stack spacing={1} sx={{ p: 2 }}>
            <span>
              <Typography variant="h6">Name</Typography>
              <TextField
                fullWidth
                id="name"
                name="name"
                error={validation.name.error}
                helperText={validation.name.message}
              />
            </span>
            <span>
              <Typography variant="h6">Email</Typography>
              <TextField
                type="email"
                fullWidth
                id="email"
                name="email"
                error={validation.email.error}
                helperText={validation.email.message}
              />
            </span>
            <span>
              <Typography variant="h6">Password</Typography>
              <TextField
                type="password"
                fullWidth
                id="password"
                name="password"
                error={validation.password.error}
                helperText={validation.password.message}
              />
            </span>
            <span>
              <Typography variant="h6">Confirm Password</Typography>
              <TextField
                type="password"
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                error={validation.confirmPassword.error}
                helperText={validation.confirmPassword.message}
              />
            </span>
          </Stack>
          <Box sx={{ textAlign: "center", pb: 1 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: "30%", alignSelf: "center" }}
            >
              {isLoading ? <CircularProgress color="inherit" size={30} /> : "Register"}
            </Button>
          </Box>
          <Typography variant="body1" sx={{ ml: 1 }} fontWeight="bold">
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Card>
      </Container>
    </Box>
  )
}

export default UserRegister
