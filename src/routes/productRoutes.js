import express from 'express';
import { getProducts, deleteProduct, createProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);

router.post('/', createProduct);

router.delete('/:id', deleteProduct);

export default router;
