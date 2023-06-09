import React from 'react';
import API from '../../../../API';
import { useContentFetch } from '../../../../hooks/useContentFetch';
import ProductList from './ProductList';

const ProductListWithData = () => {
  const {
    loading,
    error,
    contentState: ProductData,
  } = useContentFetch(API.fetchAllProducts(), true, 'allProducts');
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  if (Object.keys(ProductData).length >= 1)
    return <ProductList ProductData={ProductData} />;
};

export default ProductListWithData;
