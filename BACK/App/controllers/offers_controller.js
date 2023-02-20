import dao from "../Services/dao.js";
import { currentDir } from "../index.js";

const __dirname = currentDir().__dirname;

const controller = {};

//AJOUTER UN OFFRE
controller.addOffer = async (req, res) => {
  const {reference } = req.body[0]
  console.log(req.body);

  // controlar que viene el body
  if (!req.body) {
    res.status(400).send("Error al recibir el body");
  }
  try {
    let insertOffer
    
    //ne pas ajouter 2 fois le meme OFFRE mais modifier la qté
    const verifyProduct = await dao.getOfferByRef(reference);
    if (verifyProduct.length > 0) {
      const quantityFinal =
      req.body[0].quantity + verifyProduct[0].quantity;
      
      let quantityUpdate = { quantity: quantityFinal };
      
      insertOffer= await dao.updateOffer(verifyProduct[0].id, quantityUpdate);
    } else {
      insertOffer = await dao.insertOffer(req.body)
    }

    if (insertOffer) return res.send(`${insertOffer}`);
  } catch (e) {
    console.log(e.message);
  }
};

//OBTENIR UN OFFRE
controller.getOffer = async (req, res) => {
  try {
    const offer = await dao.getOffer();
    // Si no existe devolvemos un 404 (not found)
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(offer);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.updateOffer = async (req, res) => {
  const { authorization } = req.headers;
  // Si no existe el token enviamos un 401 (unauthorized)
  if (!authorization) return res.sendStatus(401);

  try {
    // Si no nos llega ningún campo por el body devolvemos un 400 (bad request)
    if (Object.entries(req.body).length === 0)
      return res.status(400).send("Error al recibir el body");
    // Actualizamos el usuario
    await dao.updateOffer(req.params.id, req.body);
    // Devolvemos la respuesta
    return res.send(`Producto con id ${req.params.id} modificado`);
  } catch (e) {
    console.log(e.message);
  }
};

// SUPPRIMER UN OFFRE
controller.deleteOffer = async (req, res) => {
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
    // Buscamos si el id del Offero existe en la base de datos
    const offer = await dao.getOfferById(req.params.id);
    // Si no existe devolvemos un 404 (not found)
    if (product.length <= 0)
      return res.status(404).send("le OFFRE n´existe pas");
    // Si existe, eliminamos el usuario por el id
    await dao.deleteProduct(req.params.id);
    // Devolvemos la respuesta
    return res.send(`OFFRE avec id ${req.params.id} supprimé`);
  } catch (e) {
    console.log(e.message);
  }
};

export default controller;
