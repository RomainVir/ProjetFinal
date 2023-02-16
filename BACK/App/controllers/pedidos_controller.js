import dao from "../Services/dao.js";
import { currentDir } from "../index.js";

const __dirname = currentDir().__dirname;

const controller = {};

//AJOUTER UN PRODUIT
controller.addPedido = async (req, res) => {
  // controlar que viene el body
  const { reference, description, quantity, quantity_choosen } = req.body;
  if (!reference || !description || !quantity) {
    res.status(400).send("Error al recibir el body");
  }
  try {

    let pedido = await dao.getPedidoByRef(reference)
    console.log(pedido,"pedido");
    let pedidoObj={
      reference:reference,
      description:description,
      quantity

    }
    
    // Si no existe, lo añadimos
    const insertPedido = await dao.insertPedido(req.body);
    if (insertPedido)
      return res.send(`Pedido ${reference} con id${insertPedido} añadido`);
  } catch (e) {
    console.log(e.message);
  }
};

//OBTENIR UN PRODUIT
controller.getPedido = async (req, res) => {
  try {
    const pedido = await dao.getDonation();
    // Si no existe devolvemos un 404 (not found)
    // Devolvemos la ruta donde se encuentra la imagen
    return res.send(pedido);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};


export default controller;
