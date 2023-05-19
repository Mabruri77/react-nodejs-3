import React, { useContext, useState } from "react"
import { AppBar, Button, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { Person, ShoppingCart } from "@mui/icons-material"
import { grey } from "@mui/material/colors"
import { Link, useNavigate } from "react-router-dom"
import { StateContext } from "../context/StateContext"
const Navbar = () => {
  const { token, userData, logout } = useContext(StateContext)
  const [anchorEl, setAnchorEl] = useState(null | HTMLElement)
  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const navigate = useNavigate()
  return (
    <AppBar position="relative" sx={{ background: grey[900] }}>
      <Toolbar>
        <Typography
          variant="h4"
          component={Link}
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            textTransform: "uppercase",
            textDecoration: "underline",
            color: "white",
          }}
          to="/"
        >
          Happy Shop
        </Typography>
        <Button
          color="inherit"
          onClick={() => {
            navigate("/cart")
          }}
        >
          <ShoppingCart />
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Cart
          </Typography>
        </Button>
        {token ? (
          <>
            <Button color="inherit" onClick={handleOpen}>
              <Person />
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {userData.name}
              </Typography>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              sx={{ mt: "30px" }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/profile")
                  handleClose()
                }}
              >
                My Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/login")
                  logout()
                  handleClose()
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            color="inherit"
            onClick={() => {
              navigate("/login")
            }}
          >
            <Person />
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Sign In
            </Typography>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
