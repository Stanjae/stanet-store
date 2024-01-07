import React from 'react';
import { Typography, Button, Container, Box, } from '@mui/material';
import CartItem from '../../Components/Cartitem/CartItem';
import { styled } from '@mui/material/styles';
import { EmptyCart, useRetrieveCart } from '../../Hooks/UseRetrieveCart';
import { useNavigate } from 'react-router-dom';
import { ClearAll } from '@mui/icons-material';

interface ItemProps{
    id:string,
    image:{url:string},
    product_name:string,
    quantity:number,
    line_total:{ formatted_with_symbol:string},
    subtotal:{ formatted_with_symbol:string}

}

const CusContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(10),
    
  }));

  const CusBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-between',
    
  }));


const CartPage: React.FC = () => {

  //get Cart
 const {data} = useRetrieveCart()


 //empty cart
 const {Emptymutation} = EmptyCart()

 const navigate = useNavigate()

 

  return (
    <CusContainer >
        <Box sx={{display:'flex', py:'10px', justifyContent:'space-between', alignItems:'center'}}>
            <Typography variant="h4" gutterBottom> Your Cart</Typography>
            <Button variant='outlined' onClick={()=> Emptymutation.mutateAsync()} color='error' endIcon={<ClearAll/>} >Clear Cart</Button>
        </Box>
      
       {data?.line_items?.map((item:ItemProps) => (
        <CartItem id={item?.id} quantity={item?.quantity} image={item?.image?.url} key={item?.id} name={item?.product_name} price={item?.line_total?.formatted_with_symbol}  />
      ))} 
      <CusBox>
        <Typography variant="h6">Total Items:</Typography>
        <Typography variant="h6">{data?.total_items}</Typography>
      </CusBox>
      <CusBox>
        <Typography variant="h6">Total:</Typography>
        <Typography variant="h6">{data?.subtotal?.formatted_with_symbol}</Typography>
      </CusBox>
      <Button onClick={()=> navigate('/store')}  variant="outlined" color="info">
        Continue Shopping
      </Button>
      {data?.line_items?.length && <Button onClick={()=> navigate('/checkout')}  sx={{color:'#fff', mx:'10px'}} variant="contained" color="primary">
        Checkout
      </Button>}
    </CusContainer>
  );
};

export default CartPage;
