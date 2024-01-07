import { Home, ShoppingBag } from '@mui/icons-material'
import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';


const OrderConfirmation = () => {
    const getOrder = JSON.parse(sessionStorage.getItem('order_receipt'))

    const navigate = useNavigate();
  return (
    <Box sx={{px:{md:6, xs:1}, py:{md:6, xs:2}, mx:'auto'}}>
        <Paper elevation={3} sx={{px:3, pt:5, pb:2, width:'75%'}}>
            <Typography py={2} gutterBottom align='center' fontWeight={500} variant='h4'>
                Order Receipt
            </Typography>
            <Typography py={2} gutterBottom align='center' fontStyle={'italic'} variant='h5'>
                Thank you for your purchase, {getOrder?.customer?.firstname} {getOrder?.customer?.lastname}!
            </Typography>
            <Typography gutterBottom align='center'>
                <span>Order Ref</span> {getOrder?.customer_reference}
            </Typography>
            <Stack my={4} spacing={2} justifyContent={'center'} direction={'row'} >
                <Button startIcon={<Home/>} onClick={()=> navigate('/')} variant="outlined">Back to Home</Button>
                {<Button endIcon={<ShoppingBag/>} sx={{color:'#fff'}} onClick={()=>navigate('/store')} variant="contained"> Continue Shopping </Button>}
            </Stack>
            
        </Paper>
    </Box>
  )
}

export default OrderConfirmation