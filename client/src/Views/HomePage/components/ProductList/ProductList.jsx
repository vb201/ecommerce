import { Grid } from '@mui/material';

import API from '../../../../API';
import { useContentFetch } from '../../../../hooks/useContentFetch';
import ProductCard from './ProductCard';

const ProductList = () => {
  const {
    loading,
    error,
    contentState: products,
  } = useContentFetch(API.fetchAllProducts());

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  return (
    <Grid
      container
      spacing={2}
    >
      {products.map((product, index) => (
        <Grid
          key={index}
          item
          xs={12}
          sm={6}
          md={4}
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
