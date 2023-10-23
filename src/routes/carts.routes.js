import { Router } from "express";
import { createCart, getProducts, addProduct, updateCart, updateQuantity, emptyCart, deleteProduct, purchase} from "../controllers/carts.controller.js";
// Mediante FileSystem
// const CartManager = require('../managers/cart-manager')
// const Carrito = new CartManager()
// const ProductManager = require('../managers/product-manager.js')
// const ProductService = new ProductManager()


const router = Router();

router.post("/", createCart);
router.get("/:cid", getProducts);
router.post("/:cid/products/:pid", addProduct);
router.post("/:cid/purchase", purchase)
router.put("/:cid", updateCart);
router.put("/:cid/products/:pid", updateQuantity);
router.delete("/:cid", emptyCart);
router.delete("/:cid/products/:pid", deleteProduct);

export default router;




// -----------------------------Mediante DB----------------------------------
// import CartsService from '../service/carts.service.js';
// const cartsModel = required ('../dao/models/carts.model.js');
// const cartsService = new CartsService;

// router.post('/', async(req, res) =>{
//     try{
//         let result = await cartsModel.save(req.body);
//         res.status(201).send(result);
//     }catch{
//         console.error(error);
//         res.status(500).send({error:  error, message: "No se pudo guardar el carrito."});
//     }
// } )

// router.get('/:cid', getDatosControllers);

// router.post('/', postDatosControllers);

// router.delete('api/carts/:cid', deleteDatosControllers);




// -----------------------------FileSystem----------------------------------
// router.post('/', (req, res) => {
//     Carrito.createCart().then(result => res.send(result))
// })
// router.delete('/:cid', (req, res) => {
//     let param = req.params.id
//     if (isNaN(param)) return (res.status(400).send({ error: "No es un numero" }))
//     let id = parseInt(param)
//     Carrito.deleteById(id).then(result => res.send(result))
// })
// router.post('/:cid/product/:pid', async (req, res) => {
//     let param = req.params.id
//     let productsId = req.body
//     let realProducts = []
//     if (isNaN(param)) return (res.status(400).send({ error: "No es un numero" }))
//     let id = parseInt(param)
//     await Promise.all(productsId.map(async (products) => {
//         console.log(products)
//         let verifier = await ProductService.getById(products)
//         console.log(verifier)
//         if (!verifier.error) {
//             realProducts.push(products)
//         }
//     })).then(Carrito.addItem(id, realProducts).then(result => res.send(result)))

// })
// router.get('/:cid', async (req, res) => {
//     let param = req.params.id
//     if (isNaN(param)) return (res.status(400).send({ error: "No es un numero" }))
//     let id = parseInt(param)
//     let cart = await Carrito.getById(id)
//     let productsId = cart.products
//     let cartProducts = []
//     await Promise.all(productsId.map(async (products) => {
//         let newProduct = await ProductService.getById(products)
//         cartProducts.push(newProduct)
//     }))
//     res.send(cartProducts)
// })
// router.delete('/:cid/products/:pid', (req, res) => {
//     let cartIdParam = req.params.id
//     let prodIdParam = req.params.pid
//     if (isNaN(cartIdParam || prodIdParam)) return (res.status(400).send({ error: "No es un numero" }))
//     let cartId = parseInt(cartIdParam)
//     let prodId = parseInt(prodIdParam)
//     Carrito.deleteItem(cartId, prodId).then(result => res.send(result))
// })
// module.exports = router 