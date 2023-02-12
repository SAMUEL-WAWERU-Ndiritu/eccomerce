import express from 'express';
const router = express.Router();
import { getOrders, updateOrderStatus } from '../controllers/orderConfirmation';

router.get('/', getOrders);

router.put('/:id', updateOrderStatus);

export default router;
