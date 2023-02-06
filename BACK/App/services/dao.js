//Dentro de la carpeta services creamos el archivo dao.js, importamos user_queries.js y definimos las dos
//funciones que vamos a utilizar, una para buscar si un usuario ya está registrado y otra para insertar un nuevo usuario en la base de datos.

import userQueries from "./mysql_queries/user_queries.js";
import productQueries from "./mysql_queries/product_queries.js";
const dao = {};

// Buscar un usuario por el email
dao.getUserByEmail = async (email) => await userQueries.getUserByEmail(email);
// Añadir un nuevo usuario
dao.addUser = async (userData) => await userQueries.addUser(userData);

// Buscar un usuario por el id
dao.getUserById = async (id) => await userQueries.getUserById(id);

// Eliminar un usuario
dao.deleteUser = async (id) => await userQueries.deleteUser(id);

// Modificar usuario por su id
dao.updateUser = async (id, userData) =>
  await userQueries.updateUser(id, userData);

// Añadir datos de la imagen subida al servidor
dao.addImage = async (imageData) => await productQueries.addImage(imageData);

// Obtener una imagen por su id
dao.getImageById = async (id) => await productQueries.getImageById(id);

// Obtener producto por su referencia
dao.getProductByRef = async (reference) =>
  await productQueries.getProductByRef(reference);

// Añadir producto
dao.insertProduct = async (productData) =>
  await productQueries.addProduct(productData);

dao.getProduct = async () => await productQueries.getProduct();

dao.getProductById = async (id) => await productQueries.getProductById(id);
export default dao;

//En este archivo iremos definiendo todas las funciones que nos servirán de enlace entre el controlador y la base de datos.
