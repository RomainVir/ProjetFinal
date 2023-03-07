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
    for (let i = 0; i < req.body.list.length; i++) {
      const offerRef = await dao.getOfferByRef(req.body.list[i].reference);
      const quantityOfferRef = offerRef[0].quantity;
      const quantityUpdate =
        quantityOfferRef - parseInt(req.body.list[i].quantity_choosen);
      const quantityObj = {
        quantity: quantityUpdate,
      };
      await dao.updateOffer(req.body.list[i].reference, quantityObj);

      const pedidoRef = await dao.getPedidoByRef(
        req.body.list[i].reference,
        req.body.idCompany
      );
      if (pedidoRef.length > 0) {
        const quantityPedidoRef = pedidoRef[0].quantity_choosen;
        const quantityUpdatePedido =
          parseInt(req.body.list[i].quantity_choosen) +
          parseInt(quantityPedidoRef);
        const quantityObj = {
          quantity_choosen: quantityUpdatePedido,
        };

        await dao.updatePedido(quantityObj, req.body.list[i].reference);
      } else {
        let insertObj = {
          reference: req.body.list[i].reference,
          description: req.body.list[i].description,
          idCompany: req.body.idCompany,
          quantity_choosen: req.body.list[i].quantity_choosen,
        };
        await dao.insertPedido(insertObj);
      }
    }
    return res.status(200).send("pedido añadido");
  } catch (e) {
    console.log(e.message);
  }
};

//OBTENIR tous les pedidos
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

//obtenir un pedido par user connecté
controller.getPedidoByUser = async (req, res) => {
  const { idCompany } = req.body;
  try {
    let user = await dao.getPedidoByUser(idCompany);

    // Si no existe devolvemos un 404 (not found)
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(user);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

//obtenir tous les pedidos
controller.getPedidoByUsers = async (req, res) => {
  try {
    let user = await dao.getPedidoByUsers();

    // Si no existe devolvemos un 404 (not found)
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(user);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

//delete pedido by id
controller.deletePedidoById = async (req, res) => {
  // controlar que viene el body
  const { id } = req.body;
  if (!id) {
    return res.status(400).send("Pedido does no exist");
  }
  try {
    const pedido = await dao.getPedidoById(id);
    // Si existe el producto, devolvemos 409 (conflict)
    if (pedido.length <= 0) return res.status(409).send("Pedido no existe");

    const deletePedido = await dao.deletePedidoById(id);
    if (deletePedido) return res.send(`Product with id ${id} deleted`);
  } catch (e) {
    console.log(e.message);
  }
};
export default controller;
