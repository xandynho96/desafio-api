import * as productModel from '../models/productModel.js';

// Controlador para buscar todos os produtos
export const getProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos no MongoDB:', error);
        res.status(500).json({ error: 'Erro ao buscar produtos no MongoDB' });
    }
};

// Controlador para deletar um produto
export const deleteProduct = async (req, res) => {
    const productId = parseInt(req.params.id); // Obter o ID do produto da URL
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

// Controlador para criar um novo produto
export const createProduct = async (req, res) => {
    try {
        const newProduct = req.body; // Obter os dados do produto do corpo da requisição

        // Validação simples para garantir que os campos obrigatórios existam
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
        res.status(201).json(result); // Retornar sucesso com o ID do novo produto
    } catch (error) {
        console.error('Erro ao criar produto no MongoDB:', error);
        res.status(500).json({ error: 'Erro ao criar produto no MongoDB' });
    }
};
