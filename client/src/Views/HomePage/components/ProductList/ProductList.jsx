import { Grid } from '@mui/material';

import ProductCard from './ProductCard';
import React from 'react';

const ProductList = ({ ProductData: products }) => {
  return (
    <Grid
      container
      spacing={2}
    >
      {products.map((product, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={index}
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
