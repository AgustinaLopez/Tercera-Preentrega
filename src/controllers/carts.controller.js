import CartModel from "../service/dao/models/carts.model.js";
import ProductModel from "../service/dao/models/products.model.js";
import { productsService, cartsService } from "../repositories/index.js";

// const getAll = require('../service/carts.service.js');
// const save = require('../service/carts.service.js');
// const deleteCart = require('../service/carts.service.js');


// Crear carrito
export const createCart = async (req, res) => {
    try {
      const cart = await cartsService.createCart()
      res.json({ status: "success", payload: cart });
    } catch (error) {
      res.json({ status: "error", error });
    }
};


// Obtener productos de un carrito
  export const getProducts = async (req, res) => {
    try {
      const cid = req.params.cid;
      const cart = await cartsService.getCart(cid)
      res.json({ status: "success", payload: cart });
    } catch (error) {
      res.json({ status: "error", error });
    }
};


// Agregar producto a un carrito
  export const addProduct = async (req, res) => {
    try {
      const {cid, pid} = req.params;
      const cart = await cartsService.getCart(cid)
      const product = await productsService.getProduct(pid)
      const updatedCart = await cartsService.addProductToCart(cart, product)
  
      res.json({ status: "success", payload: updatedCart });
    } catch (error) {
      console.log(error)
      res.json({ status: "error", error });
    }
};

// Actualizar carrito con un arreglo de productos
export const updateCart = async (req, res) => {
    try {
      const cid = req.params.cid;
      const products = req.body;
      
      const prod = await Promise.all(products.map(async p => await productsService.getProduct(p.product)))
      if(prod.some(p => p === null)) return res.json({ status: 'error', error: 'Some product does not exist' })
  
      const cart = await cartsService.updateCart(cid, {products})
  
      res.json({ status: "success", payload: cart });
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error });
    }
};


// Actualizar la cantidad
export const updateQuantity = async (req, res) => {
   try {
      const {cid, pid} = req.params;
      const {quantity} = req.body;
  
      const cart = await cartsService.getCart(cid)
      const product = await productsService.getProduct(pid)
      
      if (!cart) return res.send({ status: "error", error: "No se ha encontrado el carrito" });
      if (!product) return res.send({ status: "error", error: "No se ha encontrado el producto" });
  
      const productIndex = cart.products.findIndex((p) => p.product.equals(product._id))
      cart.products[productIndex].quantity = parseInt(quantity)
      const updatedCart = await cartsService.updateCart(cid, cart)
  
      res.json({ status: "success", payload: updatedCart });
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error });
    }
};


// Vaciar carrito
export const emptyCart = async (req, res) => {
    try {
      const cid = req.params.cid;
      const cart = await cartsService.updateCart(cid, {products: []})
      res.json({ status: "success", payload: cart });
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error });
    }
};


// Eliminar producto seleccionado
export const deleteProduct = async (req, res) => {
    try {
      const { cid, pid } = req.params
  
      const cart = await CartModel.findOne({ _id: cid });
      const product = await ProductModel.findOne({ _id: pid });
  
      if (!cart) return res.send({ status: "error", error: "No se ha encontrado el carrito" });
      if (!product) return res.send({ status: "error", error: "No se ha encontrado el producto" });
  
      const productIndex = cart.products.findIndex((p) => p.product.equals(product._id));
  
      const products = [... cart.products]
      products.splice(productIndex, 1)
      const updatedCart = await cartsService.updateCart(cid, {products})
  
      res.json({ status: "success", payload: updatedCart });
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error });
    }
};


// Finalizar compra
export const purchase = async (req, res) => {
    try {
      const { cid } = req.params
      const purchaser = req.user.email
      const { outOfStock, ticket } = await cartsService.purchase(cid, purchaser)
      
      if(outOfStock.length > 0) {
        const ids = outOfStock.map(p => p._id)
        return res.json({ status: "success", payload: ids })
      }
  
      res.json({ status: "success", payload: ticket });
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error });
    }
}