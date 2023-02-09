//Dentro de la carpeta services creamos el archivo dao.js, importamos user_queries.js y definimos las dos
//funciones que vamos a utilizar, una para buscar si un usuario ya está registrado y otra para insertar un nuevo usuario en la base de datos.

import userQueries from "./mysql_queries/user_queries.js";
import productQueries from "./mysql_queries/product_queries.js";
const dao = {};

// AJOUTER UN NOUVEL UTILISATEUR
dao.addUser = async (userData) => await userQueries.addUser(userData);

// CHERCHER UN UTILISATEUR PAR SON EMAIL
dao.getUserByEmail = async (email) => await userQueries.getUserByEmail(email);

// CHERCHER UN UTILISATEUR PAR SON ID
dao.getUserById = async (id) => await userQueries.getUserById(id);

// SUPPRIMER UN UTILISATEUR
dao.deleteUser = async (id) => await userQueries.deleteUser(id);

// MODIFIER UN UTILISATEUR PAR SON EMAIL
dao.updateUser = async (id, userData) =>
  await userQueries.updateUser(id, userData);

//-------------

// OBTENIR UN PRODUIT PAR SA REFERENCE
dao.getProductByRef = async (reference) =>
  await productQueries.getProductByRef(reference);

// AJOUTER UN PRODUIT
dao.insertProduct = async (productData) =>
  await productQueries.addProduct(productData);

  // OBTENIR UN PRODUIT
dao.getProduct = async () => await productQueries.getProduct();

// OBTENIR UN PRODUIT PAR SON ID
dao.getProductById = async (id) => await productQueries.getProductById(id);
export default dao;

// SUPPRIMER UN PRODUIT
dao.deleteProduct = async (id) => await productQueries.deleteProduct(id);


// MODIFIER UN PRODUIT PAR SON ID
dao.updateProduct = async (id, productData) =>
  await productQueries.updateProduct(id, productData);
//En este archivo iremos definiendo todas las funciones que nos servirán de enlace entre el controlador y la base de datos.
