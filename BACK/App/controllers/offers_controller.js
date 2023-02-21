import dao from "../Services/dao.js";
import { currentDir } from "../index.js";

const __dirname = currentDir().__dirname;

const controller = {};

//AJOUTER UN OFFRE
controller.addOffer = async (req, res) => {
  // controlar que viene el body
  if (!req.body) {
    res.status(400).send("Error al recibir el body");
  }
  try {
    let insertOffer;
    for (let i = 0; i < req.body.length; i++) {
      //ne pas ajouter 2 fois le meme OFFRE mais modifier la qté
      const verifyProduct = await dao.getOfferByRef(req.body[i].reference);
      if (verifyProduct.length > 0) {
        const quantityFinal =
          parseInt(req.body[i].quantity) + verifyProduct[0].quantity;

        let quantityUpdate = { quantity: quantityFinal };

        insertOffer = await dao.updateOffer(
          verifyProduct[0].id,
          quantityUpdate
        );
      } else {
        insertOffer = await dao.insertOffer(req.body[i]);
      }
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
console.log("hola");
  try {
    await dao.deleteOffer();
    // Devolvemos la respuesta
    return res.status(200).send();
  } catch (e) {
    console.log(e.message);
  }
};

export default controller;
