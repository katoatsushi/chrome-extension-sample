import React , { useEffect, useState } from 'react';
import { AppBar, Toolbar,Typography  } from '@mui/material';
import { BrowserRouter as Router, Switch, useLocation, useHistory } from 'react-router-dom';

function Header() {
  const history = useHistory();

  return (
    <div>
      <AppBar position="static" style={{backgroundColor: '#4DA7F0'}}>
        <Toolbar>
          <Typography variant="h6"> Solberry </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header
