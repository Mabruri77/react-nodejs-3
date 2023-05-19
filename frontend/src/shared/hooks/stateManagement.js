import { useCallback, useState } from "react"

export const useStateManagement = () => {
  const [token, setToken] = useState()
  let [cartItems, setCartItems] = useState([])
  const [userData, setUserData] = useState({})
  const addCart = useCallback((val) => {
    setCartItems((oldData) => {
      let exist = false
      const newArr = []
      for (let i of oldData) {
        if (i.name === val.name) {
          if ((i.qty += val.qty) > i.countInStock) {
            i.qty = i.countInStock
          }

          newArr.push(i)
          exist = true
        } else {
          newArr.push(i)
        }
      }
      if (!exist) {
        newArr.push(val)
      }
      localStorage.setItem("cartItems", JSON.stringify(newArr))
      return newArr
    })
  }, [])
  const removeCart = useCallback((name) => {
    setCartItems((items) => {
      const newArr = items.filter((x) => x.name !== name)
      localStorage.setItem("cartItems", JSON.stringify(newArr))
      return newArr
    })
  }, [])
  const initCart = useCallback(() => {
    const arr = JSON.parse(localStorage.getItem("cartItems")) || []
    setCartItems(arr)
  }, [])

  const login = useCallback((userData) => {
    setToken(userData.token)
    setUserData(userData)
    localStorage.setItem("userData", JSON.stringify(userData))
  }, [])
  const logout = useCallback(() => {
    setToken(null)
    localStorage.removeItem("userData")
  }, [])

  const autoLogin = useCallback(() => {
    const userData = JSON.parse(localStorage.getItem("userData"))
    if (userData) {
      setUserData(userData)
      if (userData.exp * 1000 > new Date()) {
        login(userData)
      } else {
        logout()
      }
    } else {
      logout()
    }
  }, [login, logout])

  const updateUser = useCallback(
    (newData) => {
      newData["token"] = token
      newData["exp"] = userData.exp
      setUserData(newData)
      localStorage.setItem("userData", JSON.stringify(newData))
    },
    [token, userData.exp]
  )

  return {
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
  }
}
