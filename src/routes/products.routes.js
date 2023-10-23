import { Router } from "express";

import { getProducts, getProduct, addProduct, updateProduct, deleteProduct} from "../controllers/products.controller.js";
import { passportCall, authorization } from "../middleware/auth.js";
  
const router = Router();
  
router.get("/", passportCall("current"), getProducts);
router.get("/:pid", passportCall("current"), getProduct);
router.post("/", passportCall("current"), authorization("admin"), addProduct);
router.put("/:pid", passportCall("current"), authorization("admin"), updateProduct);
router.delete("/:pid", passportCall("current"), authorization("admin"), deleteProduct);
  
export default router;



// -----------------------------Mediante DB----------------------------------------
// const productsModel = required ('../dao/models/products.model');
// const router = router();
// const products = new ProductManager()
// const productsService = new productsService
// router.post('/', async(req, res) =>{
//     try{
//         let result = await productsService.save(req.body);
//         res.status(201).send(result);
//     }catch{
//         console.error(error);
//         res.status(500).send({error:  error, message: "No se pudo guardar el producto."});
//     }
// } )

// router.get('/',async(req,res)=>{
//     try {
   
//         let aggregationStages = [];
    
//         aggregationStages.push({ $match: { description: "" } });

       
//         aggregationStages.push({ $sort: { price: 1 } });
    
//         aggregationStages.push({ $limit: 10 });
    
//         let products = await productsModel.aggregate(aggregationStages);
    
//         res.send(products);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({error:  error, message: "No se pudo obtener los productos."});
//     }
// })


// router.get('/',async(req,res)=>{
//     try {
//         let products = await productsModel.paginate();
//         res.send(products);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({error:  error, message: "No se pudo obtener los productos."});
//     }
// })








// -----------------------------FileSystem----------------------------------------
//Creacion de endpoints
// router.get('/', (req, res) =>{
//     products.getProducts().then(productos => res.send(productos))
//     res.render('home', {productos})
// })

// router.get('/:pid', (req, res) =>{
//     let param = req.params.id 
//     if (isNaN(param)) return (res.status(400).send({ error: "No es un numero"}))
//     let id = parseInt(param)
//     products.getProductById(id).then( productId => res.send(productId))
// })


// router.post('/', (req, res) =>{

//     if (admin) {
//     let product = req.body
//     products.addProduct(product).then(newProduct => res.send(newProduct)).then(socket.broadcast.emit('mensaje1', "Producto Agregado"))
//     }else {
//         res.send({ status: "error", description: "Error"})
//     }

    
// })

// router.put("/:pid", (req, res) =>{
//     if(admin) {
//         let param =req.params.id
//         if (isNaN(param)) return (res.status(400).send({error: "No es un numero"}))
//         let id = parseInt(param)
//         let product = req.body
//         products.updateProduct(product, id).then (productoEditado => res.send(productoEditado))
//     }else{
//         res.send({status: "error", description: "Error"})
//     }
// })

// router.delete("/:pid", (req, res) =>{
//     if (admin) {
//         let param = req.params.id
//         if (isNaN(param)) return (res.status(400).send({ error: "No es un numero" }))
//         let id = parseInt(param)
//         products.deleteProduct(id).then(productoEliminado => res.send(productoEliminado))
//     }else {
//         res.send({status: "error", description: "Error"}).then(socket.broadcast.emit('mensaje2', "Producto Eliminado"))
//     }

// })


// module.exports = router;