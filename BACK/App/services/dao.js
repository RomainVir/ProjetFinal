//Dentro de la carpeta services creamos el archivo dao.js, importamos user_queries.js y definimos las dos
//funciones que vamos a utilizar, una para buscar si un usuario ya está registrado y otra para insertar un nuevo usuario en la base de datos.

import userQueries from "./mysql_queries/user_queries.js";
import productQueries from "./mysql_queries/product_queries.js";
import offerQueries from "./mysql_queries/offer_queries.js";
import pedidoQueries from "./mysql_queries/pedidos_queries.js";
import deliveryQueries from "./mysql_queries/delivery_queries.js";

const dao = {};

//----- USER ---------

// AJOUTER UN NOUVEL UTILISATEUR
dao.addUser = async (userData) => await userQueries.addUser(userData);

// CHERCHER UN UTILISATEUR PAR SON EMAIL
dao.getUserByEmail = async (email) => await userQueries.getUserByEmail(email);

// CHERCHER UN UTILISATEUR PAR SON ID
dao.getUserById = async (id) => await userQueries.getUserById(id);

//obtenir les users
dao.getUser = async (id) => await userQueries.getUser(id);

// SUPPRIMER UN UTILISATEUR
dao.deleteUser = async (id) => await userQueries.deleteUser(id);

// MODIFIER UN UTILISATEUR PAR SON EMAIL
dao.updateUser = async (id, userData) =>
  await userQueries.updateUser(id, userData);

//-----PRODUCT--------

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

// SUPPRIMER UN PRODUIT
dao.deleteProduct = async (id) => await productQueries.deleteProduct(id);

// SUPPRIMER UN PRODUIT
dao.deleteProductByRef = async (reference) =>
  await productQueries.deleteProductByRef(reference);

// MODIFIER UN PRODUIT PAR SON ID
dao.updateProduct = async (id, productData) =>
  await productQueries.updateProduct(id, productData);
//En este archivo iremos definiendo todas las funciones que nos servirán de enlace entre el controlador y la base de datos.

//-------OFFRE----------

// AJOUTER UNE OFFRE
dao.insertOffer = async (offerData) => await offerQueries.addOffer(offerData);

// SUPPRIMER UNE OFFRE
dao.deleteOffer = async () => await offerQueries.deleteOffer();

// MODIFIER UNE OFFRE PAR SON ID
dao.updateOffer = async (id, offerData) =>
  await offerQueries.updateOffer(id, offerData);

//obtenir par ref
dao.getOfferByRef = async (reference) =>
  await offerQueries.getOfferByRef(reference);

dao.getOffer = async () => await offerQueries.getOffer();

dao.getOfferById = async (id) => await offerQueries.getOfferById(id);

//-------PEDIDO----------

// AJOUTER UNE DONATION
dao.insertPedido = async (pedidoData) =>
  await pedidoQueries.addPedido(pedidoData);

// SUPPRIMER UNE pedido
dao.deletePedido = async (id) => await pedidoQueries.deletePedido(id);

// MODIFIER UNE pedido PAR SON ID
dao.updatePedido = async (id, pedidoData) =>
  await pedidoQueries.updatePedido(id, pedidoData);

//obtenir par ref
dao.getPedidoByRef = async (reference, idCompany) =>
  await pedidoQueries.getPedidoByRef(reference, idCompany);

dao.getPedidoById = async (id) => await pedidoQueries.getPedidoById(id);



dao.deletePedidoById = async (id) => await pedidoQueries.deletePedidoById(id);

dao.getPedido = async () => await pedidoQueries.getPedido();

dao.getPedidoByUser = async (id) => await pedidoQueries.getPedidoByUser(id);

dao.getPedidoByUsers = async () => await pedidoQueries.getPedidoByUsers();

dao.updatePedido = async (quantity, reference) =>
  await pedidoQueries.updatePedido(quantity, reference);

export default dao;

//-----------DELIVERIES

dao.insertDelivery = async (deliveryData) =>
  await deliveryQueries.addDelivery(deliveryData);

dao.getDelivery = async () => await deliveryQueries.getDelivery();
