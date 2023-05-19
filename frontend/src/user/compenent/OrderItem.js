import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import React from "react"

const OrderItem = ({ data }) => {
  const string = `${data.qty} x $${data.price} = $${data.qty * data.price}`
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar
            variant="square"
            sx={{ width: 50, height: 50 }}
            src={data.image}
            alt={data.name}
          ></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={data.name}
          sx={{ ml: 2 }}
          secondary={<Typography>{string}</Typography>}
        />
      </ListItem>
      <Divider />
    </>
  )
}

export default OrderItem
