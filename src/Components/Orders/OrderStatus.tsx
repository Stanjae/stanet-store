import { CancelRounded, CheckCircleRounded } from "@mui/icons-material"
import { Box, Button, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

interface Paymentstatuso{
    paymentstatus:boolean,
}

const OrderStatus = ({paymentstatus}:Paymentstatuso) => {
    const navigate = useNavigate()
  return (
    <Box p={3}>
        <Box sx={{display:'flex', justifyContent:'center', p:3}}>
        {paymentstatus ?
            <CheckCircleRounded sx={{fontSize:{md:'50px', xs:'35px'}}}  color="success"/>
            :
            <CancelRounded sx={{fontSize:{md:'50px', xs:'35px'}}} color="error"/>
        }
        </Box>
        <Box>
            {paymentstatus ?
            <Typography gutterBottom variant="h5" align="center" fontWeight={500} fontStyle={'italic'}>Congrats, Payment was Successful</Typography>
            :
            <Typography gutterBottom variant="h5" align="center" fontWeight={500} fontStyle={'italic'}>An Error occured. Payment was Unsuccessful!</Typography>
            }
            <Stack spacing={2} py={1} justifyContent={'center'} direction={'row'} >
                <Button onClick={()=> navigate('/store')} variant="outlined">Back to Store</Button>
                {paymentstatus &&<Button onClick={()=>navigate('/receipt')} sx={{color:'#fff'}} variant="contained">Order Receipt</Button>}
            </Stack>
        </Box>
    </Box>
  )
}

export default OrderStatus