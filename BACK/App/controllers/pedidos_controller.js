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
    for (let i = 0; i < req.body.length; i++) {
      const offerRef = await dao.getOfferByRef(req.body[i].reference);
      const quantityOfferRef = offerRef[0].quantity;
      const quantityUpdate =
        quantityOfferRef - parseInt(req.body[i].quantity_choosen);
      const quantityObj = {
        quantity: quantityUpdate,
      };
      await dao.updateOffer(req.body[i].reference, quantityObj);

      const pedidoRef = await dao.getPedidoByRef(req.body[i].reference);
      if (pedidoRef.length > 0) {
        const quantityPedidoRef = pedidoRef[0].quantity_choosen;
        const quantityUpdatePedido =
          parseInt(req.body[i].quantity_choosen) + parseInt(quantityPedidoRef);
        const quantityObj = {
          quantity_choosen: quantityUpdatePedido,
        };
        await dao.updatePedido(quantityObj, req.body[i].reference);
      } else {
        let insertObj = {
          reference: req.body[i].reference,
          description: req.body[i].description,
          quantity_choosen: req.body[i].quantity_choosen,
        };
        console.log(insertObj);
        await dao.insertPedido(insertObj);
      }
    }
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
