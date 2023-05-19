import React, { useEffect, useState } from "react"
import { Box, CircularProgress, Grid } from "@mui/material"
import ProductItem from "./component/ProductItem"
import { useHttpHook } from "../shared/hooks/HttpHook"
const ListProduct = () => {
  const [products, setProducts] = useState(false)
  const { sendRequest } = useHttpHook()

  useEffect(() => {
    const fetchData = async () => {
      const data = await sendRequest("http://localhost:5000/api/products")
      setProducts(data)
    }
    fetchData()
  }, [sendRequest])
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    textAlign: "center",
  }

  return (
    <>
      {!products ? (
        <Box sx={style}>
          <CircularProgress sx={{ mt: 4 }} thickness={7} size={60} />
        </Box>
      ) : (
        <Grid container>
          {products.map((el) => {
            return (
              <Grid item xs={12} md={4} lg={3} key={el._id}>
                <ProductItem data={el} />
              </Grid>
            )
          })}
        </Grid>
      )}
    </>
  )
}

export default ListProduct
