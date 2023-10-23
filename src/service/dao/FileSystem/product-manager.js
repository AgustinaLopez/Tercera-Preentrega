class Product {

    constructor(title, description, price, thumbnail, code, stock){
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;

    }   

};


class ProductManager {
    #products;
    #productDirPath;
    #productFilePath;
    #fileSystem;
    constructor(){
        this.#products = [];
        this.#productDirPath = "./files";
        this.#productFilePath = this.#productDirPath + "/Products.json";
        this.#fileSystem = require("fs");
        this.id = 1;
    }

    generadorIdAuto(){
        return this.id++;
    }    

    //Metodos
    //Crear Producto
    addProduct = async(title, description, price, thumbnail, code, stock) => {
        let product = new Product(title, description, price, thumbnail, code, stock, this.id);
        product.id = this.id;
        
        console.log("Creando Producto");

        try {
            //Aqui se crea el directorio
            await this.#fileSystem.promises.mkdir(this.#productDirPath, {recursive: true });
            //Validamos que exista el archivo, sino crea uno vacio 
            if(!this.#fileSystem.existsSync(this.#productFilePath)){
                await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]",);
            }
            //Se lee el archivo
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");
            this.#products = JSON.parse(productsFile); //Pasamos de json a objeto
            this.#products.push(product);

            //Se sobreescribe el archivo para persistencia
            await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(this.#products ,null, 2) 
            );
            this.generadorIdAuto();
        } catch (error) {
            console.error(`Error creando producto nuevo: ${JSON.stringify(product)}, detalle del error: ${error}`);
            throw Error(`Error creando producto nuevo: ${JSON.stringify(product)}, detalle del error: ${error}`);
        }
    }


    //Buscar Productos
    getProducts = async() => {
        try {
            await this.#fileSystem.promises.mkdir(this.#productDirPath, {recursive: true });
            //Nuevamente, se crea un directorio  (si no existe, crea uno nuevo) 
            if(!this.#fileSystem.existsSync(this.#productFilePath)) {
                await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
            }

            //Se lee el archivo
            let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");
            this.#products = JSON.parse(productsFile);
            console.log("Productos encontrados");
            console.log(this.#products);
            return this.#products
        } catch (error) {
            console.error(`Error consultando los productos`);
            throw Error(`Error consultando los productos`);
        }
    }
    
    //Buscar Producto por ID
    async getProductById(id){
        try{
            await this.#fileSystem.promises.mkdir(this.#productDirPath, {recursive: true });
            if(!this.#fileSystem.existsSync(this.#productFilePath)){
                await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
            }

            if (id) {
                let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");
                this.#products = JSON.parse(productsFile);
                
                for (let product of this.#products) {
                  if (product.id === id) {
                    console.log("Producto encontrado:")
                    return product;
                  }
                }
              }else{ console.error(`No se encontro el producto`)}
        } catch (error){
            throw Error(error);
        }
    }

    //Editar Producto 
    updateProduct = async(id, value , key) =>{
        try{
            await this.#fileSystem.promises.mkdir(this.#productDirPath, {recursive: true });
            if(!this.#fileSystem.existsSync(this.#productFilePath)){
                await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
            }
            if(id){
                let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");
                this.#products = JSON.parse(productsFile);
                
                for(let product of this.#products){
                    if (product.id === id ) {{
                        product[key] = value;}
                      }
              
                }
                
                await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(this.#products, null, 2));
                console.log("Producto Editado con éxito!");
            }

        
        console.log("Producto Editado con exito!");
        }catch(error){
            console.error(`No se pudo Modificar`);
            throw Error(`No se pudo Modificar`);
        }
    };

    //Eliminar Producto
    deleteProduct = async (id) => {
        try {
        await this.#fileSystem.promises.mkdir(this.#productDirPath, { recursive: true });
    
        if (!this.#fileSystem.existsSync(this.#productFilePath)) {
            await this.#fileSystem.promises.writeFile(this.#productFilePath, "[]");
        }
    
        let productsFile = await this.#fileSystem.promises.readFile(this.#productFilePath, "utf-8");
        this.#products = JSON.parse(productsFile);
    
        const updatedProducts = this.#products.filter(product => product.id !== id);
    
        await this.#fileSystem.promises.writeFile(this.#productFilePath, JSON.stringify(updatedProducts, null, 2));
        console.log("Producto eliminado con éxito!");
        } catch (error) {
        console.error("No se pudo eliminar el producto");
        throw new Error("No se pudo eliminar el producto");
        }
    };
}  


module.exports = ProductManager;