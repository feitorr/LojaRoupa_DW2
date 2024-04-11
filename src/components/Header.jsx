import React from 'react';
import { IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import '../css/Header.css';

const Header = () => {
  return (<>
    <header className="header">
      <div className="header-title">
        <span className="header-rizz">RIZZ</span>
        <span className="header-land">LAND</span>
      </div>
      <div className="header-buttons">
      <IconButton color="inherit" className="header-button">
        <ShoppingCartIcon fontSize="large" />
      </IconButton>
      <IconButton color="inherit" className="header-button">
        <PersonIcon />
      </IconButton>
      </div>
    </header>
     <div className='headerDivisiveLine'>
     </div>
     
     </>
  );
};

export default Header;