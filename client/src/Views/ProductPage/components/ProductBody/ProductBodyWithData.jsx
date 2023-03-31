import React from 'react';
import { useParams } from 'react-router-dom';
import API from '../../../../API';
import { useContentFetch } from '../../../../hooks/useContentFetch';
import Product from './ProductBody';

const ProductBody = () => {
  const { id } = useParams();
  const {
    loading,
    error,
    contentState: ProductData,
  } = useContentFetch(API.fetchProductById(id));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  if (Object.keys(ProductData).length > 0)
    return <Product product={ProductData} />;
};

export default ProductBody;
