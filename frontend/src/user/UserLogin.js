import React, { useContext, useEffect, useState } from "react"
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
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useHttpHook } from "../shared/hooks/HttpHook"
import { validationLogin } from "../shared/validationTextField"
import { StateContext } from "../shared/context/StateContext"

const UserLogin = () => {
  const navigate = useNavigate()
  const auth = useContext(StateContext)
  const { sendRequest, isLoading } = useHttpHook()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (auth.token) {
      navigate("/")
    }
  }, [auth, navigate])
  const [validation, setValidation] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  })

  const submitHandler = async (e) => {
    e.preventDefault()
    const body = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    }
    const { errorValidate, updatedValue } = validationLogin(body.email, body.password)
    if (errorValidate) {
      setValidation(updatedValue)
    } else {
      setValidation(updatedValue)
      try {
        const user = await sendRequest("http://localhost:5000/api/users/login", "post", body)
        auth.login(user)
        const redirect = searchParams.get("redirect")
        if (redirect) {
          navigate("/" + redirect)
        } else {
          navigate("/")
        }
      } catch (error) {}
    }
  }
  return (
    <Box component="form" onSubmit={submitHandler} sx={{ mt: 4 }}>
      <Container maxWidth="sm">
        <Card elevation={4}>
          <Typography variant="h3" sx={{ textAlign: "center" }} fontWeight="bold">
            Login
          </Typography>
          <Stack spacing={1} sx={{ p: 2 }}>
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
                type="Password"
                fullWidth
                id="password"
                name="password"
                error={validation.password.error}
                helperText={validation.password.message}
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
              {isLoading ? <CircularProgress color="inherit" size={30} /> : "Login"}
            </Button>
          </Box>
          <Typography variant="body1" sx={{ ml: 1 }} fontWeight="bold">
            don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Card>
      </Container>
    </Box>
  )
}

export default UserLogin
