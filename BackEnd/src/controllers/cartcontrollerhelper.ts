import store from './cartController';

const controller = {
  // Add a product to the cart
  addToCart(req: any, res: any) {
    const order = req.body;
    store.dispatch({ type: 'ADD_TO_CART', payload: order });
    res.status(200).send('Product added to cart');
  },

  // Remove a product from the cart
  removeFromCart(req: any, res: any) {
    const orderID = req.params.id;
    const order = store.getState().cart.find(item => item.orderID === orderID);
    store.dispatch({ type: 'REMOVE_FROM_CART', payload: order });
    res.status(200).send('Product removed from cart');
  },

  // Display the items in the cart
  getCart(req: any, res: any) {
    res.status(200).send(store.getState().cart);
  },

  // Calculate the total amount of the items in the cart
  getCartTotal(req: any, res: any) {
    res.status(200).send({ total: store.getState().total });
  },
};

export default controller;
