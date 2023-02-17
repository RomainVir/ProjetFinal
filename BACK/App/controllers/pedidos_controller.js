import dao from "../Services/dao.js";
import { currentDir } from "../index.js";

const __dirname = currentDir().__dirname;

const controller = {};

//AJOUTER UN PRODUIT
controller.addPedido = async (req, res) => {
  const { quantity_choosen, reference, description } = req.body;
  // controlar que viene el body
  if (!req.body) {
    res.status(400).send("Error al recibir el body");
  }
  try {
    let pedidoObj = {
      reference: reference,
      description: description,
      quantity_choosen: quantity_choosen,
    };
    const insertPedido = await dao.insertPedido(pedidoObj);
    //baisser la qte quand on ajout une produit au panier
    const quantityOffer = await dao.getOfferByRef(reference);
    console.log(quantityOffer, "hola");
    const quantityUpdate = quantityOffer[0].quantity - quantity_choosen;
    let quantityUp = {
      quantity: quantityUpdate,
    };

    await dao.updatePedido(quantityUp, reference);

    if (insertPedido) return res.send(`${insertPedido}`);
  } catch (e) {
    console.log(e.message);
  }
};

//OBTENIR UN PRODUIT
controller.getPedido = async (req, res) => {
  try {
    const pedido = await dao.getPedido();
    // Si no existe devolvemos un 404 (not found)
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(pedido);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

export default controller;
