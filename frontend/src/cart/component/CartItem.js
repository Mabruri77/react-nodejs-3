import { Delete } from "@mui/icons-material"
import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material"
import React, { useContext } from "react"
import { StateContext } from "../../shared/context/StateContext"

const CartItem = ({ data }) => {
  const state = useContext(StateContext)
  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="comments"
            onClick={() => {
              state.removeCart(data.name)
            }}
          >
            <Delete />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar
            variant="square"
            sx={{ width: 100, height: 100 }}
            src={data.image}
            alt={data.name}
          ></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={data.name}
          sx={{ ml: 2 }}
          secondary={
            <>
              <Typography component="span">price: ${data.price}</Typography>
              <br />
              <Typography component="span">quantity: {data.qty}</Typography>
            </>
          }
        />
      </ListItem>
      <Divider />
    </>
  )
}

export default CartItem
