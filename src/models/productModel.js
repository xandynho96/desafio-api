import { getDb } from '../config/database.js';

const productsCollection = () => getDb().collection('products'); // Nome da coleção no MongoDB

export const getAllProducts = async () => {
    return await productsCollection().find({}).toArray();
};

export const deleteProductById = async (id) => {
    return await productsCollection().deleteOne({ id });
};

export const createProduct = async (newProduct) => {
    return await productsCollection().insertOne(newProduct);
};
