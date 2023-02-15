import dao from "../Services/dao.js";
import { currentDir } from "../index.js";

const __dirname = currentDir().__dirname;

const controller = {};

//AJOUTER UN PRODUIT
controller.addDonation = async (req, res) => {
  // controlar que viene el body
  const { reference, description, quantity, photo } = req.body;
  if (!reference || !description || !quantity || !photo) {
    res.status(400).send("Error al recibir el body");
  }
  try {
    const donation = await dao.getDonationByRef(reference);
    // Si existe el Donationo, devolvemos 409 (conflict)
    if (donation.length > 0) return res.status(409).send("Donationo ya existe");
    // Si no existe, lo añadimos
    const insertDonation = await dao.insertDonation(req.body);
    if (insertDonation)
      return res.send(`Donation ${reference} con id${insertDonation} añadido`);
  } catch (e) {
    console.log(e.message);
  }
};

//OBTENIR UN PRODUIT
controller.getDonation = async (req, res) => {
  try {
    const donation = await dao.getDonation();
    // Si no existe devolvemos un 404 (not found)
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(donation);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

controller.updateDonation = async (req, res) => {
  const { authorization } = req.headers;
  // Si no existe el token enviamos un 401 (unauthorized)
  if (!authorization) return res.sendStatus(401);

  try {
    // Si no nos llega ningún campo por el body devolvemos un 400 (bad request)
    if (Object.entries(req.body).length === 0)
      return res.status(400).send("Error al recibir el body");
    // Actualizamos el usuario
    await dao.updateDonation(req.params.id, req.body);
    // Devolvemos la respuesta
    return res.send(`Donation con id ${req.params.id} modificado`);
  } catch (e) {
    console.log(e.message);
  }
};

export default controller;
