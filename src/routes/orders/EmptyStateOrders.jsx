import React from 'react';

import FastFood from '@material-ui/icons/FastfoodOutlined';
import { Typography } from '@material-ui/core';

export default function EmptyStateOrders() {
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
      <FastFood style={{ fontSize: 144 }} />
      <Typography variant="h3" component="h1">
        Nenhum pedido<br />foi feito ainda
      </Typography>
    </div>
  );
}
