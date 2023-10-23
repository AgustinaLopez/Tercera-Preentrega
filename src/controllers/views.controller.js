import { cartsService, productsService } from "../repositories/index.js";

// Redirección para empezar por la pantalla de login
export const redirect = (req, res) => res.redirect("/sessions/login");

// PRODUCTS
// Get products
export const getProducts = async (req, res) => {
  try {
    const { products, options: { limit, category, stock } } = await productsService.getPaginate(req)

    products.prevLink = products.hasPrevPage 
    ? `/products?page=${products.prevPage}&limit=${limit}${category ? `&category=${category}` : "" }${stock ? `&stock=${stock}` : ""}` 
    : ""
    products.nextLink = products.hasNextPage 
    ? `/products?page=${products.nextPage}&limit=${limit}${category ? `&category=${category}` : ""}${stock ? `&stock=${stock}` : ""}` 
    : ""

    const user = req.user;
    res.render("products", { products, user });
  } catch (error) {
    console.log(error);
    res.render("base", {error});
  }
};

// Create products form
export const renderForm = async (req, res) => {
  const user = req.user;
  res.render("create", { user });
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    await productsService.deleteProduct(pid)
    res.redirect("/products");
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error });
  }
};

// Get one product
export const getProduct = async (req, res) => {
  try {
    const pid = req.params.pid;
    const product = await productsService.getProduct(pid)
    const user = req.user;
    res.render("oneProduct", { product, user });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error });
  }
};

// Add product
export const addProduct = async (req, res) => {
  try {
    const data = req.body;
    const product = await productsService.createProduct(data)

    res.redirect("/products/" + product._id);
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error });
  }
};

// Filter by category
export const filterByCategory = async (req, res) => {
  try {
    const category = req.body.category;
    res.redirect(`/products?category=${category}`);
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error });
  }
};

// CARTS
// Get cart products
export const getCartProducts = async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartsService.getCart(cid)
    const products = cart.toObject()

    const user = req.user;
    res.render("cart", { cid, products, user });
  } catch (error) {
    console.log(error);
    res.json({ result: "error", error });
  }
};

// Add product to cart
export const addToCart = async (req, res) => {
  try {
    const {cid, pid} = req.params
    const cart = await cartsService.getCart(cid)
    const product = await productsService.getProduct(pid)
    cartsService.addProductToCart(cart, product)
    res.redirect("/carts/" + cid);
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error });
  }
};

// Delete product from cart
export const deleteCartProducts = async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartsService.updateCart(cid, {products: []})
    const user = req.user;
    res.render("cart", { cid, products: cart, user })
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error });
  }
}

// Purchase
export const purchase = async (req, res) => {
  try {
    const { cid } = req.params
    const purchaser = req.user.email
    const { outOfStock, ticket } = await cartsService.purchase(cid, purchaser)
    
    if(outOfStock.length > 0) {
      const ids = outOfStock.map(p => p.product)
      return res.render("purchase", { ids, ticket, cid })
    }

    res.render("purchase", { ticket })
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error });
  }
}

// SESSIONS
// Vista para registrar usuarios
export const renderRegister = (req, res) => {
  res.render("sessions/register");
};

// Vista de login
export const renderLogin = (req, res) => {
  res.render("sessions/login");
};

// Crear usuarios en la DB
export const register = async (req, res) => {
  res.redirect("/sessions/login");
};

// Login
export const login = async (req, res) => {
  const user = req.user;
  if (!user)
    return res.status(400).render("errors/base", {error: "Invalid credentials", user});

  res.cookie("cookieToken", user.token).redirect("/products");
};

// Logout
export const logout = (req, res) => {
  res.clearCookie("cookieToken").redirect("/sessions/login");
};

// Get user
export const getUser = (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(404).render("errors/base", {
      error: "User not found",
    });
  }

  res.render("sessions/user", { user });
};

// Iniciar sesión con Github
export const githubLogin = async (req, res) => {
  return res.cookie("cookieToken", req.user.token).redirect("/products");
};
