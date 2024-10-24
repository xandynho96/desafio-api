import * as productModel from '../models/productModel.js';

export const getProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos no MongoDB:', error);
        res.status(500).json({ error: 'Erro ao buscar produtos no MongoDB' });
    }
};

export const deleteProduct = async (req, res) => {
    const productId = parseInt(req.params.id); 
    try {
        const result = await productModel.deleteProductById(productId);

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar produto no MongoDB:', error);
        res.status(500).json({ error: 'Erro ao deletar produto no MongoDB' });
    }
};

export const createProduct = async (req, res) => {
    try {
        const newProduct = req.body; 

        if (
            !newProduct.id ||
            !newProduct.name ||
            !newProduct.description ||
            !newProduct.price ||
            !newProduct.image ||
            !newProduct.proportion ||
            typeof newProduct.proportion.coffee !== 'number' ||
            typeof newProduct.proportion.milk !== 'number'
        ) {
            return res.status(400).json({ error: 'Faltando campos obrigatórios ou estrutura inválida' });
        }

        const result = await productModel.createProduct(newProduct);
        res.status(201).json(result); 
    } catch (error) {
        console.error('Erro ao criar produto no MongoDB:', error);
        res.status(500).json({ error: 'Erro ao criar produto no MongoDB' });
    }
};
