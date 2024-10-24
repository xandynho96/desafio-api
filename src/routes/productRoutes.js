import express from 'express';
import { getProducts, deleteProduct, createProduct } from '../controllers/productController.js';

const router = express.Router();

// Rota para buscar todos os produtos (GET)
router.get('/', getProducts);

// Rota para criar um novo produto (POST)
router.post('/', createProduct);

// Rota para deletar um produto (DELETE)
router.delete('/:id', deleteProduct);

export default router;
