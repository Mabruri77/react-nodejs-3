import { createContext } from "react"

export const StateContext = createContext({
  cartItems: [],
  token: null,
  userData: {},
  addCart: () => {},
  updateUser: () => {},
  removeCart: () => {},
  login: () => {},
  logout: () => {},
})
