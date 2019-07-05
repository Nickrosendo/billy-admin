import React from 'react';

import ShoppingCart from '@material-ui/icons/ShoppingCartOutlined';
import { Typography, Button } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(255, 180, 106)',
      contrastText: '#fff',
    },
    text: {
      main: '#fff',
    },
  },
});


export default function EmptyStateMenu() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <ShoppingCart style={{ fontSize: 144 }} />
      <Typography variant="h3" component="h1">
        Nenhum produto cadastrado
      </Typography>
      <MuiThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="primary"          
          size="large"
          style={{
            margin: 15
          }}
        >
          Cadastrar produto
        </Button>
      </MuiThemeProvider>
    </div>
  );
}
