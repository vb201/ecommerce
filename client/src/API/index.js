const API = {
  fetchAllProducts: () => {
    const endpoint = `products`;
    return endpoint;
  },
  fetchProductById: (id) => {
    const endpoint = `products/${id}`;
    return endpoint;
  },
  registerUser: () => {
    const endpoint = `users/register`;
    return endpoint;
  },
};

export default API;
