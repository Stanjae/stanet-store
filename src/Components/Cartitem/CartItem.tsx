import React from 'react';
import { Delete } from '@mui/icons-material';
import { Box, Button, IconButton, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RemoveItemFromCart, UpdateCart } from '../../Hooks/UseRetrieveCart';



const CusPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  }));

interface CartItemProps {
  name: string;
  price: string;
  quantity: number;
  image:string,
  id:string
  /* onRemove: () => void; */
}



const CartItem: React.FC<CartItemProps> = ({ name, price, quantity, image, id }) => {

 const {RemoveItemmutation} = RemoveItemFromCart();

 const {Updatemutation} = UpdateCart();

 const IncreaseCart =(productId:string, quant:number)=>{
    let quantity = quant + 1;
    Updatemutation.mutate({productId, quantity})

 };

 const DecreaseCart =(productId:string, quant:number)=>{
    let quantity = quant - 1;
    Updatemutation.mutate({productId, quantity})

 }
  return (
    <CusPaper elevation={3}>
       <img style={{objectFit:'contain', width:'40px'}} src={image}/>
      <Typography variant="subtitle1">{name}</Typography>
      <Box sx={{display:'flex',p:0.5, justifyContent:'space-between', alignItems:'center'}}> 
      <Typography color={'info'} component={'div'} variant="subtitle1">Qty: </Typography>
        <Box sx={{display:'flex', justifyContent:'center'}}>
            <Button onClick={()=> DecreaseCart(id, quantity)} variant='outlined' color='info'>-</Button>
            <TextField sx={{width:'60px', textAlign:'center'}} value={quantity} size='small'/>
            <Button size='small' onClick={()=> IncreaseCart(id, quantity)} variant='outlined' color='info' >+</Button>
        </Box>
      </Box>
      <Typography variant="subtitle1">{price}</Typography>
      <IconButton onClick={()=> RemoveItemmutation.mutateAsync(id)} color="error" >
        <Delete />
      </IconButton>
    </CusPaper>
  );
};

export default CartItem;
