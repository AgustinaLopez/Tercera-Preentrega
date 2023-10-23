import {cartsModel} from "../dao/models/carts.model.js";

export default class CartsService {
    constructor() { 
        console.log("Usando carritos con persistencia DB en mongodb");
    }

    getAll = async () => {
        let carts = await cartsModel.find();
        return carts.map(cart=>cart.toObject());
    }
    save = async (cart) => {
        let result = await cartsModel.create(cart);
        return result;
    }

    deleteCart = async (id) => {
        let result = await cartsModel.delete(id);
        return result;
    }
}


