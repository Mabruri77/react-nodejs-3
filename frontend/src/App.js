import { Box, CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material"
import ListProduct from "./product/ListProduct"
import Footer from "./shared/component/Footer"
import Navbar from "./shared/component/Navbar"
import { theme } from "./shared/theme"
import { Route, Routes } from "react-router-dom"
import DetailProduct from "./product/DetailProduct"
import { StateContext } from "./shared/context/StateContext"
import { useStateManagement } from "./shared/hooks/stateManagement"
import { useEffect } from "react"
import ListCart from "./cart/ListCart"
import UserLogin from "./user/UserLogin"
import UserRegister from "./user/UserRegister"
import UserProfile from "./user/UserProfile"
import ShippingScreen from "./user/ShippingScreen"
import PaymentScreen from "./user/PaymentScreen"
import PlaceOrderScreen from "./user/PlaceOrderScreen"
import OrderScreen from "./user/OrderScreen"

function App() {
  const {
    cartItems,
    token,
    userData,
    addCart,
    removeCart,
    initCart,
    login,
    logout,
    autoLogin,
    updateUser,
  } = useStateManagement()
  useEffect(() => {
    initCart()
    autoLogin()
  }, [initCart, autoLogin])
  return (
    <StateContext.Provider
      value={{ cartItems, token, userData, addCart, removeCart, login, logout, updateUser }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={(theme) => ({
            button: { backgroundColor: "white" },
          })}
        />
        <Navbar />
        <Box sx={{ minHeight: "80vh" }}>
          <Routes>
            <Route path="/" element={<ListProduct />} />
            <Route path="/detail-product" element={<DetailProduct />} />
            <Route path="/cart" element={<ListCart />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/place-order" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
          </Routes>
        </Box>
        <Footer />
      </ThemeProvider>
    </StateContext.Provider>
  )
}

export default App
