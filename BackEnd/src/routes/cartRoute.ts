import { Router } from 'express';
import controller from '../controllers/cartcontrollerhelper';

const router = Router();

// Add a product to the cart
router.post('/cart/add', controller.addToCart);

// Remove a product from the cart
router.delete('/cart/remove/:id', controller.removeFromCart);

// Display the items in the cart
router.get('/cart', controller.getCart);

// Calculate the total amount of the items in the cart
router.get('/cart/total', controller.getCartTotal);

export default router;