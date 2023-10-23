import { productsService } from "../repositories/index.js";

export const getProducts = async (req, res) => {
  try {
    const products = await productsService.getProducts();
    res.json({ status: "success", payload: products });
  } catch (error) {
    console.log(error);
    res.json({ result: "error", error });
  }
};

export const getProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productsService.getProduct(pid);
    res.json({ status: "success", payload: product });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = req.body;
    const result = await productsService.createProduct(product);

    res.json({ status: "success", payload: result });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productsService.getProduct(pid)
    console.log(product)
    const updatedProduct = {
      ... product,
      ... req.body
    }
    const result = await productsService.updateProduct(pid, updatedProduct);
    res.json({ status: "success", payload: result });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const result = await productsService.deleteProduct(pid);

    res.json({ status: "success", payload: result });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error });
  }
};
