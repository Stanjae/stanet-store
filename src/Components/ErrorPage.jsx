import { Typography, Container } from "@mui/material";
import { useRouteError } from "react-router-dom";



export default function ErrorPage() {
  const FishType = useRouteError();

  return (
    <Container sx={{p:5}} id="error-page">
      <Typography gutterBottom fontStyle={'italic'} variant="h2" fontWeight={700} align="center">Oops!!</Typography>
      <Typography gutterBottom variant="body1" align="center" >Sorry, an unexpected error has occurred.</Typography>
       <Typography align="center" variant="h5" gutterBottom color={'error'} >
        <i>{FishType.statusText || FishType.error.message}</i>
      </Typography> 
    </Container>
  );
}