import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { ShoppingCart } from '@mui/icons-material';
import  ImageIcon from '../../assets/23788721_6862816.svg'
import { TopNavigation } from '../../Lib/Routes/routes';
import { Link, NavLink, useNavigate} from 'react-router-dom';
import './style.css'
import { useRetrieveCart } from '../../Hooks/UseRetrieveCart';


const CusLink = styled(NavLink)(({ theme }) => ({
  marginRight:'20px',
  //color:'rgb(0,0,128)',
  textDecoration:'none',
  fontStretch:'expanded',
  '&:hover':{
    color:theme.palette.primary.light
  }
  
}));

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const {data} = useRetrieveCart();

  const navigate = useNavigate();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={()=> navigate('/cart-page')}>
        <IconButton  size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={data?.total_items} color="error">
            <ShoppingCart/>
          </Badge>
        </IconButton>
        <p>Cart Items</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color={"warning"} position="fixed">
        <Toolbar>
          <IconButton 
            edge="end"
            aria-label="open drawer"
            sx={{ ml: 2}}
          >
            <img width={'50px'} src={ImageIcon}  />
          </IconButton>
          <Link style={{textDecoration:'none'}} to={'/'}><Typography variant="h5" noWrap fontWeight={700} fontStyle={'italic'} color={"primary"} component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Stanet Stores
          </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display:{md:'flex'}, justifyContent:'center' }} >
            {TopNavigation.map((item, index)=> <CusLink className={({ isActive, isPending }) => isActive? "active": isPending? "pending": ""}
             key={index} to={item.route}>{item.title}</CusLink>)}
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Link to={'/cart-page'}>
            <IconButton size="large" aria-label="show 4 new mails" color="primary">
              <Badge badgeContent={data?.total_items} color="error">
                <ShoppingCart/>
              </Badge>
            </IconButton>
            </Link>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="primary"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="primary"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="primary"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}