import { Box, Grid, Skeleton, Typography } from "@mui/material"
import Product from "../Components/Product/Product"
import { useGetProducts } from "../Hooks/UseGetProducts"

interface SingleProps {
      name:string;
      id:string;
      image:{
        url:string
      };
      description:string;
      price: {
          formatted:string;
          formatted_with_code:string;
          formatted_with_symbol:string;
          raw:number;

      }
}


const Store = () => {
  const {data, isPending, error, isFetching} = useGetProducts()

  console.log('shhh====================================');
  console.log(data);
  console.log('shhh====================================');

  if(error) alert('An error Occured!!')

  if(isFetching) <Typography align="center" fontStyle={'italic'} variant="h2">Refetching ...</Typography>

  return (
    <Box sx={{height:'100dvh', py:'10px', px:'20px'}}>

    <Grid container justifyContent={'center'} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg:12 }}>
    {isPending ? 
    <Skeleton variant="rectangular" animation="wave" width={'100%'} height={'100dvh'} />
    :
    <>
      {data?.map((newdata : SingleProps, index:number) => (
                <Grid item xs={2} sm={4} md={4} lg={3} key={index}>
                  <Product newdata={newdata} ispending={isPending}/>
                </Grid>
              ))}
    </>
}           
          </Grid>
    </Box>
  )
}

export default Store
