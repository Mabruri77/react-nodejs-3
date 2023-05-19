import { useTheme } from "@emotion/react"
import {
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { StateContext } from "../shared/context/StateContext"
import { useHttpHook } from "../shared/hooks/HttpHook"
import { validationUserUpdate } from "../shared/validationTextField"

const UserProfile = () => {
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
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))
  const { userData, token, updateUser } = useContext(StateContext)
  const { sendRequest, isLoading } = useHttpHook()
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [token, navigate])

  const submitHandler = async (e) => {
    e.preventDefault()

    const body = {
      email: userData.email,
      name: document.getElementById("name").value,
      newEmail: document.getElementById("email").value,
      password: document.getElementById("password").value,
      confirmPassword: document.getElementById("confirmPassword").value,
    }
    const { errorValidate, updatedValue } = validationUserUpdate(
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
        const data = await sendRequest("http://localhost:5000/api/users/update-user", "patch", body)
        updateUser(data)
      } catch (error) {}
    }
  }
  return (
    <Stack direction={matches ? "row" : "column"}>
      <Container maxWidth="xs">
        <Typography variant="h4">User Profile</Typography>
        <span>
          <Typography variant="h6">Name</Typography>
          <TextField
            fullWidth
            id="name"
            name="name"
            error={validation.name.error}
            helperText={validation.name.message}
            defaultValue={userData.name}
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
            defaultValue={userData.email}
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ alignSelf: "center", mt: 2 }}
          onClick={submitHandler}
        >
          {isLoading ? <CircularProgress color="inherit" size={30} /> : "Update Profile"}
        </Button>
      </Container>
      <Container maxWidth={matches ? "md" : "xs"} sx={{ mt: matches ? 0 : 2 }}>
        <Typography variant="h4">My Order</Typography>
      </Container>
    </Stack>
  )
}

export default UserProfile
