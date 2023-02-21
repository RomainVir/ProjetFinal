import dao from "../Services/dao.js";
import { currentDir } from "../index.js";

const __dirname = currentDir().__dirname;

const controller = {};

//add a delivery
controller.addDelivery = async (req, res) => {
  // controlar que viene el body
  const { selectedListPedidos, idCompany, date } = req.body;
  if (!selectedListPedidos) {
    return res.status(400).send("Error al recibir el body");
  }
  try {
    const delivery = await dao.getDelivery(idCompany);
    console.log(delivery);
    // Si existe el deliveryo, devolvemos 409 (conflict)
    if (delivery.length > 0) return res.status(409).send("delivery ya existe");

    selectedListPedidos.map(async (idProduct) => {
      const deliveryObj = {
        idCompany: idCompany,
        idProduct: idProduct,
        date: date,
      };

      const insertDelivery = await dao.insertDelivery(deliveryObj);
      if (insertDelivery)
        return res.send(`delivery con id ${insertDelivery} añadido`);
    });
  } catch (e) {
    console.log(e.message);
  }
};

//get a delivery
controller.getDelivery = async (req, res) => {
  try {
    const delivery = await dao.getDelivery();
    console.log(delivery);
    if (delivery <= 0) return res.status(404).send("No hay deliveries");

    return res.send(delivery);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

export default controller;
