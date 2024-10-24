import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

// Configuração do MongoDB
const mongoUri = process.env.MONGO_URI;
let mongoClient;
let mongoDb;

const connectToMongoDB = async () => {
    try {
        mongoClient = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
        await mongoClient.connect();
        mongoDb = mongoClient.db('Cluster0'); // Substitua pelo nome do seu banco de dados no MongoDB
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
    }
};

connectToMongoDB();

const app = express();
app.use(cors());
app.use(express.json());

// Rota para buscar todos os produtos (GET)
app.get('/api/mongo-products', async (req, res) => {
    try {
        const productsCollection = mongoDb.collection('products'); // Nome da coleção no MongoDB
        const products = await productsCollection.find({}).toArray();
        res.json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos no MongoDB:', error);
        res.status(500).json({ error: 'Erro ao buscar produtos no MongoDB' });
    }
});

// Rota para deletar um produto (DELETE)
app.delete('/api/mongo-products/:id', async (req, res) => {
    const productId = req.params.id; // Obter o ID do produto da URL
    try {
        const productsCollection = mongoDb.collection('products'); // Nome da coleção no MongoDB
        const result = await productsCollection.deleteOne({ id: Number(productId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        res.status(200).json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar produto no MongoDB:', error);
        res.status(500).json({ error: 'Erro ao deletar produto no MongoDB' });
    }
});

// Rota para criar um novo produto (POST)
app.post('/api/mongo-products', async (req, res) => {
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

        const productsCollection = mongoDb.collection('products'); // Nome da coleção no MongoDB
        const result = await productsCollection.insertOne(newProduct);
        res.status(201).json(result); // Retornar sucesso com o ID do novo produto
    } catch (error) {
        console.error('Erro ao criar produto no MongoDB:', error);
        res.status(500).json({ error: 'Erro ao criar produto no MongoDB' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
