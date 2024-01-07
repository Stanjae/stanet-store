import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Skeleton } from '@mui/material';
import { ShoppingCartCheckoutSharp } from '@mui/icons-material';
import { UseAddCart } from '../../Hooks/UseRetrieveCart';

interface ProductProps {
  newdata:{
      name:string,
      id:string,
      image:{url:string},
      description:string,
      price: {
          formatted:string,
          formatted_with_code:string,
          formatted_with_symbol:string,
          raw:number

      }
  },
  ispending:boolean
}

const Product = ({newdata, ispending}:ProductProps)=> {

    //addCart
    const {mutation} = UseAddCart()


  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardActionArea>
        {ispending ? <Skeleton variant="rectangular" animation="wave" width={'100%'} height={140} />:
        <CardMedia
          component="img"
          height="140"
          image={newdata?.image?.url}
          alt={newdata?.name}
        />
  }
        <CardContent>
            {ispending ?
            <Skeleton variant="text" sx={{ fontSize: '23px' }} />
            :
            <Typography gutterBottom variant="h5" component="div">
                {newdata?.name}
            </Typography>
            }
          <Typography gutterBottom variant="body2" color="text.secondary">
            {newdata?.description.replace(/<[^>]*>/g, "")}
          </Typography>

          <Typography fontWeight={600} gutterBottom variant="body1" sx={{color:'#4caf50'}}>
            {newdata?.price?.formatted_with_symbol}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button onClick={()=> mutation.mutateAsync(newdata?.id)} sx={{color:'#fff'}} variant="contained" size='small' startIcon={<ShoppingCartCheckoutSharp/>}> Add to Cart</Button>
      </CardActions>
    </Card>
  );
}
export default Product;