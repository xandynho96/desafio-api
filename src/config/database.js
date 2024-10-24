import { MongoClient } from 'mongodb';

let mongoClient;
let mongoDb;

export const connectToMongoDB = async () => {
    const mongoUri = process.env.MONGO_URI;
    try {
        mongoClient = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
        await mongoClient.connect();
        mongoDb = mongoClient.db('Cluster0'); // Nome do banco de dados
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
    }
};

export const getDb = () => mongoDb;
