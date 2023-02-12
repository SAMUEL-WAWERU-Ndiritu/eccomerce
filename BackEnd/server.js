import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

// Importing Routes
import userRoute from './src/routes/userRoute';
import ProductRoute from './src/routes/productRoute';
import cartRoute from './src/routes/cartRoute';
import OrderRoute from './src/routes/orderRoutes';

// Middleware
app.use(express.json());

// Route Middleware
app.use('/api/users', userRoute);
app.use('/api/products', ProductRoute);
app.use('/api/products/cart', cartRoute);
app.use('/api/orders', OrderRoute);

// Root Endpoint

// Listen to Server
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
