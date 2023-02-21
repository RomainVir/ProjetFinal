import dao from "../Services/dao.js";
import { currentDir } from "../index.js";

const __dirname = currentDir().__dirname;

const controller = {};

//add a delivery
controller.addDelivery = async (req, res) => {
  // controlar que viene el body
  const { idCompany, idProduct, date } = req.body;
  if (!idCompany || !idProduct) {
    return res.status(400).send("Error al recibir el body");
  }
  try {
    const delivery = await dao.getDelivery(idCompany);
    // Si existe el deliveryo, devolvemos 409 (conflict)
    if (delivery.length > 0) return res.status(409).send("delivery ya existe");
    console.log(delivery);

    // Si no existe, lo añadimos
    let deliveryObj = {
      idCompany: idCompany,
      idProduct: idProduct,
      date: date,
    };
    const insertDelivery = await dao.insertDelivery(deliveryObj);
    if (insertDelivery)
      return res.send(`delivery con id ${insertDelivery} añadido`);
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
    let deliveryObj = [];
    for (let i = 0; i < delivery.length; i++) {
      const company = await dao.getUserById(delivery[i].idCompany);
      deliveryObj[i] = {
        delivery,
        nombreEmpresa: company[0].companyName,
      };
    }

    return res.send(deliveryObj);
  } catch (e) {
    console.log(e.message);
    return res.status(400).send(e.message);
  }
};

export default controller;
