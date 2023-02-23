import express from "express";
import pedidoController from "../controllers/pedidos_controller.js";

const pedidoRouter = express.Router();

//add a Donation
pedidoRouter.post("/add_pedido", pedidoController.addPedido);

//obtener un Donation
pedidoRouter.get("/pedidos", pedidoController.getPedido);

pedidoRouter.post("/getpedidobyuser", pedidoController.getPedidoByUser);

pedidoRouter.get("/getpedidobyusers", pedidoController.getPedidoByUsers);

export default pedidoRouter;
