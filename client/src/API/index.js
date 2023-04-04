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
  fetchUserOrderByStatus: (status) => {
    const endpoint = `orders/user/${status}`;
    return endpoint;
  },
};

export default API;
