//import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import ShopRoot from './Root/ShopRoot';
import Home from './Pages/Home/Home';
import ErrorPage from './Components/ErrorPage.jsx';
import Store from './Pages/Store';
import { green} from '@mui/material/colors';
import CartPage from './Pages/Cartpage/CartPage';
import Checkout from './Pages/Checkout/Checkout';
import { ThemeProvider } from '@mui/material';
import OrderConfirmation from './Pages/OrderConfirmation/OrderConfirmation.jsx';
import Index from './Pages/ContactUs/Index.js';

const theme = createTheme({
 palette: {
   primary: {
      main: '#06ABEF',
    },
    warning:{
      main: '#fff',
      dark:'#000',
      light:green[500]
    }
  },
  typography: {
    subtitle1: {
      fontSize: '18px',
      lineHeight:'30.6px',
      letterSpacing:'normal'
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'regular',
    },
    h1:{
      fontWeight:'700',
      lineHeight:'70px',
      letterSpacing:'normal',
      fontSize:'65px',
      '@media (max-width:1200px)': {
        fontSize: '50px',
      },
    },
    h5:{
      fontSize:'20px',
      lineHeight:'30px',
      letterSpacing:'normal'
    }
  },
}); 


const router = createBrowserRouter([
  {
    path: "/",
    element: <ShopRoot/>,
    errorElement: <ErrorPage/>,
    children:[
      {
        index:true,
        element:<Home/>,
        
      },
      {
        path:'store',
        element:<Store/>
      },
      {
        path:'cart-page',
        element:<CartPage/>
      },
      {path:'checkout', element:<Checkout/>},
      {path:'receipt', element:<OrderConfirmation/>},
      {
        path:'contact-us',
        element:<Index/>
      }
    ]
  },
]);

function App() {

  return (
    <>
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <RouterProvider router={router}/>
    </ThemeProvider>
    
    </>
  )
}

export default App