const API = {
  fetchAllProducts: () => {
    const endpoint = `products`;
    return endpoint;
  },
  fetchProductById: (id) => {
    const endpoint = `products/${id}`;
    return endpoint;
  },
};

export default API;
