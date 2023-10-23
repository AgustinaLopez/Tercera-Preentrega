import productsModel from "../dao/models/products.model.js";

export default class productsService {
    constructor() { 
        console.log("Usando productos con persistencia DB en mongodb");
    }

    getAll = async () => {
        let products = await productsModel.find();
        return products.map(product=>product.toObject());
    }
    save = async (product) => {
        let result = await productsModel.create(product);
        return result;
    }

    deleteProduct = async (id) => {
        let result = await productsModel.delete(id);
        return result;
    }
}
