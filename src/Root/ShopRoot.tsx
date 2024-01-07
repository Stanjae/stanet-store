import { Outlet } from "react-router-dom"
import { Box } from "@mui/material"
import Navbar from "../Components/NavBar/Navbar"


const ShopRoot = () => {
  return (
    <>
      <Navbar/>
      <Box sx={{paddingX:'20px', marginTop:{md:'70px', xs:'80px'}}}>
        <Outlet/>
      </Box>
    </>
  )
}

export default ShopRoot
