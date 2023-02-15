import dao from "../Services/dao.js";
import { currentDir } from "../index.js";

const __dirname = currentDir().__dirname;

const controller = {};

//AJOUTER UN PRODUIT
controller.addOffer = async (req, res) => {
  // controlar que viene el body
  const { reference, description, quantity, photo } = req.body;
  if (!reference || !description || !quantity || !photo) {
    res.status(400).send("Error al recibir el body");
  }
  try {
    const offer = await dao.getOfferByRef(reference);
    // Si existe el offero, devolvemos 409 (conflict)
    if (offer.length > 0) return res.status(409).send("offero ya existe");
    // Si no existe, lo añadimos
    const insertOffer = await dao.insertOffer(req.body);
    if (insertOffer)
      return res.send(`offero ${reference} con id${insertOffer} añadido`);
  } catch (e) {
    console.log(e.message);
  }
};

//OBTENIR UN PRODUIT
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




}

export default controller;
