import dao from "../Services/dao.js";
import { currentDir } from "../index.js";

const __dirname = currentDir().__dirname;

const controller = {};


//AJOUTER UN PRODUIT
controller.addProduct = async (req, res) => {
  // controlar que viene el body
  const { reference, description, quantity, photo } = req.body;
  if (!reference || !description || !quantity || !photo) {
    res.status(400).send("Error al recibir el body");
  }
  try {
    const product = await dao.getProductByRef(reference);
    // Si existe el producto, devolvemos 409 (conflict)
    if (product.length > 0) return res.status(409).send("Producto ya existe");
    // Si no existe, lo añadimos
    const insertProduct = await dao.insertProduct(req.body);
    if (insertProduct)
      return res.send(`Producto ${reference} con id${insertProduct} añadido`);
  } catch (e) {
    console.log(e.message);
  }

};

//OBTENIR UN PRODUIT
controller.getProduct = async (req, res) => {
  try {
    const product = await dao.getProduct();
    // Si no existe devolvemos un 404 (not found)
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(product);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

//OBTENIR UN PRODUIT PAR SON ID
controller.getProductById = async (req, res) => {
  try {
    const product = await dao.getProductById(req.params.id);
    // Si no existe devolvemos un 404 (not found)
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(product[0]);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

// MODIFIER UN PRODUIT
controller.updateProduct = async (req, res) => {
  const { authorization } = req.headers;
  // Si no existe el token enviamos un 401 (unauthorized)
  if (!authorization) return res.sendStatus(401);

  try {
    // Si no nos llega ningún campo por el body devolvemos un 400 (bad request)
    if (Object.entries(req.body).length === 0)
      return res.status(400).send("Error al recibir el body");
    // Actualizamos el usuario
    await dao.updateProduct(req.params.id, req.body);
    // Devolvemos la respuesta
    return res.send(`Producto con id ${req.params.id} modificado`);
  } catch (e) {
    console.log(e.message);
  }
};

// SUPPRIMER UN PRODUIT
controller.deleteProduct = async (req, res) => {
  // OBTENER CABECERA Y COMPROBAR SU AUTENTICIDAD Y CADUCIDAD
  const { authorization } = req.headers;
  // Si no existe el token enviamos un 401 (unauthorized)
  if (!authorization) return res.sendStatus(401);
  const token = authorization.split(" ")[1];

  try {
    // codificamos la clave secreta
    const encoder = new TextEncoder();
    // verificamos el token con la función jwtVerify. Le pasamos el token y la clave secreta codificada
    const { payload } = await jwtVerify(
      token,
      encoder.encode(process.env.JWT_SECRET)
    );
    // Verificamos que seamos usuario administrador
    console.log(payload.role);
    if (!payload.role)
      return res.status(409).send("vous n´avez pas le statut d´administrateur");
    // Buscamos si el id del producto existe en la base de datos
    const product = await dao.getProductById(req.params.id);
    // Si no existe devolvemos un 404 (not found)
    if (product.length <= 0)
      return res.status(404).send("le produit n´existe pas");
    // Si existe, eliminamos el usuario por el id
    await dao.deleteProduct(req.params.id);
    // Devolvemos la respuesta
    return res.send(`Produit avec id ${req.params.id} supprimé`);
  } catch (e) {
    console.log(e.message);
  }
};

//IMAGES PAS BESOIN 
controller.uploadImage = async (req, res) => {
  try {
    if (req.files === null) return;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se ha cargado ningún archivo");
    }

    if (!req.query) {
      return res.status(400).send("No hay id de producto");
    }

    const images = !req.files.imagen.length
      ? [req.files.imagen]
      : req.files.imagen;
    images.forEach(async (image) => {
      let uploadPath = __dirname + "/public/images/" + image.name;
      let BBDDPath = "images/" + image.name;
      image.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
      });
      await dao.addImage({
        name: image.name,
        path: BBDDPath,
        idproducto: req.query.idproducto,
      });
    });
    return res.send("Imagen subida!");
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.getImage = async (req, res) => {
  try {
    // Buscamos si el id de la imagen existe en la base de datos
    const image = await dao.getImageById(req.params.id);
    // Si no existe devolvemos un 404 (not found)
    if (image.length <= 0) return res.status(404).send("La imagen no existe");
    // Devolvemos la ruta donde se encuentra la imagen
    return res.sendFile(image[0].path, { root: __dirname });
    //return res.send({ path: image[0].path });
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

export default controller;
